//window.size();

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

function onDomContentLoad(){

	//alert("onDomContentLoaded"); 
	ifr = document.getElementById("icontent");
	ifr.contentWindow.scaleGallery();
	setTimeout(resizeIframe2, timeoot);  
	myVar = setInterval(function(){resizeIframe2()}, 1250);
	//resizeIframe(ifr);
	
	//swap();  //not here
}


//window.onload = 
function onMainLoaded(){ 
	

	//var ifr = document.getElementById("icontent");
	var project = getUrlParameter("project");
	
	var ifr = "<iframe src='./"; 
	var a = ""; 
	//onload='resizeIframe(this); swap();'
	var me = "'  id='icontent' scrolling='no'  frameborder='0' allowTransparency='true' seamless></iframe>"; 
	
	
	
	//$("#icontent").css("overflow", "visible");
	
	switch (project) {//wanted to do something else here..
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
			return;/*
			a="project/"+project+"/index.html"; 
			window.location.href = "./"+a; */
			break;
		default:
			a="default.html";  
			var intro = $('.introTextPreview');
			$(intro).css("visibility", "visible");
			$(intro).css("position", "relative");
			//alert('default');
	}

	$("#projects").append(ifr+a+me); 
	swap();
	resizeIframe2();
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

var extraHeight = 80;//1.005;
function resizeIframe(obj){
    //obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
	obj.style.height = obj.contentWindow.window.size.h + 'px';
	//var w = window.parent.document.getElementById("centerPanel");
	var w = document.getElementById("centerPanel");
	obj.style.width = w.style.width + "px";  
}


function resizeIframe2() {
	var obj = document.getElementById("icontent");
	//obj.contentWindow.document.getElementById('projContainer').scrollHeight
    obj.style.height = $("#icontent").contents().find('body').find("div").height() + extraHeight + 'px';
		//obj.style.height = obj.contentWindow.window.size.h + 'px'; 
		//var w = window.parent.document.getElementById("centerPanel");
	var cp = document.getElementById("centerPanel");
	//var w = document.getElementById("zen");
	//obj.style.width = w.style.width + "px";
	obj.style.width = $(window).width()+1 + "px"; 
	
	
	//$(cp).position().left
	obj.style.marginLeft = -$(cp).offset().left+ "px"; 
	//alert(obj.style.marginLeft);
		//alert();
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