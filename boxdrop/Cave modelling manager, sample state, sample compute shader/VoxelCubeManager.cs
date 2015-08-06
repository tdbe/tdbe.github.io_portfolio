using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;


public class VoxelCubeManager : MonoBehaviour 
{

	public InputManager inputManager;
	public CubeMarcher cubeMarcher;

    //The states that one cubic voxel-modeling brush tile can take.
	public enum ComputeStates{
	
		p0_DoNothing = 0,
		p1_MoveBrushToNextTile = 1,
		p2_LoadAndNoise = 2,
		//p3_CellularAutomata = 3,
		p4_LandMarks = 3,
		//p5_VoxelFilteringCA = 4,
		p6_DisplayOnly = 4,
		p7_PP_Normals = 5
	}
	private ComputeStates _currentState;
	public ComputeStates currentState{
		get{
			return _currentState;
		}
		set{//nice because we can not only set the enum, but also configure the state
			_currentState = value; 
			OnEnterState();
		}
	}

	public GameObject cubeStateContainer; //holds the prefab for each state and its Compute Shader
	public GameObject LSysPrevContainer; //this is just a GO to hold the preview cubes I pipe out
	public Camera auxCamera;
	[HideInInspector]
	public VoxelCubeStateBase[] cubeStateObjects;

	//public Action DoStart = DoNothing;
	public Action DoUpdate = DoNothing;
	public Action ExitState = DoNothing;
	public Action DoRender = DoNothing;


	// The same particle data structure used by both the compute shader and the blue-green shader.
	public struct VoxelParticle
	{
		public Vector3 position;
		public Vector3 color;
		public float noise;
		public float prevNoise;
		public int flags;
	};
	public class PPParticle
	{
		public Vector3 position;
		public bool used;
		public bool isEdge = false;
		public Vector3[] norms;
		public float avgNoise;
	};

	[HideInInspector]
	public List<TileFactory.LPoint> lPts;//the structural points sampled from the l-system go here.
	private int _currentTile = 0;
	public int currentTile{
		get{ 
			return _currentTile;
		}
	}


	public VoxelParticle[] particleArray;  //these go to the compute shader(s)
	private PPParticle[] postProcessArray; //this contains isosurface info used to calculate normals

	[HideInInspector]
	public int warp_Count = 10;				//number particles /32.

	const int warpSize = 32; 				// GPUs process data by CUDA (warps) or Stream (wavefronts), usually 32 for modern ones.
	[HideInInspector]
	public int particleCount; 				// = warpSize * warpCount.
	[HideInInspector]
	public int cubeSize;
	[HideInInspector]
	public float cubeSpacing = 1;

	[HideInInspector]
	public ComputeBuffer particleBuffer;	// The GPU buffer holding the particules.
	private ComputeBuffer cubedVertBuffer;	// This is just for the green/blue display shader

	
	#region Debug/Experiment medley
	//Note: "particleCube" means voxel. it is represented as a particle which is drawn with a procedural cube of a certain Size.
	public float particleCubeSize = 1f;//should be the same as "spacing"; unless you want the cubes to be smaller than the grid.
	
	public float lSystemResolution = 2;
	public int nrOfAutomataFramesToRun = 1;
	public int nrOfLandMarkFramesToRun = 15;
	public Material material;					//Use greenblue procedural "particle" shader.
	public Material materialDark;				//Switch procedural "particle" shader (colors).
	public Material materialBright;				//Switch procedural "particle" shader (colors).
	public float mouseStrengh = 100;			//strength of point-of-focus (used to be the mouse).

	public bool drawNormalLines = false;//also uncomment DebugNormals in the cubeMarcher
	[HideInInspector]
	public float flatShadingWeight = 0;
	[HideInInspector]
	public float normalNeighborCloseness = 1;
	public bool useFog = true;
	[HideInInspector]
	public bool renderLock = false;
	
	[HideInInspector]
	public UserSettings settings;
	public UserSettings settings1;
	public UserSettings settings2;
	public int whichSettingToUse = 2;
	
	[Range(0f, 0.18f)]
	public float fineDetailYSlope = 0.18f;
	
	[Range(0.001f, 150f)]
	public float noiseAmplitude = 100;
	
	[Range(6f, 30f)]//upper limit should be between radius and outer radius
	public float noiseDistAtten = 6;
	
	[Range(0.1f, 0.5f)]//using lerp.//the lsys curl noise will always be >0.something
	public float metaballDistortionFade = 0.5f;
	
	public bool useOldCurlNoiseInstead = false;
	public Vector3 yourManualSeed = Vector3.zero;
	public bool useManualSeed = false;
	[HideInInspector]
	public bool frostySeed = false;
	[HideInInspector]
	public float[] randomSeed; 
	#endregion
	


	void Awake ()
	{
		//Application.targetFrameRate = 60;
		DoRender = actualRender;
		//DoRender = RenderNothing;
	}

	void Start () 
	{
		SetSettings();
		SetSeed();//ComputeRandomSeed();
		Sync_CubeStateObjects_with_StateEnums();

		//64;
		cubeSize = 32;
		particleCount = cubeSize*cubeSize*cubeSize;//32768;//262144;//216000;
		warp_Count = particleCount / warpSize;
		Debug.Log("particleCount: "+particleCount+"; warpCount: "+warp_Count+"; cubeSize: "+cubeSize+"x"+cubeSize+"x"+cubeSize);

		
		//init particles
		particleArray = new VoxelParticle[particleCount];


		//this creates the initial cubic voxel volume which henceforth wll reside on the GPU.
		int i = 0;
		int num = cubeSize;//60;//6
		for(int y=0; y < num; y++){
			for(int z=0; z < num; z++){
				for(int x=0; x < num; x++){

					particleArray[i].position = new Vector3(x * cubeSpacing, y * cubeSpacing, z * cubeSpacing);
					particleArray[i].color = Vector3.zero;
					particleArray[i].noise = -20;
					particleArray[i].flags = -20;

					i++;
				}

			}
		}

		//this defines a cube around point (0, 0, 0). this will be used in addition to each point's position in the shader.
		//basically, for each particle I draw a cube isntead of a point or actual particle.
		Vector3[] cubeVerts = createBaseRelativeTinyCube();


		//instantiate and initialise the GPU buffer.
		particleBuffer = new ComputeBuffer(particleCount, 36);//"stride" - the size allocated for each particle, in bytes
		particleBuffer.SetData(particleArray);

		cubedVertBuffer = new ComputeBuffer(36, 12);//this is for the display shader; to display a cube instead of a point
		cubedVertBuffer.SetData(cubeVerts);


		//bind the buffer to the compute shader in each state.
		for(int s=0; s< cubeStateObjects.Length; s++)
		{
			//Initializing all game states with the compute shader buffer and information 
			//and with other settings defined in this class
			//No time for fancy stuff, the base state class knows what to get from the public vars in here
			cubeStateObjects[s].doStart(this);
		}


		//also bind the buffer to the display shader.
		materialBright.SetBuffer ("particleBuffer", particleBuffer);//this is for the shader shader
		materialBright.SetBuffer ("cubed_verts", cubedVertBuffer);
		materialBright.SetColor("_SpeedColor", Color.red);
		materialBright.SetFloat("_colorFade", 0.0f);

		materialDark.SetBuffer ("particleBuffer", particleBuffer);//this is for the shader shader
		materialDark.SetBuffer ("cubed_verts", cubedVertBuffer);
		materialDark.SetColor("_SpeedColor", Color.red);
		materialDark.SetFloat("_colorFade", 0.0f);


		currentState = ComputeStates.p0_DoNothing;//now we wait.
	}

	
	void Update () 
	{

		DoUpdate();
	}


	public void startComputeProcess(){
		#if UNITY_EDITOR
		Debug.Log("---> Tile based redering started. Tile count: "+TileFactory.tileList.Count);
		#endif

		//temporary bullshit tile-based rendering. Unity Free = no 3D Textures, no octrees, no LoD, no fun
		_currentTile = 0;
        //no need for transitions, this is a non interactive "assembly line"
		computeNextTile();
	}

	private void computeNextTile(){

		if(currentTile < TileFactory.tileList.Count){

			currentState = ComputeStates.p1_MoveBrushToNextTile;

			//load the structural points for this tile
			lPts = TileFactory.tileList[currentTile].lPoints;

			//this is for debugging. makes sure you always see the "Voxel brush" in the scene
			inputManager.adjustVoxCamDist(TileFactory.tileList[currentTile].tilePos);
		}
		else{
			#if UNITY_EDITOR
			Debug.Log("Last tile: "+currentTile+"; out of "+TileFactory.tileList.Count);
			#endif
			onAllTilesProcessed();
		}
	}

	//COMPLETED
	private void onAllTilesProcessed(){
		//Can now save all meshes in ExportedMeshContainer to disk.
		//TODO: do this for cave entrance.

		currentState = ComputeStates.p0_DoNothing;
		inputManager.camera_.camera.backgroundColor = new Color32(172, 228, 255, 5);
		if(useFog)
			RenderSettings.fog =true;

		inputManager.endOfTileProcessing();


		//crunchtime dirty hack; TODO: do things properly.
		inputManager.auxVoxelCamera.enabled = false;
		inputManager.drawTextSprite1 = false;
		inputManager.generatingSprite.enabled = false;
	}



	private void StartMarchingCubes(){

		inputManager.disableInput();
		
		particleBuffer.GetData(particleArray);
		postProcessArray = new PPParticle[particleCount];
		
		Mesh mesh = cubeMarcher.CreateMesh(particleArray, postProcessArray);
		//Note: mesh can end up having 0 verts if there was no sign change in the voxel volume.
		//This is a rare case related to neighbours, and only happens because we're using the bullshit tile system.
	

		//either postprocess the mesh and build it, or skip this whole step entirely and move to next tile
		if(mesh.vertices.Length >0){ 
			cueNextComputeStep();
			((S7_PP_Normals)cubeStateObjects[(int)currentState]).setMesh(mesh, postProcessArray);

		}
		else{
			#if UNITY_EDITOR
			Debug.Log("DISCARDED A MESH WITH 0 VERTICES_____________________");
			#endif
			forceResetToState0();
		}
	}

	/// <summary>
	/// This is triggered after the calculation of the normals for the generated mesh for this current cube.
	/// It will instruct the cube to move to the next tile and start processing from state 0 again.
	/// </summary>
	public void OnPostProcessingEnded(Mesh mesh, Vector3[] outNorms){

		cubeMarcher.applyPostProcessedMesh(mesh, outNorms, TileFactory.tileList[currentTile].tileID, _currentTile);

		//restore the input to the user
		StartCoroutine(inputManager.delaySetInput(0.1f, true));

		cueNextComputeStep();//this should be state 0

		_currentTile++;
		computeNextTile();
	}

	/// <summary>
	/// "Event" called by whatever the last compute shader state we run is.
	/// This function will begin running the Marching Cubes.
	/// </summary>
	public void OnComputingEnded(){

		StartMarchingCubes();
	}

	/// <summary>
	/// Cues the next step.
	/// Assigns the next state ( the one at position of current enum + 1).
	/// Note: it wraps around / toggles through.
	/// </summary>
	public void cueNextComputeStep(){
		
		if((int)currentState + 1 < Enum.GetNames(typeof(ComputeStates)).Length){

			#if UNITY_EDITOR
			Debug.Log("moving to state: "+((ComputeStates)(((int)currentState)+1)).ToString());
			#endif
			currentState = (ComputeStates)(((int)currentState)+1);
		}
		else{
			currentState = (ComputeStates)0;
			#if UNITY_EDITOR
			Debug.Log("moving to state 0");
			#endif
		}
	}

	/// <summary>
	/// Configures the state as soon as it is picked.
	/// Called by the Setter of currentState.
	/// </summary>
	void OnEnterState(){

		//officially end the state from the last frame
		if(ExitState != null)
		{
			ExitState();
		}

		if(DoUpdate!=null)
			DoUpdate = cubeStateObjects[(int)currentState].doUpdate;
		if(ExitState!=null)
			ExitState = cubeStateObjects[(int)currentState].exitState;

		cubeStateObjects[(int)currentState].enterState();
	}
	

	/// <summary>
	/// Goes through all the children of the CubeStateContainer GameObject, 
	/// and assigns each child to a corresponding cubeStateObjects[enum CubeStates.*];
	/// </summary>
	public void Sync_CubeStateObjects_with_StateEnums(){
		//init nr of states. Also totally expertly figure out the number of enums you have ;)
		cubeStateObjects = new VoxelCubeStateBase[ Enum.GetNames(typeof(ComputeStates)).Length ];
		
		string s = "p0_DoNothing";
		for(int i=0; i< cubeStateObjects.Length; i++){
			int indexOfEnumWithSameNameAsGO = 0;
			s = cubeStateContainer.transform.GetChild(i).name;
			try
			{
				indexOfEnumWithSameNameAsGO = (int)Enum.Parse(typeof(ComputeStates), s);
			}
			catch(ArgumentException e)
			{
				Debug.LogError("ACHTUNG: The CubeState object of name \""+s+"\" does not match any of the CubeStates enum values. You done goofed in the scene. " + e.Message);
			}
			
			//Here I cleverly get a reference to each custom game state object, by looking for its generic base class.
			cubeStateObjects[indexOfEnumWithSameNameAsGO] = cubeStateContainer.transform.GetChild(i).GetComponent<VoxelCubeStateBase>();
		}

	}


	/// <summary>
	/// Does the nothing.
	/// This is a delegate I use in case we don't want to run any state's doUpdate() any more.
	/// </summary>
	public static void DoNothing(){
	}

	/// <summary>
	/// Forces the reset to state0.
	/// </summary>
	private void forceResetToState0(){
		StartCoroutine(inputManager.delaySetInput(0.01f, true));
		currentState = (ComputeStates)0;
		#if UNITY_EDITOR
		Debug.Log("moving to state 0");
		#endif
		_currentTile++;
		computeNextTile();
	}

	/// <summary>
	/// Grabs the settings GO according to what was set in the scene.
	/// </summary>
	private void SetSettings(){
		if(whichSettingToUse == 1){
			settings = settings1;
		}
		else if(whichSettingToUse == 2){
			settings = settings2;
		}
		else{
			if(UnityEngine.Random.Range(-1.0f, 1.0f) < 0){
				settings = settings1;
			}
			else{
				settings = settings2;
			}
		}
	}

	/// <summary>
	/// Computes the random seed used for the entire tool: preview shader, material shader, compute shaders.
	/// </summary>
	private void ComputeRandomSeed(){

		float rangeMin = -8000.1f;
		float rangeMax = 8000.1f;

		randomSeed = new float[3];

		for(int i=0; i< 3; i++){
			randomSeed[i] = UnityEngine.Random.Range(rangeMin, rangeMax);
		}
		cubeMarcher.m_material.SetVector("_Seed", new Vector4(randomSeed[0], randomSeed[1], randomSeed[2], 0));

		Debug.Log("randomSeed: ["+randomSeed[0]+"]["+randomSeed[1]+"]["+randomSeed[2]+"]");
	}

	private void SetSeed(){

		if(useManualSeed){
			randomSeed = new float[3];//shaders need float3's
			randomSeed[0] = yourManualSeed.x;
			randomSeed[1] = yourManualSeed.y;
			randomSeed[2] = yourManualSeed.z;
			cubeMarcher.m_material.SetVector("_Seed", new Vector4(randomSeed[0], randomSeed[1], randomSeed[2], 0));
			Debug.Log("randomSeed: ["+randomSeed[0]+"]["+randomSeed[1]+"]["+randomSeed[2]+"]");
		}
		else
			ComputeRandomSeed();
	}

	/// <summary>
	/// This defines vertices for a cube around point (0, 0, 0). 
	/// This will be used in addition to each point's position in the display shader, 
	/// in order to see tiny cubes on screen instead of a single point for each voxel.
	/// </summary>
	/// <returns>The base relative tiny cube.</returns>
	private Vector3[] createBaseRelativeTinyCube(){
		Vector3[] cubeShape = new Vector3[8];
		float div = cubeSpacing;// /2;
		// front bott left
		cubeShape[0] = Vector3.zero;
		cubeShape[0].x += particleCubeSize*div;
		cubeShape[0].y += particleCubeSize*div;
		cubeShape[0].z -= particleCubeSize*div;
		// back bott left
		cubeShape[1] = Vector3.zero;
		cubeShape[1].x += particleCubeSize*div;
		cubeShape[1].y -= particleCubeSize*div;
		cubeShape[1].z -= particleCubeSize*div;
		// back top left
		cubeShape[2] = Vector3.zero;
		cubeShape[2].x -= particleCubeSize*div;
		cubeShape[2].y -= particleCubeSize*div;
		cubeShape[2].z -= particleCubeSize*div;
		// front top left
		cubeShape[3] = Vector3.zero;
		cubeShape[3].x -= particleCubeSize*div;
		cubeShape[3].y += particleCubeSize*div;
		cubeShape[3].z -= particleCubeSize*div;
		
		// front bott right
		cubeShape[4] = Vector3.zero;
		cubeShape[4].x += particleCubeSize*div;
		cubeShape[4].y += particleCubeSize*div;
		cubeShape[4].z += particleCubeSize*div;
		// back bott right
		cubeShape[5] = Vector3.zero;
		cubeShape[5].x += particleCubeSize*div;
		cubeShape[5].y -= particleCubeSize*div;
		cubeShape[5].z += particleCubeSize*div;
		// back top right
		cubeShape[6] = Vector3.zero;
		cubeShape[6].x -= particleCubeSize*div;
		cubeShape[6].y -= particleCubeSize*div;
		cubeShape[6].z += particleCubeSize*div;
		// front top right
		cubeShape[7] = Vector3.zero;
		cubeShape[7].x -= particleCubeSize*div;
		cubeShape[7].y += particleCubeSize*div;
		cubeShape[7].z += particleCubeSize*div;
		
		return new Vector3[]//[24];
		{
			cubeShape[0], cubeShape[1], cubeShape[2],
			cubeShape[2], cubeShape[3], cubeShape[0],
			cubeShape[1], cubeShape[5], cubeShape[6],
			cubeShape[6], cubeShape[2], cubeShape[1],
			
			cubeShape[5], cubeShape[4], cubeShape[7],
			cubeShape[7], cubeShape[6], cubeShape[5],
			cubeShape[4], cubeShape[0], cubeShape[3],
			cubeShape[3], cubeShape[7], cubeShape[4],
			
			cubeShape[3], cubeShape[2], cubeShape[6],
			cubeShape[6], cubeShape[7], cubeShape[3],
			cubeShape[5], cubeShape[1], cubeShape[0],
			cubeShape[0], cubeShape[4], cubeShape[5]
		};
	}

	/// <summary>
	/// Actuals the render. - Lol
	/// No, it procedurally renders the preview particle cubes. 
	/// We need to set this ourselves since there obviously is no geometry for it in the scene.
	/// </summary>
	public void actualRender(){
		//Bind the pass to the pipeline then call a draw (this uses the buffer bound in Start())
		material.SetPass(0);//0 is the Shader's pass. (used in case you have a multi pass shader)

		Graphics.DrawProcedural (MeshTopology.Triangles, 36, particleCount);
	}

	// Called by the camera in OnRender
	public void Render () 
	{
		DoRender();
	}

	void OnDestroy()
	{

		// Unity complains if the GPU buffer isn't manually released.
		particleBuffer.Release();
		//postProcessBuffer.Release();
		cubedVertBuffer.Release();
	}
}
