//window.size();

function backgroundSetup()
{
	
	//$('#dynamicBgCnt').css({
	$('#Background').css({
		'display':'inline'
	});
	

	if(jQuery.browser.mobile)
	{
		return;
	}
	
	
	calcStripeCSS("bgGradCont", -1);
	calcStripeCSS("bgGradContMirror", -1);
	
	var transformVal = "scale(-1,1)";
	$("#bgGradCont").css({
		'z-index' : '999',
		'-webkit-transform' : transformVal,
		'-moz-transform'    : transformVal,
		'-ms-transform'     : transformVal,
		'-o-transform'      : transformVal,
		'transform'         : transformVal
	});
	
	
	$('#bgGradCont').css({
		'display':'inline'
	});
	$('#bgGradContMirror').css({
		'display':'inline'
	});
}

function calcStripeCSS(parentID, sign)
{
	
	var div = $('#'+parentID);
	var count = div.children().length;
	var i = count+1 -1;
	
	div.children().each(function () 
	{
		var tra1;
		var tra2;
		var tra3;
		var rot1;
		var rot2;

		i--;
		if( i < 1 )
			i -=1;
		
		/*
		tra1 = {x:-400*sign + i*30*sign,
					y:800};
		rot1 = (i+1)*8*sign;
		tra2 = {x:i*-20*sign,
					y:30+i*70};
		rot2 = -43*(1+1/i*0.55)*sign;
		tra3 = {x:100,
					y:0};
		*/	

		/*
		//classic wide corners
		tra1 = {x:-600*sign + i*30*sign,
					y:500};
		rot1 = (i+1)*8*sign;
		tra2 = {x:i*10*sign,
					y:30+i*50};
		rot2 = -43*(1+1/i*0.55)*sign;
		tra3 = {x:190,
					y:-100};
		*/
		
		var bprT = {x:0, y:0, z:1, w:0, u:0, s:0};
				

		if(i<1){
			//bprT.x = 50*Math.abs(i);
			//bprT.y = 50*Math.abs(i);
			
		}
		if(i<=3){
			bprT.x = 12;//50*Math.abs(i);
			//bprT.y = 50;//*Math.abs(i);
			bprT.w = 80;
			bprT.z = 1.2;
			
		}
		else if(i>9){
			bprT.z = 1.1 - 0.005*(i-9);
			bprT.x = 0;
			bprT.y = -50 - 5*(i-9);
			bprT.u = -150;
		}

		
		if(i==1){
			bprT.x = 35;
			bprT.z = 1.45;
		}
		else
		if(i==-1){
			bprT.x = 95;
			bprT.y = 0;
			bprT.z = 0.35;
			bprT.w = 80;
		}
		else if(i==3){
			bprT.x = 52;
			bprT.s = 1;

		}
		
		if(i<=1){
			
			bprT.z += 0.3;
			bprT.y -=20;
		}
		
		if(i==13){//if(i<1){
			//bprT.x = 50*Math.abs(i);
			//bprT.y = 50*Math.abs(i);
			bprT.x += 40;
			bprT.y += -50;
			//bprT.x += 310;
			//bprT.y += 80;
			
			bprT.z = 1.07;
		}
		else
		if(i ==12){
			//bprT.x += 60;
			//bprT.y += -10;
			bprT.x += 255;
			bprT.y += 170;
			bprT.z = 1.07;
		}
		else
		if(i ==11){
			bprT.x += 40;
			bprT.y += 6;
		}
		
		if(i>=9 && i<=12){
			var a = 1+(5-(13-i))*0.5;
			bprT.x += 10*a;
			bprT.y += -10*a;
			//bprT.z += 1.05;
		}
		
		
		var si = i;
		si = (si <= 3? -45+i : (si > 3 && si < 10? si-50 : si));
		i = Math.abs(i);
		
		tra1 = {x:-670*sign + i*30*sign + bprT.x + bprT.x, y:500 + bprT.y + bprT.w};
		rot1 = (i+1)*8*sign*bprT.z;
		tra2 = {x:i*10*sign,
					y:30+i*60};//60
		rot2 = -43*(1+1/i*0.75085)*sign;
		tra3 = {x:90,
				y:-100+bprT.u};
		
		var transformVal = 
			
			'translate('+tra1.x+'px,'+tra1.y+'px)' + 
			'rotate(' + rot1 + 'deg) '+
			'translate('+tra2.x+'px,'+tra2.y+'px) ' +
			'rotate('+rot2+'deg) ' +
			'translate('+tra3.x+'px,'+tra3.y+'px) '
			+' scale('+(1+bprT.s)+',1.3) ' 
			;
		
		$(this).css({
		  'position' : 'absolute',
		  'left' : '50%',
		  'top' : '-50%',

		  //'width' : Math.random()*3+0.9+'%',
		  'width' : '8%',
		  //'width' : '5%',
		  //'width' : '2%',
		  //'width' : '0.9%',
		  //'width' : '1.9%',
		  //'width' : 16-i+'%',
		  'z-index' : 100+si,
		  '-webkit-transform' : transformVal,
		  '-moz-transform'    : transformVal,
		  '-ms-transform'     : transformVal,
		  '-o-transform'      : transformVal,
		  'transform'         : transformVal
		 
		});
	
	});
	
	/*
	var list = div;
	var listItems = list.children();
	list.append(listItems.get().reverse());
	*/
}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function swap(){

	$("#icontent").css("visibility", "visible");
	//$('.introText').css("visibility", "hidden");
	$('.introText').remove();
	$('#loading').remove();
}
function swapB(){
	$('#loading').remove(); 
}

var myVar;

function stopLoadInterval() {
    clearInterval(myVar);
}
/*
var isNotAtBottom = true;
$(window).scroll(function() {
   if(isNotAtBottom && $(window).scrollTop() + $(window).height() == $(document).height()) {
      resizeIframe2();
	  setTimeout(resizeIframe2, 2000);
	  isNotAtBottom = false;
   }
   else{
	   isNotAtBottom = true;
   }
});
*/

/*
$(document).ready(function() {
	myVar = setInterval(function(){resizeIframe2()}, 1250);
});
*/
//myVar = setInterval(function(){resizeIframe2()}, 1250);
function onDomContentLoad(){

	//alert("onDomContentLoaded"); 
	ifr = document.getElementById("icontent");
	ifr.contentWindow.scaleGallery();
	setTimeout(resizeIframe2, timeoot);  

	//myVar = setInterval(function(){resizeIframe2()}, 1250);

	//resizeIframe(ifr);
	
	//swap();  //not here
}


//window.onload = 
function onMainLoaded()
{ 
	

	//var ifr = document.getElementById("icontent");
	var project = getUrlParameter("project");
	
	var ifr = "<iframe src='./"; 
	var a = ""; 
	//onload='resizeIframe(this); swap();'
	var me = "'  id='icontent' scrolling='no'  frameborder='0' allowTransparency='true' seamless></iframe>"; 
	
	
	
	//$("#icontent").css("overflow", "visible");
	/*
	switch (project) {//no longer needed since I decided to name the folders the same as the url parameter
		
		case "gpuMedley":
			a="project/"+project+"/index.html"; 
			break;
		case "gpgpu":
			a="project/"+project+"/index.html"; 
			break;
		case "pendulum":
			a="project/"+project+"/index.html"; 
			break;
		case "dadiu":
			a="project/"+project+"/index.html"; 
			break;
		case "bshadows":
			a="project/"+project+"/index.html"; 
			break;
		case "leap":
			a="project/"+project+"/index.html"; 
			break;
		case "holo":
			a="project/"+project+"/index.html"; 
			break;
		case "particles":
			a="project/"+project+"/index.html"; 
			break;
			
		case "idi":
			return;
			//a="project/"+project+"/index.html"; 
			//window.location.href = "./"+a; 
			break;
		default:
			a="default.html";  
			var intro = $('.introTextPreview');
			$(intro).css("visibility", "visible");
			$(intro).css("position", "relative");
			//alert('default');
		
	}
	*/
	if(project != null){
		a="project/"+project+"/index.html"; 
	}
	else{
		a="default.html";  
		var intro = $('.introTextPreview');
		$(intro).css("visibility", "visible");
		$(intro).css("position", "relative");
		//alert('default');
	}

	$("#projects").append(ifr+a+me); 
	swap();
	//resizeIframe2();
	
	setInterval(function(){resizeIframe2()}, 1250);//either vids or things blocked by adblockers make the page load forever. Can't know for sure (for now) when to stop resizing the page to fit the content.
	
	backgroundSetup();
};


var debounce = function (func, threshold, execAsap) 
{
	var timeout;
		 
	return function debounced () {
		var obj = this, args = arguments;
		function delayed () {
			if (!execAsap)
				func.apply(obj, args);
			timeout = null; 
		};
		 
		if (timeout)
			clearTimeout(timeout);
		else if (execAsap)
			func.apply(obj, args);
		 
		timeout = setTimeout(delayed, threshold || 100); 
	};
}

var extraHeight = 88;//1.005;
function resizeIframe(obj){
    //obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
	obj.style.height = obj.contentWindow.window.size.h + 'px';
	//var w = window.parent.document.getElementById("centerPanel");
	var w = document.getElementById("centerPanel");
	obj.style.width = w.style.width + "px";  
}

var once = true;

function resizeIframe2() {
	//console.log("tick");
	var $icontObj = $("#icontent");
	var $icontObjParent = $("#centerPanel");

	var newHeight = $icontObj.contents().find('body').find("div").height() + extraHeight;
	if(newHeight<900){//do something proper
		newHeight = 900;
	}

    $icontObj.height(newHeight + "px");

	 $('#footer').css('top', $("#centerPanel").height() );


	$icontObjParent.width($(window).width() + "px");// + "px"; 
	//$icontObj.css('left', -Math.round($("#ttlCnt").offset().left));
	var val = Math.round($("#ttlCnt").offset().left - $(window).scrollLeft()) ;

	if($icontObj.offset().left < - 584){
		$icontObj.css('left', val);


	}
	else{

	}
	
	//console.log($icontObj.offset().left);
}

var timeoot = 250;
window.onresize = debounce(function (e) {
	flag = true;
	//var point = window.center({width:1,height:1});
	//doCenter(point);
	//scaleGallery(); 
	var ifr = document.getElementById("icontent");

	ifr.contentWindow.scaleGallery();
	setTimeout(resizeIframe2, timeoot);  
	//resizeIframe(ifr);   
	
// do something here, but only once after mouse cursor stops 
}, 50, false);


var mousewheelevt;
function makeWheelEvent(){
	/*
	mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
	
	if (document.attachEvent) //if IE (and Opera depending on user setting)
		document.attachEvent("on"+mousewheelevt, function(e){scrollTest(e)})
	else if (document.addEventListener) //WC3 browsers 
		document.addEventListener(mousewheelevt, function(e){scrollTest(e)}, false)
	
	document.onkeydown = checkKey;
	*/
	window.onscroll = scrollTest; 
}

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38' || e.keyCode == '40') {
        // up arrow   // down arrow
		scrollTest(e); 
    }
}

document.getScroll= function(){
	 if(window.pageYOffset!= undefined){
	  return [pageXOffset, pageYOffset];
	 }
	 else{
	  var sx, sy, d= document, r= d.documentElement, b= d.body;
	  sx= r.scrollLeft || b.scrollLeft || 0;
	  sy= r.scrollTop || b.scrollTop || 0;
	  return [sx, sy];
	 }
}


var ifr;// = document.getElementById("icontent"); 
function scrollTest(e){
}
function scrollTestRemoved(e){
	//If you'd like to check for ANY PART of the element, use (true)
	//alert($('#webplayer').visible());
		
	//alert(document.getScroll()[1]); 
	if(ifr == null || ifr == undefined )
		ifr = document.getElementById("icontent");

	if(ifr == null || ifr == undefined )
		return;
	
	//if(window.scrollHeight - window.scrollTop === window.clientHeight)
	/*
	if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
        if (document.documentElement.scrollHeight == (document.documentElement.scrollTop + document.documentElement.clientHeight)) {
            ifr.contentWindow.handleScroll(900);
			alert(" "+document.getScroll()[1]);
        }
    } else 
        if (document.body.scrollHeight == (document.body.scrollTop + document.body.clientHeight)) {
            ifr.contentWindow.handleScroll(900);
			alert(" "+document.getScroll()[1]);
        
    }*/
	/*
	if(!$(window).hasScrollBar())
	{
		ifr.contentWindow.handleScroll(900);
		alert(" "+document.getScroll()[1]);
	} 
	else{*/
	//var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ); 
	//alert( ($(document).height() - $(window).height()) +"; " +(($(document).height() - $(window).height()) - $(document).scrollTop() )+ " " +document.getScroll()[1]);
	
	if(($(document).height() - $(window).height()) - $(document).scrollTop() <250){
		ifr.contentWindow.handleScroll(900);
		//alert(" "+document.getScroll()[1]);
	}
	else{
		ifr.contentWindow.handleScroll(document.getScroll()[1]);
	}

}