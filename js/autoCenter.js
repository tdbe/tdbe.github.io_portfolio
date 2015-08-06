		
		var canvasState = "small";
		var cobo = false;
		var elementTool = document.getElementById("centerPanel");

		
		function doCenter(point){ //this function gets called on resize (by the debounce)
			
			var leftPanel = document.getElementById("leftPanel");
			var rightPanel = document.getElementById("rightPanel");
			var title = document.getElementById("title");
			var navigation = document.getElementById("navigation");
			
			//handle position cases for centerPanel
			var centerPanel = document.getElementById("centerPanel");
			var win =  window.size();
			//var canvas = document.getElementById('test');
			//var canvasP = document.getElementById('paint');
			
			//app.init(centerPanel,canvas);
			//setTimeout(function(){app.resize();}, 500);//also used in changeView()
			
			var pos = win.width * 0.02 + leftPanel.offsetWidth;
			var posR = win.width * 0.02 + rightPanel.offsetWidth;
			var width = win.width -pos -posR -17;
			var cleverStuff=0;
			
			if(cobo==false)
			if(width > 700)
			{
				cleverStuff = (width - 700) / 2;
				width = 700;
			}

			centerPanel.style.left = cleverStuff + pos + "px";
			var minW = 400;
			if(cobo == true){
				var coboH = win.height - centerPanel.offsetTop - 17 - 17;
				if(coboH > 328)
					centerPanel.style.height = coboH + "px";
				else
					centerPanel.style.height = "auto";//328 + "px";
				minW = 500;
			}
			
			if(window.pageYOffset == 0)
			{
				if(102 > point.y * 0.40)
					centerPanel.style.top = 102 + "px";
				else
					centerPanel.style.top = point.y * 0.40 + "px";
			}
			
			if(canvasState == "large"){
				centerPanel.style.left = leftPanel.style.left;
				if(minW >= width)
					centerPanel.style.width = minW + leftPanel.offsetWidth + "px";
				else
				centerPanel.style.width = width + leftPanel.offsetWidth + "px";
			}
			else	
			if(width >= minW){
				centerPanel.style.width = width + "px"; 
			}
			else centerPanel.style.width = minW+ "px";
			
			
			//handle positions for leftPanel and title
			leftPanel.style.left = cleverStuff + win.width * 0.02 + "px";
			leftPanel.style.top = point.y * 0.40 +20 + "px";
			title.style.left= cleverStuff + win.width * 0.02 + 64 + "px";
			var testTop = point.y * 0.10 + 20; //-132;
			if(12 > testTop) testTop = 12 + "px";
			title.style.top= testTop + "px";
			
			if(title.offsetLeft + title.offsetWidth > point.x)
			navigation.style.left = title.offsetLeft + title.offsetWidth + 40 + "px";
			else
			navigation.style.left = point.x + 40 + "px";
			
			//handle positions for rightPanel
			rightPanel.style.top = point.y * 0.40 +20 + "px";
			if(minW >= width) width = minW;//337;
				rightPanel.style.left = cleverStuff + pos + width + 1 + "px";
			
			//BG
			d = document.getElementById("dymanicBg");
			d.style.left = point.x-1000 + "px"; 
			
			var longerW = parseInt(rightPanel.style.left) + rightPanel.offsetWidth;
			var normalW = win.width - (point.x-1000) -17;
			if(longerW + 38 > win.width) 
				d.style.width = normalW + longerW - win.width + 0.02 * win.width + 17 + "px";
			else
			d.style.width = normalW + "px";//"2000px"; 
			
			var divH = centerPanel.offsetHeight + centerPanel.offsetTop; 
			var divHC = win.height - centerPanel.offsetTop + 200;
			if(cobo == true && divHC > win.height){
				d.style.height = divHC + 100 + "px";
			}
			else if( divH+200 > win.height){
				//d.style.height = centerPanel.offsetHeight + 360 + "px";
				d.style.height = divH + 240 + "px";
			}
			else /*if( win.height >= divH)*/{
				d.style.height = win.height + "px";//"964px";
			}

		}
		
		function setContentHeight(centerPanel){
			if(cobo == false){
				var content = document.getElementById("content");
				if(centerPanel.offsetHeight > content.offsetHeight){
					if(328 > content.offsetHeight)
						centerPanel.style.height = "auto";//328 + "px";
					else centerPanel.style.height = content.offsetHeight + "px";
				}
				else centerPanel.style.height = content.offsetHeight + "px";
			}
		}
		
		function painterStyle(){
			if(cobo == false){
				cobo=true;
				var leftPanel = document.getElementById("leftPanel");
				var centerPanel = document.getElementById("centerPanel");
				var rightPanel = document.getElementById("rightPanel");
				var shadRight = document.getElementById("shadRight");
				var ribbons = document.getElementById("ribbons");
				ribbons.style.visibility = "hidden";
				var toolbox = document.getElementById("toolbox");
				toolbox.style.visibility = "visible";
				
				//var notes = document.getElementById("leftNotes");
				//notes.style.visibility = "hidden";
				//notes.style.left = rightPanel.offsetLeft -100 + "px";
				
				leftPanel.style.width = 240 + "px";
				leftPanel.style.height = 320 + "px";

				rightPanel.style.width = 240 + "px";
				//var t4 = new Tween(rightPanel.style, 'width', Tween.elasticEaseOut, 116, 240, 1, 'px'); 
				//t4.start();
				rightPanel.style.height = 320 + "px";

				rightPanel.style.background = 'url("images/fadeMaskR.png") repeat-y';
				rightPanel.style.WebkitBoxShadow = '0px 2px 2px #4c4c4c';
				rightPanel.style.MozBoxShadow = '0px 2px 2px #4c4c4c';
				rightPanel.style.boxShadow = '0px 2px 2px #4c4c4c';
				
				shadRight.style.visibility = "visible"; 
				
				setTimeout("doCenter(window.center({width:1,height:1}))", 500);
				//fadeIn("rightPanel");
				
			}
			else setTimeout("doCenter(window.center({width:1,height:1}))", 500);
		}
		
		function canvasEnlarge(centerPanel, leftPanel){
			centerPanel.style.left = leftPanel.style.left;
			centerPanel.style.width = leftPanel.offsetWidth + centerPanel.offsetWidth -3 + "px";
			centerPanel.style.zIndex = 1;
		}
		function canvasShrink(centerPanel, leftPanel){
			centerPanel.style.left = parseInt(leftPanel.style.left) + leftPanel.offsetWidth + "px";
			centerPanel.style.width = centerPanel.offsetWidth - leftPanel.offsetWidth -1 + "px";
			centerPanel.style.zIndex = 3;
		}
		
		function changeView(){
			var centerPanel = document.getElementById("centerPanel");
			//var canvas = document.getElementById('test');
			//var canvasP = document.getElementById('paint');
			var leftPanel = document.getElementById("leftPanel");
			var btn = document.getElementById("enlargeCanvas");
			var notes = document.getElementById("leftNotes");
			
			if(canvasState == "small"){
				btn.style.background = 'url("images/shrink2.png")';
				canvasState = "large";
				canvasEnlarge(centerPanel, leftPanel);
				//setTimeout(function(){app.resize();}, 500);
				notes.style.visibility = "hidden";
			}
			else if(canvasState == "large"){
				btn.style.background = 'url("images/enlarge2.png")';
				canvasState = "small";
				canvasShrink(centerPanel, leftPanel);
				//setTimeout(function(){app.resize();}, 500);
				notes.style.visibility = "visible";
			}
			
		}
		
		function normalStyle(){
			if(cobo==true){
				cobo = false;
				canvasState = "small";
				var centerPanel = document.getElementById("centerPanel");
				centerPanel.style.height = "auto";//328 + "px";
				var leftPanel = document.getElementById("leftPanel");
				var rightPanel = document.getElementById("rightPanel");
				var shadRight = document.getElementById("shadRight");
				var ribbons = document.getElementById("ribbons");
				//var notes = document.getElementById("leftNotes");
				//notes.style.visibility = "visible";
				//notes.style.left = "10%";
				ribbons.style.visibility = "visible";
				var toolbox = document.getElementById("toolbox");
				toolbox.style.visibility = "hidden";
				
				leftPanel.style.width = 320 + "px";
				leftPanel.style.height = 214 + "px";
			
				rightPanel.style.width = 120 + "px";
				rightPanel.style.background = "none";
				rightPanel.style.WebkitBoxShadow = "none";
				rightPanel.style.MozBoxShadow = "none";
				rightPanel.style.boxShadow = "none";
				
				shadRight.style.visibility = "hidden";
				
				centerPanel.style.minHeight = '328px';
				setTimeout("doCenter(window.center({width:1,height:1}))", 600);
			}
			else setTimeout("doCenter(window.center({width:1,height:1}))", 500);
		}
		
		function getElements(aray) {
			var elements = new Array();
			for (var i = 0; i < aray.length; i++) {
				var element = aray[i];
				if (typeof element == 'string')
					element = document.getElementById(element);
				if (aray.length == 1)
					return element;
				elements.push(element);
			}
			return elements;
		}

		function toggle(current) {
			var aray=new Array('select','eraser','picker','text','hand','brush','bucket','image');
			var el = getElements(aray);
			for(var i=0; i<el.length; i++)
			{
				if(el[i].id == current)
				{
					el[i].style.background = 'url("images/active.png")';
					elementTool = el[i];
					document.getElementById("test").style.cursor='url(images/cursor'+ current + '.cur),default';
					if(current == "brush" || current == "text" || current == "eraser")
						dC=true;
					else dC=false;
					
					if(current == "bucket"){
						//alert("Warning: This tool will fill and ERASE the canvas. \n\nTip: fill with 0% opacity makes canvas transparent.");
						document.getElementById("CLine").innerHTML=
						"<span style='position: relative; top: -4px; font-size: 16px;'>(Click here to dismiss this box.)</span> <span style='font-size: 26px; font-family: Arial;'>X </span>";	
						document.getElementById("probls").innerHTML=
						"<h3 style='font-size: 26px;'>Achtung:</h3><br/>" + 
						"<br/><p><img src='images/ideaRed.png' alt='#' style='position: relative; top: 2px;'/>The bucket tool will fill and ERASE the canvas.</p>" +
						"<br/><p><img src='images/idea.png' alt='#' style='position: relative; top: 2px;'/>Tip: fill with 0% opacity makes canvas transparent.</p>";
					}
					else doClose(true);
				}
				else el[i].style.background = "none";
			}
		}
		
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
		
		window.onresize = debounce(function (e) {
			flag = true;
			var point = window.center({width:1,height:1});
			doCenter(point);
		/* do something here, but only once after mouse cursor stops */
		}, 100, false);
		
		$(document).ready(function() 
		{
			//var txt = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
			//txt+= "<p>Browser Name: " + navigator.appName + "</p>";
			var txt = "<p>Browser Version: " + navigator.appVersion + "</p>";
			//txt+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
			//txt+= "<p>Platform: " + navigator.platform + "</p>";
			txt+= "<p>User-agent header: " + navigator.userAgent + "</p>";
			if( typeof(WebSocket) != "function" ) {
				txt+="noSock";
			}
			
			var webk ="";
			var sock ="";
			if(txt.indexOf("WebKit")==-1)
			{
				webk = "<p><img src='images/idea.png' alt='#' style='position: relative; top: 2px;'/>Your browser isn't a WebKit browser (<a href='http://chrome.google.com'>Google Chrome</a>, Safari). The application / some features <b>may</b> not work.</p>"
			}
			
			if(txt.indexOf("noSock")>-1)
			{
				sock = "<p><img src='images/ideaRed.png' alt='#' style='position: relative; top: 2px;'/>Your browser doesn't support WebSockets. Unfortunately, the application <u><b>will</b></u> not work. (at least not for now) Try <a href='http://chrome.google.com'>Google Chrome</a>.</p>"
			}
			
			if(webk != "" || sock != "")
			{
				document.getElementById("CLine").innerHTML=
					"<span style='position: relative; top: -4px; font-size: 16px;'>(Click here to dismiss this box.)</span> <span style='font-size: 26px; font-family: Arial;'>X </span>";	
				document.getElementById("probls").innerHTML=
					"<h3 style='font-size: 26px;'>Problem(s) detected:</h3><br/>" + webk +"<br/>"+ sock;
				//document.getElementById("CLine").onclick=doClose("noBrowser");
			}
		});
		
		function doClose(theID)
		{
			//document.getElementById(thisID).style.display= "none";
			document.getElementById("CLine").innerHTML=
						"";
						document.getElementById("probls").innerHTML=
						"";
		}