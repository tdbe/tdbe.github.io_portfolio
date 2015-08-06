using UnityEngine;
using System.Collections;

public class S4_LandMarks : VoxelCubeStateBase {
	

	//Defined in this.base: public ComputeShader cs; //this can remain empty if you don't want your state to have a compute shader.
	//Defined in this.base: public VoxelCubeStateManager stateManager;

	
	private bool once = true;
	
	/// <summary>
	/// Takes the StateManager's Compute Buffer and binds it to this state's compute shader.
	/// Also assigns whatever Floats or Ints etc. this state's compute shader layer needs.
	/// </summary>
	public override void doStart(VoxelCubeManager _stateManager) {
		
		base.doStart(_stateManager);
		
		if(base.cs){//if this ain't a shaderless state
			
			cs.SetBuffer(0, "particleBuffer", stateManager.particleBuffer);
			cs.SetInt("cubeSize", stateManager.cubeSize);//for cellular automata
			cs.SetFloats("spacing", stateManager.cubeSpacing);//for cellular automata
			cs.SetFloats("randomSeed", stateManager.randomSeed);

			cs.SetFloat("rangeModulator", stateManager.settings.stalactitePopulation);
			cs.SetFloat("attachmentPointDensity", stateManager.settings.attachmentPointDensity);
			cs.SetFloat("stalactiteStraightness", stateManager.settings.stalactiteSharpness);
			cs.SetFloat("fineTuneThickness", stateManager.settings.airThickness);
			cs.SetFloat("maxStHeight", stateManager.settings.maxStHeight);
			cs.SetInt("stthick", stateManager.settings.hoodoos);
			cs.SetFloat("hooWobbliness", stateManager.settings.wobbliness);

		}
	}


	public override void doUpdate() {
	
		if(once){
			StartCoroutine(stopStateAfterFrames(stateManager.nrOfLandMarkFramesToRun));
			once = false;
		}
		
        //runs CS one frame
		base.csDispatch();
	}
	
	private IEnumerator stopStateAfterFrames(int frames){
		
		
		while (frames > 0){
			cs.SetInt ("frameNumber", stateManager.nrOfLandMarkFramesToRun - frames);
			//Debug.Log("frames left for automata to run: "+frames);
			frames--;
			if(frames == 0){
				cs.SetInt ("frameNumber", -10); //This is to tell the shader it is on the last frame.
			}
			yield return 0;
		}


		base.onStateFinished();
	}
	
	public override void enterState(){
		float[] tileP = {//temporary tile based solution
			TileFactory.tileList[stateManager.currentTile].tilePos.x,
			TileFactory.tileList[stateManager.currentTile].tilePos.y,
			TileFactory.tileList[stateManager.currentTile].tilePos.z
		};
		cs.SetFloats("tilePos", tileP);
		cs.SetInt ("frameNumber", 0);
		
		once = true;
	}
	
}