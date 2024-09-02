//window.size();





var maxWidth = 1300;//1064;//1024;//920;
var maxWidth2 = 1300;//1064;//920;



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


//window.onload = scaleGallery();
/*
window.onresize = debounce(function (e) {
	flag = true;
	//var point = window.center({width:1,height:1});
	//doCenter(point);
	scaleGallery();
	
	
// do something here, but only once after mouse cursor stops 
}, 50, false);
 */

// http://javascript.info/tutorial/onload-ondomcontentloaded 

function load2(){ 
	//alert("123");
	window.parent.onDomContentLoad();
	window.parent.stopLoadInterval();
	
}

//bindReady();
 function bindReady(){//handler){

	
	//$(window).load(load2);
	window.onload = function(e){
		onLoaded();
		load2();
	};

	var called = false

	function ready() { 
		if (called) return;
		called = true;
		//handler()
	
		//window.parent.onDomContentLoad()
		load2();
	}

	//obj.contentWindow.document
	if ( document.addEventListener ) { // native event
		document.addEventListener( "DOMContentLoaded", ready, false )
	} else if ( document.attachEvent ) {  // IE

		try {
			var isFrame = window.frameElement != null
		} catch(e) {}

		// IE, the document is not inside a frame
		if ( document.documentElement.doScroll && !isFrame ) {
			function tryScroll(){
				if (called) return
				try {
					document.documentElement.doScroll("left")
					ready()
				} catch(e) {
					setTimeout(tryScroll, 10)
				}
			}
			tryScroll()
		}

		// IE, the document is inside a frame
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				ready()
			}
		})
	}

	// Old browsers
    if (window.addEventListener)
        window.addEventListener('load', ready, false)
    else if (window.attachEvent)
        window.attachEvent('onload', ready)
    else {
		var fn = window.onload // very old browser, copy old onload
		window.onload = function() { // replace by new onload and call the old one
			fn && fn()
			ready()
		}
    }
}

const lerp = (a, b, amount) => (1 - amount) * a + amount * b;

setInterval(scaleGallery(), 1000);
function scaleGallery(){
	//max-width: 880px; ---> 1em
	//min-width: 604px; ---> 0.68636363
	//TODO: fetch these values from CSS on Start()
	
	
	//var w_size = window.size();
	
	//var w = document.getElementById("centerPanel");
	var w = window.parent.document.getElementById("centerPanel");
	//offsetWidth includes border width, clientWidth does not
	
	var d = document.getElementById("content-to-scale");
	//alert(w.offsetWidth);
	if(d != null){
		var lerpsub = 80 * Math.pow(Math.min(Math.max(0,(w.offsetWidth)/maxWidth),1),8);
		if(w.offsetWidth < maxWidth){//883//880
			var val  = (w.offsetWidth/maxWidth2); 

			//d.style.fontSize = val.toFixed(2)+ "em"; 
			var num = val.toFixed(2);
			var snap = " translate(-"+lerpsub+"px, 0px)";
			//if(w.offsetWidth < maxWidth-110) snap = " translate(-30px, 0px)";

			var val = "scale("+ num+","+ (1-(1-num)/2)+")"+snap;
			d.style.webkitTransform = val;
			d.style.MozTransform = val;
			d.style.msTransform = val;
			d.style.OTransform = val;
			d.style.transform = val;
			//d.style.fontSize = "0.1em";

			//console.log("tick "+val.toFixed(2));
		}
		else{
			//d.style.fontSize = "1em"; 
			var val = "scale("+ 1 +","+ 1 +") translate(-"+lerpsub+"px, 0px)";
			d.style.webkitTransform = val;
			d.style.MozTransform = val;
			d.style.msTransform = val;
			d.style.OTransform = val;
			d.style.transform = val;
			//console.log("tick 1em");
		}
	}
	//alert("Wa: "+w_size.width/800 );
}



//gridItemActive, onclick="makeActive(this)"
function makeActive(elem){
	//elem.className += " gridItemActive";
	elem.className = "gridItemActive";
	
	//newlink.setAttribute('class', 'signature');
	
	/*elem.style.pointerEvents = "none";*/
	//alert("elem: "+elem.className);
	
	setTimeout(function()
						{
							window.location.href = elem.getAttribute("alt");
						}, 320);
}

//$(document).ready(function(){ 
//window.onload =
function onLoaded(){

	//window.parent.swapB();
	$('#toptitleBg').remove();

	scaleGallery();

	function downFunction(event, target) {
		switch (event.which) {
			case 1:
				
				target.removeAttr("href");
				//alert('Left Mouse button pressed.');
				break;
			case 2:
				target.attr('href', target.attr('alt'));
				//alert('Middle Mouse button pressed.');
				break;
			case 3:
				//$(event.target).attr('href', $(event.target).attr("alt"));
				target.attr('href', target.attr('alt'));

				//alert('Right Mouse button pressed.');
				break;
			default:
				//alert('You have a strange Mouse!');
		}
		/*
		for(var key in event) {
			console.log('key: ' + key + '\n' + 'value: ' + event[key]);
		}*/
	}
	
	//if(jQuery.browser.mobile == true)
	function upFunction(event, target) {
		switch (event.which) {
			case 1:
				target.attr('class', "gridItemActive");
				var where = target.attr('alt');
				setTimeout(function() 
									{
										target.attr('class', "gridItem");
										window.parent.location.href = where;
									}, 320);
				break;
			case 2:
				//alert('Middle Mouse button pressed.');
				break;
			case 3:
				//alert('Right Mouse button pressed.');
				break;
			default:
				//alert('You have a strange Mouse!');
		}
	}
	
	$('.gridItem').mousedown(function(event){
	  downFunction(event, $(this));
	});
	$('.gridItem').on('touchstart', function(event){
	  downFunction(event, $(this));
	});
	
	$('.gridItem').mouseup(function(event){
	  upFunction(event, $(this));
	});
	$('.gridItem').on('touchend', function(event){
	  upFunction(event, $(this));
	});
	
	
};
//);
/*
var mousewheelevt;
function makeWheelEvent(){
	//window.onscroll = scrollTest; 
}

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38' || e.keyCode == '40') {
        // up arrow   // down arrow
		scrollTest(e); 
    }
}


function scrollTest(e){

	handleScroll(window.parent.document.getScroll()[1]);

}
*/