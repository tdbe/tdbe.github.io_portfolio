//window.size();





var maxWidth = 1064;//1024;//920;
var maxWidth2 = 1064;//920;



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

bindReady();
 function bindReady(){//handler){

	
	$(window).load(load2);
	
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
		if(w.offsetWidth < maxWidth){//883//880
			var val  = w.offsetWidth/maxWidth2; 

			d.style.fontSize = +val.toFixed(2)+ "em"; 
		}
		else{
			d.style.fontSize = "1em"; 
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
window.onload =
function onLoaded(){
	
	//window.parent.swapB(); 
	$('#toptitleBg').remove();
	
	scaleGallery();

	$('.gridItem').mousedown(function(event) {
	
		switch (event.which) {
			case 1:
				
				$(this).removeAttr("href");
				//alert('Left Mouse button pressed.');
				break;
			case 2:
				$(this).attr('href', $(this).attr('alt'));
				//alert('Middle Mouse button pressed.');
				break;
			case 3:
				//$(event.target).attr('href', $(event.target).attr("alt"));
				$(this).attr('href', $(this).attr('alt'));

				//alert('Right Mouse button pressed.');
				break;
			default:
				//alert('You have a strange Mouse!');
		}   
	});
	
		$('.gridItem').mouseup(function(event) {
	
		switch (event.which) {
			case 1:
				$(this).attr('class', "gridItemActive");
				var where = $(this).attr('alt');
				setTimeout(function() 
									{
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