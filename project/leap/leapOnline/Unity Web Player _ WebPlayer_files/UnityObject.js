if(typeof unityObject=="undefined"){var unityObject=function(){var J="Unity Player",W="application/vnd.unity",ah=window,aC=document,t=navigator,h=false,aJ=[],Q=[],R=[],V=null,q=null,Y=true,av=true,g=(document.location.protocol=="https:"),aE=g?"https://ssl-webplayer.unity3d.com/":"http://webplayer.unity3d.com/",a=g?"https://ssl-webplayer.unity3d.com/":"http://webplayer.unity3d.com/",ak=aE+"download_webplayer-3.x/",aF=false,aa=false,F=true,aN=false,r="_unity_triedjava",C=j(r),aH=[],z=true,ae=false,ad=!g&&false,ax=true,l=false,P=null,A=null,au=[],G=[],N=[],aj=null,c=null,w=3000,ay="undefined",ab="installed",ac="missing",u="broken",s="unsupported",b="ready",aK="start",e="error",y="first",aq="standard",v="java",d="clickonce",Z=function(){var aQ=t.userAgent,aS=t.platform;var aR=false;if(/msie/i.test(aQ)){aR=parseFloat(aQ.replace(/^.*msie ([0-9]+(\.[0-9]+)?).*$/i,"$1"))}else{if(/Trident/i.test(aQ)){aR=parseFloat(aQ.replace(/^.*rv:([0-9]+(\.[0-9]+)?).*$/i,"$1"))}}var aT={w3:typeof aC.getElementById!=ay&&typeof aC.getElementsByTagName!=ay&&typeof aC.createElement!=ay,win:aS?/win/i.test(aS):/win/i.test(aQ),mac:aS?/mac/i.test(aS):/mac/i.test(aQ),ie:aR,ff:/firefox/i.test(aQ),ch:/chrome/i.test(aQ),sf:/safari/i.test(aQ),wk:/webkit/i.test(aQ)?parseFloat(aQ.replace(/^.*webkit\/(\d+(\.\d+)?).*$/i,"$1")):false,x64:/win64/i.test(aQ)&&/x64/i.test(aQ),moz:/mozilla/i.test(aQ)?parseFloat(aQ.replace(/^.*mozilla\/([0-9]+(\.[0-9]+)?).*$/i,"$1")):0};var aU=aC.getElementsByTagName("script");for(var an=0;an<aU.length;++an){var aP=aU[an].src.match(/^(.*)3\.0\/uo\/UnityObject\.js$/i);if(aP){ak=aP[1];break}}function aO(aX,aW){for(var aY=0;aY<Math.max(aX.length,aW.length);++aY){var aV=(aY<aX.length)&&aX[aY]?new Number(aX[aY]):0;var aZ=(aY<aW.length)&&aW[aY]?new Number(aW[aY]):0;if(aV<aZ){return -1}if(aV>aZ){return 1}}return 0}aT.java=function(){if(t.javaEnabled()){var aY=(aT.win&&aT.ff);var a1=false;if(aY||a1){if(typeof t.mimeTypes!=ay){var a0=aY?[1,6,0,12]:[1,4,2,0];for(var aX=0;aX<t.mimeTypes.length;++aX){if(t.mimeTypes[aX].enabledPlugin){var aV=t.mimeTypes[aX].type.match(/^application\/x-java-applet;(?:jpi-)?version=(\d+)(?:\.(\d+)(?:\.(\d+)(?:_(\d+))?)?)?$/);if(aV!=null){if(aO(a0,aV.slice(1))<=0){return true}}}}}}else{if(aT.win&&aT.ie){if(typeof ActiveXObject!=ay){function aW(a2){try{return new ActiveXObject("JavaWebStart.isInstalled."+a2+".0")!=null}catch(a3){return false}}function aZ(a2){try{return new ActiveXObject("JavaPlugin.160_"+a2)!=null}catch(a3){return false}}if(aW("1.7.0")){return true}if(aT.ie>=8){if(aW("1.6.0")){for(var aX=12;aX<=50;++aX){if(aZ(aX)){if(aT.ie==9&&aT.moz==5&&aX<24){continue}else{return true}}}return false}}else{return aW("1.6.0")||aW("1.5.0")||aW("1.4.2")}}}}}return false}();aT.co=function(){if(aT.win&&aT.ie){var aV=aQ.match(/(\.NET CLR [0-9.]+)|(\.NET[0-9.]+)/g);if(aV!=null){var aY=[3,5,0];for(var aX=0;aX<aV.length;++aX){var aW=aV[aX].match(/[0-9.]{2,}/g)[0].split(".");if(aO(aY,aW)<=0){return true}}}}return false}();return aT}(),aL=function(){var an=function(){var aT=new Date();var aS=Date.UTC(aT.getUTCFullYear(),aT.getUTCMonth(),aT.getUTCDay(),aT.getUTCHours(),aT.getUTCMinutes(),aT.getUTCSeconds(),aT.getUTCMilliseconds());return aS.toString(16)+aR().toString(16)}(),aP=0;function aR(){return Math.floor(Math.random()*2147483647)}function aO(aW,aU,aY,aT){if(!ad){if(aT){aT()}return}var aS="http://unityanalyticscapture.appspot.com/event?u="+encodeURIComponent(an)+"&s="+encodeURIComponent(aP)+"&e="+encodeURIComponent(aW);aS+="&v="+encodeURIComponent("7684ad0c5a44");if(aj){aS+="?r="+aj}if(aU){aS+="&t="+encodeURIComponent(aU)}if(aY){aS+="&d="+encodeURIComponent(aY)}var aV=new Image();if(aT){var aX=null;aV.onload=aV.onerror=function(){clearTimeout(aX);aV.onload=aV.onerror=null;aT()};aX=setTimeout(aV.onload,w)}aV.src=aS}function aQ(aX,aV,aY,a5){if(!ax){if(a5){a5()}return}var a1=window._ugaq=window._ugaq||[];if(!l){a1.push(["unity._setAccount","UA-16068464-16"]);a1.push(["unity._setCustomVar",1,"Revision","7684ad0c5a44",2])}var a0="/webplayer/install/"+aX;var a2="?";if(aV){a0+=a2+"t="+encodeURIComponent(aV);a2="&"}if(aY){a0+=a2+"d="+encodeURIComponent(aY);a2="&"}if(a5){var aT;var aU=function(){unityObject.googleAnalyticsCallback=null;clearTimeout(aT);a5()};unityObject.googleAnalyticsCallback=aU;aT=setTimeout(aU,w)}a1.push(["unity._trackPageview",a0]);if(!l){var a4=ak+"3.0/uo/ga.js";var a3=aC.getElementsByTagName("script");for(var aS=0;aS<a3.length;++aS){if(a3[aS].src&&a3[aS].src.toLowerCase()==a4.toLowerCase()){l=true;break}}if(!l){l=true;var aZ=aC.createElement("script");aZ.type="text/javascript";aZ.async=true;aZ.src=a4;var aW=document.getElementsByTagName("script")[0];aW.parentNode.insertBefore(aZ,aW)}}}return{send:function(aV,aU,aX,aS){++aP;var aW=2;function aT(){if(0==--aW){P=null;location.href=aS}}aO(aV,aU,aX,aS?aT:null);aQ(aV,aU,aX,aS?aT:null)}}}(),aw=function(){if(!Z.w3){return}if((typeof aC.readyState!=ay&&aC.readyState=="complete")||(typeof aC.readyState==ay&&(aC.getElementsByTagName("body")[0]||aC.body))){ap()}if(h){return}if(typeof aC.addEventListener!=ay){aC.addEventListener("DOMContentLoaded",ap,false)}else{if(Z.win&&Z.ie){aC.attachEvent("onreadystatechange",function(){if(aC.readyState=="complete"){aC.detachEvent("onreadystatechange",arguments.callee);ap()}});if(ah==top){(function(){if(h){return}try{aC.documentElement.doScroll("left")}catch(an){setTimeout(arguments.callee,10);return}ap()})()}}else{if(Z.wk){(function(){if(h){return}if(!/loaded|complete/.test(aC.readyState)){setTimeout(arguments.callee,10);return}ap()})()}}}ag(ap)}();function U(aO,an,aP){if(aO==ab){if(c==null||c==ab){return}}else{if(c!=null){return}}c=aO;aL.send(aO,an,aP)}function al(aP,aO,aQ,an){c=aP;aL.send(aP,aO,aQ,an)}function ar(aO,an,aP){if(aO==y){if(c==null){return}}c=aO;aL.send(aO,an,aP)}function j(an){var aO=new RegExp(escape(an)+"=([^;]+)");if(aO.test(aC.cookie+";")){aO.exec(aC.cookie+";");return RegExp.$1}return false}function k(an,aO){document.cookie=escape(an)+"="+escape(aO)+"; path=/"}function aA(an){if(h){an()}else{aJ[aJ.length]=an}}function ap(){if(h){return}try{var an=aC.getElementsByTagName("body")[0];var aO=an.appendChild(aC.createElement("span"));an.removeChild(aO)}catch(aQ){return}h=true;for(var aP=0;aP<aJ.length;++aP){aJ[aP]()}}function ag(aO){if(typeof ah.addEventListener!=ay){ah.addEventListener("load",aO,false)}else{if(typeof aC.addEventListener!=ay){aC.addEventListener("load",aO,false)}else{if(typeof ah.attachEvent!=ay){O(ah,"onload",aO)}else{if(typeof window.onload=="function"){var an=window.onload;ah.onload=function(){an();aO()}}else{ah.onload=aO}}}}}function O(aO,an,aP){aO.attachEvent(an,aP);R[R.length]={target:aO,type:an,event:aP}}function aM(aR){var aU=0;if(aR){var aQ=aR.toLowerCase().match(/^(\d+)(?:\.(\d+)(?:\.(\d+)([dabfr])?(\d+)?)?)?$/);if(aQ&&aQ[1]){var aP=aQ[1];var aS=aQ[2]?aQ[2]:0;var aT=aQ[3]?aQ[3]:0;var an=aQ[4]?aQ[4]:"r";var aO=aQ[5]?aQ[5]:0;aU|=((aP/10)%10)<<28;aU|=(aP%10)<<24;aU|=(aS%10)<<20;aU|=(aT%10)<<16;aU|={d:2<<12,a:4<<12,b:6<<12,f:8<<12,r:8<<12}[an];aU|=((aO/100)%10)<<8;aU|=((aO/10)%10)<<4;aU|=(aO%10)}}return aU}function L(aR,an){var aP=aC.getElementsByTagName("body")[0];var aO=aC.createElement("object");if(aP&&aO){aO.setAttribute("type",W);aO.style.visibility="hidden";aP.appendChild(aO);var aQ=0;(function(){if(typeof aO.GetPluginVersion==ay){if(aQ++<10){setTimeout(arguments.callee,10)}else{aP.removeChild(aO);aR(null)}}else{var aS={};if(an){for(var aT=0;aT<an.length;++aT){aS[an[aT]]=aO.GetUnityVersion(an[aT])}}aS.plugin=aO.GetPluginVersion();aP.removeChild(aO);aR(aS)}})()}else{aR(null)}}function ao(aY,aO){var aQ=ac;var aR;t.plugins.refresh();if(typeof t.plugins!=ay&&t.plugins[J]&&typeof t.mimeTypes!=ay&&t.mimeTypes[W]&&t.mimeTypes[W].enabledPlugin){aQ=ab;if(Z.sf&&/Mac OS X 10_6/.test(t.appVersion)){L(function(aZ){if(!aZ||!aZ.plugin){aQ=u;aR="OSX10.6-SFx64"}U(aQ,A,aR);aY(aQ,aZ)},aO);return}else{if(Z.mac&&Z.ch){L(function(aZ){if(aZ&&(aM(aZ.plugin)<=aM("2.6.1f3"))){aQ=u;aR="OSX-CH-U<=2.6.1f3"}U(aQ,A,aR);aY(aQ,aZ)},aO);return}else{if(aO){L(function(aZ){U(aQ,A,aR);aY(aQ,aZ)},aO);return}}}}else{if(Z.ie){var aP=false;try{if(ActiveXObject.prototype!=null){aP=true}}catch(aT){}if(!aP){aQ=s;aR="ActiveXFailed"}else{aQ=ac;try{var aX=new ActiveXObject("UnityWebPlayer.UnityWebPlayer.1");var an=aX.GetPluginVersion();if(aO){var aW={};for(var aV=0;aV<aO.length;++aV){aW[aO[aV]]=aX.GetUnityVersion(aO[aV])}aW.plugin=an}aQ=ab;if(an=="2.5.0f5"){var aU=/Windows NT \d+\.\d+/.exec(t.userAgent);if(aU&&aU.length>0){var aS=parseFloat(aU[0].split(" ")[2]);if(aS>=6){aQ=u;aR="WIN-U2.5.0f5"}}}}catch(aT){}}}}U(aQ,A,aR);aY(aQ,aW)}function n(an){if(/^[-+]?[0-9]+$/.test(an)){an+="px"}return an}function X(aO,aP,aQ,aW){var aU=aC.getElementById(aO);if(!aU){if(aW){aW({success:false,id:aO,type:A,error:"UnityElementNotFound"})}return}if(Z.win&&Z.ie){var aV="";for(var an in aP){if(aP[an]!=Object.prototype[an]){if(an.toLowerCase()=="styleclass"){aV+=' class="'+aP[an]+'"'}else{if(an.toLowerCase()!="classid"){aV+=" "+an+'="'+aP[an]+'"'}}}}var aT="";for(var an in aQ){if(aQ[an]!=Object.prototype[an]){if(an.toLowerCase()!="classid"){aT+='<param name="'+an+'" value="'+aQ[an]+'" />'}}}aU.outerHTML='<div id="'+aO+'" style="width: '+n(aP.width)+"; height: "+n(aP.height)+'; visibility: hidden;"><object classid="clsid:444785F1-DE89-4295-863A-D46C3A781394" style="display: block; width: 100%; height: 100%;"'+aV+">"+aT+"</object></div>";Q[Q.length]=aO}else{var aR=aC.createElement("div");aR.setAttribute("id",aO);aR.style.width=n(aP.width);aR.style.height=n(aP.height);aR.style.visibility="hidden";var aS=aC.createElement("embed");aS.setAttribute("type",W);aS.style.display="block";aS.style.width="100%";aS.style.height="100%";for(var an in aP){if(aP[an]!=Object.prototype[an]){if(an.toLowerCase()=="styleclass"){aS.setAttribute("class",aP[an])}else{if(an.toLowerCase()!="classid"){aS.setAttribute(an,aP[an])}}}}for(var an in aQ){if(aQ[an]!=Object.prototype[an]){if(an.toLowerCase()!="classid"){aS.setAttribute(an,aQ[an])}}}aR.appendChild(aS);aU.parentNode.replaceChild(aR,aU)}p(aO,function(aY){if(aY){aY.parentNode.style.visibility="visible";if(!Z.sf||!Z.mac){setTimeout(function(){aY.focus()},100)}}else{aB(aO)}if(aW){var aX;if(!aY){aX="UnityElementNotFound"}aW({success:Boolean(aY),id:aO,ref:aY,type:A,error:aX})}})}function B(an,aO){for(var aP in an){if(aP.toLowerCase()==aO){var aQ=an[aP];if(/^((?:[\da-f]){2}){3,4}$/i.test(aQ)){return aQ.substr(0,6)}break}}return null}function m(aO,aQ,aR,aZ,aS){var aU=aC.getElementById(aO);if(aU){var aP=n(aQ.width);var aV=n(aQ.height);var aX=B(aR,"backgroundcolor");var aW=B(aR,"textcolor");var aT=B(aR,"bordercolor");if(Z.win&&Z.ie){var an="font-family: Verdana; font-size: 12px; text-align: center;";if(aX){an+=" background-color: #"+aX+";"}if(aW){an+=" color: #"+aW+";"}if(aT){an+=" border: 1px solid #"+aT+";"}var aY="";if(av){an+=" width: "+aP+"; height: "+aV+";";aY="width: "+aP+"; line-height: "+aV+";"}aU.outerHTML='<div id="'+aO+'" style="'+an+'"><span style="'+aY+'">'+aS+"</span></div>"}}if(aZ){aZ({success:false,id:aO,error:aS})}}function S(aR,aT,a7,a0,bb,aV,a4){preInstallCallback=G[aR];var bf=aC.getElementById(aR);if(bf){var aP=aq;if(!Z.x64&&F&&Z.java&&!C&&!j(r)){aH[aR]={attributes:aT,params:a7,callback:a0,broken:bb};var a9="javascript:unityObject.doJavaInstall('"+aR+"');";aP=v}else{if(z&&Z.co){var a9=ak+"3.0/co/UnityWebPlayer.application?installer="+encodeURIComponent(ak+E());aP=d}else{if(Z.win){var a9=ak+E()}else{if(t.platform=="MacIntel"){var a9=ak+(aF?"webplayer-i386.dmg":"webplayer-mini.dmg");if(aj){a9+="?referrer="+aj}}else{if(t.platform=="MacPPC"){var a9=ak+(aF?"webplayer-ppc.dmg":"webplayer-mini.dmg");if(aj){a9+="?referrer="+aj}}else{var a9='javascript:window.open("http://unity3d.com/webplayer/");';aP=s}}}}}al(b,aP);if(bb){var ba="Unity Web Player. Install now! Restart your browser after install.";var a1=a+"/installation/getunityrestart.png";var a8=190;var aS=75}else{var ba="Unity Web Player. Install now!";var a1=a+"installation/getunity.png";var a8=193;var aS=63}var a3=aT.width||a8;var aU=aT.height||aS;var aW=n(-parseInt(aS/2));var aO="unityObject.notifyBeginInstall('"+aR+"','"+aP+"');unityObject.setInstallStatus('"+aK+"','"+aP+"',null";if(aP!=d){aO+=",'"+a9.replace(/'/g,"\\'")+"');"}else{aO+=");document.location='"+a9+"';"}aO+="return false;";var bi=B(a7,"backgroundcolor");var aQ=B(a7,"textcolor");var a2=B(a7,"bordercolor");var aY=aR+"_img";if(Z.win&&Z.ie){var a5='<img id="'+aY+'" alt="'+ba+'" src="'+a1+'" width="'+a8+'" height="'+aS+'" style="border-width: 0px;" />';var be='<a href="'+a9+'" title="'+ba+'" onclick="'+aO+'"';if(av){be+=' style="display: block; height: '+n(aS)+"; position: relative; top: "+aW+';"'}be+=">"+a5+"</a>";var a6="";if(bi){a6+=" background-color: #"+bi+";"}if(aQ){a6+=" color: #"+aQ+";"}if(a2){a6+=" border: 1px solid #"+a2+";"}if(av){var bd='<div style="width: '+n(a8)+'; margin: auto; position: relative; top: 50%;">'+be+"</div>";bf.outerHTML='<div id="'+aR+'" style="width: '+n(a3)+"; height: "+n(aU)+"; text-align: center;"+a6+'">'+bd+"</div>"}else{bf.outerHTML='<div id="'+aR+'" style="'+a6+'">'+be+"</div>"}}else{var bh=aC.createElement("div");bh.setAttribute("id",aR);if(bi){bh.style.backgroundColor="#"+bi}if(aQ){bh.style.color="#"+aQ}if(a2){bh.style.border="1px solid #"+a2}if(av){bh.style.width=n(a3);bh.style.height=n(aU);var aZ=aC.createElement("div");aZ.style.width=n(a8);aZ.style.margin="auto";aZ.style.position="relative";aZ.style.top="50%"}var aX=aC.createElement("a");aX.setAttribute("href",a9);aX.setAttribute("title",ba);aX.setAttribute("onclick",aO);if(av){aX.style.display="block";aX.style.height=n(aS);aX.style.position="relative";aX.style.top=aW}var an=aC.createElement("img");an.setAttribute("id",aY);an.setAttribute("alt",ba);an.setAttribute("src",a1);an.setAttribute("width",a8);an.setAttribute("height",aS);an.style.borderWidth="0px";aX.appendChild(an);if(av){aZ.appendChild(aX);bh.appendChild(aZ)}else{bh.appendChild(aX)}bf.parentNode.replaceChild(bh,bf)}T(aR,true)}if(a0){a0({success:false,id:aR,type:aV,error:a4})}if(preInstallCallback){preInstallCallback({id:aR,type:aP})}A=aP;if(aa){if(aP==v){al(aK,aP);o(aR)}else{if(aP==d){if(!ae){ae=true;ag(function(){al(aK,aP);aC.location=ak+"3.0/co/UnityWebPlayer.application?installer="+encodeURIComponent(ak+E())})}}}}else{if(aP==v&&aN){N.push(aY);H(aR+"_java")}}}function E(){var an="";if(Z.x64){an=aF?"UnityWebPlayerFull64.exe":"UnityWebPlayer64.exe"}else{an=aF?"UnityWebPlayerFull.exe":"UnityWebPlayer.exe"}if(aj){an+="?referrer="+aj}return an}function aD(){var an="UnityPlayer.plugin.zip";if(aj){an+="?referrer="+aj}return an}function K(){return ak+(Z.win?E():aD())}function I(aP,aQ,aR){if(Z.win&&Z.ie){var aU="";for(var an in aP){aU+=" "+an+'="'+aP[an]+'"'}var aS="";for(var an in aQ){aS+='<param name="'+an+'" value="'+aQ[an]+'" />'}aR.outerHTML="<object"+aU+">"+aS+"</object>"}else{var aT=aC.createElement("object");for(var an in aP){aT.setAttribute(an,aP[an])}for(var an in aQ){var aO=aC.createElement("param");aO.name=an;aO.value=aQ[an];aT.appendChild(aO)}aR.parentNode.replaceChild(aT,aR)}}function D(an){if(typeof an==ay){return false}if(!an.complete){return false}if(typeof an.naturalWidth!=ay&&an.naturalWidth==0){return false}return true}function H(aP){var aO=false;for(i=0;i<N.length;i++){if(!N[i]){continue}var an=aC.images[N[i]];if(!D(an)){aO=true}else{N[i]=null}}if(aO){setTimeout(arguments.callee,100)}else{setTimeout(function(){M(aP)},100)}}function M(aQ){var aS=aC.getElementById(aQ);if(!aS){aS=aC.createElement("div");var an=aC.body.lastChild;aC.body.insertBefore(aS,an.nextSibling)}var aR=ak+"3.0/jws/";var aO={id:aQ,type:"application/x-java-applet",code:"JVMPreloader",width:1,height:1,name:"JVM Preloader"};var aP={context:aQ,codebase:aR,classloader_cache:false,scriptable:true,mayscript:true,codebase:aR};I(aO,aP,aS);T(aQ,true)}function o(aQ){C=true;k(r,C);var aS=aC.getElementById(aQ);var aR=aH[aQ];var an={id:aQ,type:"application/x-java-applet",archive:ak+"3.0/jws/UnityWebPlayer.jar",code:"UnityWebPlayer",width:aR.attributes.width||600,height:aR.attributes.height||450,name:"Unity Web Player"};if(Z.win&&Z.ff){an.style="visibility: hidden;"}var aO={context:aQ,jnlp_href:ak+"3.0/jws/UnityWebPlayer.jnlp",classloader_cache:false,installer:K(),image:a+"installation/unitylogo.png",centerimage:true,boxborder:false,scriptable:true,mayscript:true};for(var aP in aR.params){if(aP=="src"){continue}if(aR.params[aP]!=Object.prototype[aP]){aO[aP]=aR.params[aP];if(aP.toLowerCase()=="logoimage"){aO.image=aR.params[aP]}else{if(aP.toLowerCase()=="backgroundcolor"){aO.boxbgcolor="#"+aR.params[aP]}else{if(aP.toLowerCase()=="bordercolor"){aO.boxborder=true}else{if(aP.toLowerCase()=="textcolor"){aO.boxfgcolor="#"+aR.params[aP]}}}}}}I(an,aO,aS);T(aQ,true)}function am(an){setTimeout(function(){var aO=aC.getElementById(an);if(aO){aO.parentNode.removeChild(aO)}},0)}function ai(an){}function az(aO,an,aQ){if(!an){var aP=aH[aO];al(e,v,aQ);S(aO,aP.attributes,aP.params,aP.callback,aP.broken,v,aQ)}}function aG(aO,an){callback=au[aO];if(callback){callback({id:aO,type:an})}}function aB(aP){var aO=aC.getElementById(aP);if(aO){if(Z.win&&Z.ie){var an=aO.firstChild;if(an&&an.nodeName=="OBJECT"){aO.style.display="none";(function(){if(an.readyState==4){for(var aQ in an){if(typeof an[aQ]=="function"){an[aQ]=null}}aO.parentNode.removeChild(aO)}else{setTimeout(arguments.callee,10)}})();return}}aO.parentNode.removeChild(aO)}}function p(aR,aS){var aO=aC.getElementById(aR);if(!aO){if(aS){aS(null)}return null}var an;if(Z.win&&Z.ie){var aP=aO.getElementsByTagName("object")[0];if(aP&&aP.nodeName=="OBJECT"){an=aP}}else{var aQ=aO.getElementsByTagName("embed")[0];if(aQ&&aQ.nodeName=="EMBED"){an=aQ}}return(function(){if(an&&typeof an.GetPluginVersion==ay){if(aS){setTimeout(arguments.callee,10)}return null}if(aS){aS(an)}return an})()}function T(aP,an){if(!Y){return}var aO=an?"visible":"hidden";if(h&&aC.getElementById(aP)){aC.getElementById(aP).style.visibility=aO}else{at("#"+aP,"visibility: "+aO+";")}}function at(aS,aO,aR,aT){if(Z.mac&&Z.ie){return}var aP=aC.getElementsByTagName("head")[0];if(!aP){return}var an=(aR&&typeof aR=="string")?aR:"screen";if(aT){V=null;q=null}if(!V||q!=an){var aQ=aC.createElement("style");aQ.setAttribute("type","text/css");aQ.setAttribute("media",an);V=aP.appendChild(aQ);if(Z.win&&Z.ie&&typeof aC.styleSheets!=ay&&aC.styleSheets.length>0){V=aC.styleSheets[aC.styleSheets.length-1]}q=an}if(Z.win&&Z.ie&&typeof V.addRule=="object"){V.addRule(aS,aO)}else{if(V&&typeof aC.createTextNode!=ay){V.appendChild(aC.createTextNode(aS+" { "+aO+" }"))}}}var x=function(){if(Z.win&&Z.ie){if(typeof ah.attachEvent!=ay){O(ah,"onunload",f)}else{if(typeof ah.onunload=="function"){var an=ah.onunload;ah.onunload=function(){an();f()}}else{ah.onunload=f}}}}();function f(){for(var aO in R){var an=R[aO];an.target.detachEvent(an.type,an.event)}for(var aO in Q){aB(Q[aO])}for(var aO in Z){Z[aO]=null}Z=null;for(var aO in unityObject){unityObject[aO]=null}unityObject=null}function aI(aR,aO,an){var aP={};var aQ=-1;if(aR&&typeof aR=="object"){for(var aS in aR){aP[aS]=aR[aS];if(aS.toLowerCase()=="tabindex"){aQ=aP[aS]}}}aP.width=aO;aP.height=an;if(aQ==-1){aP.tabIndex=0}return aP}function af(an,aR){var aQ="unityObject.firstFrameCallback();";var aP={};if(an&&typeof an=="object"){for(var aO in an){aP[aO]=an[aO];if(aO.toLowerCase()=="firstframecallback"){aP[aO]=aQ+aP[aO];aQ=null}}}if(aQ){aP.firstFrameCallback=aQ}aP.src=aR;return aP}return{embedUnity:function(aR,aT,aP,aO,an,aS,aQ){if(Z.w3&&!(Z.wk&&Z.wk<312)&&aR&&aT&&aP&&aO){aA(function(){var aV=aI(aS,aP,aO);var aU=af(an,aT);ao(function(aW){if(aW==ab){X(aR,aV,aU,aQ)}else{if(aW==s){m(aR,aV,aU,aQ,"Unsupported browser.")}else{S(aR,aV,aU,aQ,aW==u,null,"NotInstalled");(function(){var aX=arguments.callee;ao(function(aY){if(aY==ab){T(aR,false);X(aR,aV,aU,aQ)}else{setTimeout(aX,500)}})})()}}})})}else{if(aQ){aQ({success:false,id:aR})}}},addPreInstallCallback:function(an,aO){G[an]=aO},addBeginInstallCallback:function(an,aO){au[an]=aO},getObjectById:function(an,aO){if(Z.w3&&an){return p(an,aO)}else{if(aO){aO(null)}}return null},setAutoHideShow:function(an){Y=an},setFullSizeMissing:function(an){av=an},enableFullInstall:function(an){aF=an},enableAutoInstall:function(an){aa=an},enableJavaInstall:function(an){F=an},enableJavaPreloading:function(an,aO){aN=an;if(typeof aO!=ay){N=aO}},enableClickOnceInstall:function(an){z=an},enableAnalytics:function(an){ad=!g&&an;ax=an},enableUnityAnalytics:function(an){ad=!g&&an},enableGoogleAnalytics:function(an){ax=an},setBaseDomain:function(aO){var an=aE;aE=aO;if(aE[aE.length-1]!="/"){aE+="/"}ak=aE+ak.substr(an.length)},setBaseDownloadUrl:function(aO){ak=aO;if(ak[ak.length-1]!="/"){ak+="/"}var an=new RegExp("([^:]*)://([^/]*)");var aP=aO.match(an);aE=aP[0]+"/"},setReferrer:function(an){aj=an?encodeURIComponent(an):an},addLoadEvent:ag,addDomLoadEvent:aA,ua:Z,detectUnity:function(aO,an){if(Z.w3&&!(Z.wk&&Z.wk<312)&&aO){aA(function(){ao(aO,an)})}else{if(aO){aO(ac)}}},createUnity:function(aO,an,aP,aQ){if(Z.w3&&!(Z.wk&&Z.wk<312)&&aO&&an&&aP&&aQ){X(aO,aP,an,aQ)}else{if(aQ){aQ({success:false,id:aO})}}},removeUnity:function(an){if(Z.w3){aB(an)}},notifyBeginInstall:function(aO,an){aG(aO,an)},setInstallStatus:function(aP,aO,aQ,an){al(aP,aO,aQ,an)},doJavaInstall:function(an){o(an)},jvmPreloaded:function(an){am(an)},appletStarted:function(an){ai(an)},javaInstallDone:function(aP,an,aO){setTimeout('unityObject.javaInstallDoneDirect("'+aP+'", '+an+', "'+aO+'");',0)},javaInstallDoneDirect:function(aP,an,aO){az(aP,an,aO)},firstFrameCallback:function(){ar(y,A)}}}()};