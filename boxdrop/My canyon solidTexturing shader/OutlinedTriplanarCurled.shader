Shader "Custom/OutlinedTriplanarCurled" {
	Properties {
		_Color ("Main Color", Color) = (.5,.5,.5,1)
		_Contrast ("Lambert Contrast (2)", Float) = 2
		_BumpPower ("Bump Contrast (1)", Float) = 1
		_TexPower ("Texture Contrast (1)", Float) = 1
		_Frequency ("Curl Octaves (1)", Float) = 1
		_Amplitude ("Curl Octaves (2)", Float) = 1
		_OutlineColor ("Outline Color", Color) = (0,0,0,1)
		_OutlineColor2 ("Outline Color 2", Color) = (0,0,0,1)
		_Outline ("Outline width", Range (.002, 0.006)) = .005
		_OutlineTop ("OutlineTop width", Range (.002, 0.006)) = .005
		_Mar_scale ("Marble Texture Scale", Range (.05, 0.5)) = 0.5
		_Mar_Cont ("Marble Contrast", Float) = 1
		_Mar_Sat ("Marble Saturation", Float) = 1
		_Tex_scale ("Projected Texture Scale", Float) = 1
		_Bump_scale ("Bumpmap Texture Scale", Float) = 1
		_Seed ("Noise Seed", Vector) = (0,0,0,0)
		_ColorTex1 ("Base 1 (RGB)", 2D) = "white" { }
		_ColorTex2 ("Base 2 (RGB)", 2D) = "white" { }
		_ColorTex3 ("Base 3 (RGB)", 2D) = "white" { }
		_BumpTex1 ("Bump 1", 2D) = "bump" { }
		_BumpTex2 ("Bump 2", 2D) = "bump" { }
		_BumpTex3 ("Bump 3", 2D) = "bump" { }
		
	}
CGINCLUDE
#include "UnityCG.cginc"
#include "AutoLight.cginc"

#include "./SimplexNoise.cginc"
#include "./CurlNoise.cginc"

#pragma only_renderers d3d11

	struct appdata {
		float4 vertex : POSITION;
		half3 normal : NORMAL;
		half4 tangent : TANGENT; //equivalent to "appdata_tan" in UnityCG.cginc
		float4 texcoord : TEXCOORD0;
	};
	 
	struct v2fO {
		float4 pos : POSITION;
		fixed4 color : COLOR;
	};
	 
	
	fixed4 _LightColor0; 
	fixed4 _Color;
	
	uniform sampler2D _ColorTex1;
	uniform float4 _ColorTex1_ST;
	uniform sampler2D _ColorTex2;
	uniform float4 _ColorTex2_ST;
	uniform sampler2D _ColorTex3;
	uniform float4 _ColorTex3_ST;
	
	uniform sampler2D _BumpTex1;
	uniform float4 _BumpTex1_ST;
	uniform sampler2D _BumpTex2;
	uniform float4 _BumpTex2_ST;
	uniform sampler2D _BumpTex3;
	uniform float4 _BumpTex3_ST;
	
	uniform float _Outline;
	uniform float _OutlineTop;
	uniform float4 _OutlineColor;
	uniform float4 _OutlineColor2;
	uniform float _Contrast;
	uniform float _BumpPower;
	uniform float _TexPower;
	uniform float _Frequency;
	uniform float _Amplitude;
	uniform float _Tex_scale;
	uniform float _Bump_scale;
	uniform float4 _Seed;
	uniform float _Mar_scale;
	uniform float _Mar_Cont;
	uniform float _Mar_Sat;
	 
	v2fO vertOutline(appdata v) {
		// Outline: a copy of your vertices scaled along their normal direction
		v2fO o;
		o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
		
		float3 norm = mul ((float3x3)UNITY_MATRIX_IT_MV, v.normal);
		float2 offset = TransformViewToProjection(norm.xy);
		
		o.pos.xy += offset * o.pos.z * lerp(_Outline, _OutlineTop, -v.normal.y);
		
		o.color = lerp(_OutlineColor, _OutlineColor2, -v.normal.y);

		return o;
	}
	
ENDCG
 
SubShader 
{
	Tags {"Queue" = "Geometry" "RenderType" = "Opaque"}
	
	Pass {
		Name "OUTLINE"
		Tags { "LightMode" = "Always" }
		Cull Front
		ZWrite On

		ZTest LEqual
		ColorMask RGB//A

		Blend Off
		AlphaTest Off
		Cull Front

		Lighting Off

		CGPROGRAM
			#pragma vertex vertOutline
			#pragma fragment frag

			half4 frag(v2fO i) :COLOR { 
				return i.color; 
			}
		ENDCG
	}
	
	Pass {
		Tags { "LightMode" = "ForwardBase" }

		Name "BASE"
		ZWrite On
		ZTest LEqual

		Blend Off
		AlphaTest Off
		Cull Back	
		
		CGPROGRAM
			#pragma vertex vertBase
			#pragma fragment fragBase
			
			//Base pass' light. Subsequent passes get fwdadd.
			#pragma multi_compile_fwdbase 

			struct v2f {
				float4 pos : POSITION;
				half3 normal : TEXCOORD0;
				half3 lightDir: TEXCOORD1; 

				LIGHTING_COORDS(2,3)//unity macro for shadow and attenuation in the vertex pass.

				half4 wsCoord : TEXCOORD4;
				half3 theCurl : TEXCOORD5;			
			}; 
			
			v2f vertBase(appdata v) {

				v2f o;
	
				o.pos = mul(UNITY_MATRIX_MVP, v.vertex);

				//save the worldSpace coord for the tex projection in the fragment. 
				o.wsCoord = mul(_Object2World, v.vertex);
				
				//lookup or compute worldspace Curl Noise in the vertex, stpre it in texture, interpolate it in fragment
				o.theCurl = get_Curl( o.wsCoord.xyz/_Frequency);

				if (_WorldSpaceLightPos0.w == 0.0)//directional light
	            {
	               o.lightDir = ObjSpaceLightDir(v.vertex);
	            } 
	            else//point or spot light
	            {
	               o.lightDir = normalize(_WorldSpaceLightPos0.xyz - mul(_Object2World, v.vertex).xyz);
	            }
				
				o.normal = v.normal;
				
				TRANSFER_VERTEX_TO_FRAGMENT(o);//unity macro: send shadow and atten to the fragment shader.
				
				return o; 
			}
			

			half4 fragBase(v2f i) :COLOR { 

				float3 n = i.normal;
				float3 ntheCurl = normalize(i.theCurl);
				
				float3 blend_weights = abs(n);

				blend_weights = ( blend_weights - 0.05);//the width of the transition zone between the 3 projected textures
				blend_weights = max(blend_weights, 0);

				//tweaked normalization
				blend_weights /= ((blend_weights.x + blend_weights.y + blend_weights.z) * _TexPower ).xxx; 
				
				
				float3 blended_color; 
				float3 blended_bump_vec;  
				
				float3 ws = i.wsCoord.xyz;
				ws = ws + ws * ntheCurl / _Amplitude;
				
		
				//UVs for each planar projection.
				float2 coord1 = ws.yz * _Tex_scale;
				float2 coord2 = i.wsCoord.zx * _Tex_scale;
				float2 coord3 = ws.xy * _Tex_scale;
 
 				//lookup color
				float4 col1 = tex2D(_ColorTex1, coord1);
				float4 col2 = tex2D(_ColorTex2, coord2);
				float4 col3 = tex2D(_ColorTex3, coord3);
				
				//What I call "marble" here ended up being a second sample for the walls, 
				//at a different scale and with some aesthetic tweaks later.
				float3 mar1 = tex2D(_ColorTex1,coord1 *_Mar_scale); 
				float3 mar3 = tex2D(_ColorTex3,coord3 *_Mar_scale);
				float3 blended_marble = (mar1.xyz * blend_weights.xxx + 
				                		 mar3.xyz * blend_weights.zzz)*_Mar_Cont; 
				
				
				//lookup bumps 
				float2 bumpFetch1 = tex2D(_BumpTex1, coord1*_Bump_scale).xy - 0.5;
				float2 bumpFetch2 = tex2D(_BumpTex2, coord2*_Bump_scale).xy - 0.5;
				float2 bumpFetch3 = tex2D(_BumpTex3, coord3*_Bump_scale).xy - 0.5;
				//this is how you swizzle the tangent and bitangent for x according to nvidia.
				// <normal.z, normal.y, -normal.x> and <normal.y, -normal.x, normal.z>
				//Tangents and bitangents/binormals are vectors perpendicular to each other and the normals.
				//here used to figure the direction of the UV coords.
				float3 bump1 = float3(0, bumpFetch1.x, bumpFetch1.y);
				float3 bump2 = float3(bumpFetch2.y, 0, bumpFetch2.x);  
				float3 bump3 = float3(bumpFetch3.x, bumpFetch3.y, 0); 
				
				 
				
				blend_weights.y = max((blend_weights.y -(0.5/blend_weights.y) + 0.625),0);
				//blending the 3 projections together
				blended_color = (col1.xyz * blend_weights.xxx +
				                col3.xyz * blend_weights.zzz) * 0.8 +
				                col2.xyz * blend_weights.yyy * 1.3;  
				blended_bump_vec = bump1.xyz * blend_weights.xxx +  
				                   bump2.xyz * blend_weights.yyy +  
				                   bump3.xyz * blend_weights.zzz;  
				            
				//blend the bump into the normal for the lighting
				n = normalize(n + (blended_bump_vec ) * _BumpPower);


				//let unity figure out the light distance for attenuation
				fixed atten = LIGHT_ATTENUATION(i);

				fixed4 c;
				
				//overlay filter a la Photoshop, between "marble" and regular texture
				//because it looks nice and it's still > 100fps
				c.rgb = _Color.rgb * 1-_Mar_Sat*(1-blended_color)*(1-blended_marble);// / _TexPower;
				c.a = _Color.a;

				//angle to the light	
				float3 lightDir = normalize(i.lightDir);
				fixed lambert = saturate(dot(n, lightDir));
				//now we can apply our light's color to that dot angle in combination with the attenuation.		
					        
		        c.rgb = (
		        		 (UNITY_LIGHTMODEL_AMBIENT.rgb *(c.rgb +blended_marble*_Mar_Cont)) //c.rgb +blended_marble
		        		 + (c.rgb * _LightColor0.rgb * lambert ) * atten  
		        		)*_Contrast;
		        		

				//Quick shenanigans to show that the solid texture can easily
				//be made to have pockets of "minerals" / sparkly rock volumes
			    if(n.y > 0.0001 && n.y < 0.15 && i.theCurl.y > 0.97){
			       	c.rgb *= (i.theCurl.y*1.02)/(n.y*10);
			    }

				return c; 
			}
		ENDCG
		
	}
	
	Pass {
		Tags {"LightMode" = "ForwardAdd"} 

		Name "ADD"
		ZTest LEqual
		ZWrite On
		AlphaTest Off
		Cull Back 
		Fog { Color (0,0,0,0) }

		CGPROGRAM
			#pragma vertex vertBaseAdd
			#pragma fragment fragBaseAdd
			
			#pragma multi_compile_fwdadd
			
			//We must copy almost everything and recalculate it again for each pass. Because forward rendering that's why

			struct v2f {
				float4 pos : POSITION;
				half3 normal : TEXCOORD0;
				half3 lightDir: TEXCOORD1; 

				LIGHTING_COORDS(2,3)

				half4 wsCoord : TEXCOORD4;
				half3 theCurl : TEXCOORD5;
			}; 
			      
			v2f vertBaseAdd(appdata v) {
				v2f o;
				
				o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
				o.wsCoord = mul(_Object2World, v.vertex);
				
				o.theCurl = get_Curl( o.wsCoord.xyz/_Frequency);
				
				if (0.0 == _WorldSpaceLightPos0.w)//directional light
	            {
	               o.lightDir = ObjSpaceLightDir(v.vertex);
	            } 
	            else{//point or spot light
	               o.lightDir = normalize(_WorldSpaceLightPos0.xyz - mul(_Object2World, v.vertex).xyz);
	            }
				
				o.normal = v.normal;
				
				TRANSFER_VERTEX_TO_FRAGMENT(o);
				
				return o;
			}
			
			half4 fragBaseAdd(v2f i) :COLOR { 
				float3 n = i.normal;
				
				float3 blend_weights = abs(n);

				blend_weights = ( blend_weights - 0.05);
				blend_weights = max(blend_weights, 0); 
				blend_weights /= ((blend_weights.x + blend_weights.y + blend_weights.z) * _TexPower ).xxx ; 
				

				float3 blended_color;
				float3 blended_bump_vec;  
				
				float3 ws = i.wsCoord.xyz;
				ws = ws + ws * normalize(i.theCurl)/_Amplitude;
				
				float2 coord1 = ws.yz * _Tex_scale;
				float2 coord2 = ws.zx * _Tex_scale; 
				float2 coord3 = ws.xy * _Tex_scale;
  
				float4 col1 = tex2D(_ColorTex1, coord1);
				float4 col2 = tex2D(_ColorTex2, coord2);
				float4 col3 = tex2D(_ColorTex3, coord3);
				
 
				float2 bumpFetch1 = tex2D(_BumpTex1, coord1*_Bump_scale).xy - 0.5;  
				float2 bumpFetch2 = tex2D(_BumpTex2, coord2*_Bump_scale).xy - 0.5;  
				float2 bumpFetch3 = tex2D(_BumpTex3, coord3*_Bump_scale).xy - 0.5;   
				float3 bump1 = float3(0, bumpFetch1.x, bumpFetch1.y);
				float3 bump2 = float3(bumpFetch2.y, 0, bumpFetch2.x);
				float3 bump3 = float3(bumpFetch3.x, bumpFetch3.y, 0);


				blend_weights.y = max((blend_weights.y -(0.5/blend_weights.y) + 0.625),0);
 				blended_color = (col1.xyz * blend_weights.xxx +
				                col3.xyz * blend_weights.zzz) * 0.8
				                +  col2.xyz * blend_weights.yyy *1.3;  
				blended_bump_vec = bump1.xyz * blend_weights.xxx +  
				                   bump2.xyz * blend_weights.yyy +  
				                   bump3.xyz * blend_weights.zzz;  
				                   

				n = normalize(n + blended_bump_vec * _BumpPower);
				
				fixed atten = LIGHT_ATTENUATION(i);
					
				fixed4 c;
				c.rgb = blended_color*_Color;
				c.a = _Color.a;
				
				fixed lambert = saturate(dot(n, normalize(i.lightDir)));
		        
		        c.rgb = (c.rgb * _LightColor0.rgb * lambert) * (atten * _Contrast );
				c.a = _Color.a + _LightColor0.a * atten;
				
				return c;  
			}                                    
		ENDCG
		
	}
}

	Fallback "Diffuse"
}