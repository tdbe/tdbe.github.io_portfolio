Shader "Custom/particleCube" 
{

 	Properties 
 	{
        _Color ("Main Color", Color) = (0, 1, 1,0.3)
        _SpeedColor ("Speed Color", Color) = (1, 0, 0, 0.3)
        _colorSwitch ("Switch", Range (0, 120)) = 60
        _LColor ("L Color", Color) = (0, 0, 1, 1)
        _NoiseColor0 ("Noise Color 0", Color) = (0, 0, 0, 0)
        _NoiseColor1 ("Noise Color 1", Color) = (1, 1, 1, 0)
        _generatedLCubeSize ("Generated L Cube Size [0.5,4]", float) = 1
        _generatedNoiseCubeSize ("Generated Noise Cube Size [0.5,4]", float) = 1
        _colorFade ("Fadeout", Range (0, 1)) = 0
    }

	SubShader 
	{
		Pass 
		{
			Tags {"Queue"="Background" "RenderType"="Background"}

			Lighting Off 
			ZTest Always 
			ZWrite Off 
			Fog { Mode Off }

			BlendOp Max
			Blend one one
			
			
			ZTest LEqual
			Cull OFF
			
			CGPROGRAM
			#pragma target 5.0
			
			#pragma vertex vert
			#pragma fragment frag
			
			#include "UnityCG.cginc"
			
			// The same particle data structure used by both the compute shader and the shader.
			struct VoxelParticle
			{
				float3 position;
				float3 velocity;
				float noise;
				float prevNoise;
				int flags;
			};
			
			// a structure linking the data between the vertex and the fragment shader
			struct FragInput
			{
				float4 color : COLOR;
				float4 position : SV_POSITION;
			};
			
			// The buffer holding the particles shared with the compute shader.
			StructuredBuffer<VoxelParticle> particleBuffer;
			// The buffer with the cube vertices
			StructuredBuffer<float3> cubed_verts;
			//(both these buffers were built in the voxelCubeManager)
			
			// Variables from the properties.
			float4 _Color;
			float4 _SpeedColor;
			float _colorSwitch;
			float4 _LColor;
			float4 _NoiseColor0;
			float4 _NoiseColor1;
			float _generatedLCubeSize;
			float _generatedNoiseCubeSize;
			float _colorFade;
			

			// SV_VertexID is the number of vertices to draw per particle; we're doing cubes so 26x2 tris
			// SV_InstanceID is "particleCount", the number of particles/cubes
			FragInput vert (uint id : SV_VertexID, uint inst : SV_InstanceID)
			{
				FragInput fragInput;
				
				float3 pos = particleBuffer[inst].position / 4 +7;
				
				//don't draw voxels which aren't used
				//structural points are white
				//the rest are coloured according to the noise
				
				if(particleBuffer[inst].flags == -20 || particleBuffer[inst].flags == 0){
				
					fragInput.color = _Color; 
					
					fragInput.position = mul(UNITY_MATRIX_MVP, 
											 float4(pos + cubed_verts[id], 1));
				}
				else if(particleBuffer[inst].flags == -10){
					fragInput.color = _LColor;
					
					fragInput.position = mul(UNITY_MATRIX_MVP, 
											 float4(pos + cubed_verts[id]*_generatedLCubeSize, 1));
				}
				//else means it is actual noise, between -1 and 1
				else{
				
					float4 cc = lerp(_NoiseColor0, _NoiseColor1, (particleBuffer[inst].noise+1)/2) - _NoiseColor0.a;
					
					fragInput.color = cc;

					fragInput.position = mul(UNITY_MATRIX_MVP, 
											 float4(pos + cubed_verts[id]*_generatedNoiseCubeSize, 1));
				}
				
				return fragInput;
			}
			
			float4 frag (FragInput fragInput):COLOR
			{
				return fragInput.color - _colorFade;
			}
			
			ENDCG
		
		}
	}

	Fallback Off
}
