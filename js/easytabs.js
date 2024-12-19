
var lastTabIdClicked = ' ';
function resetHover(elem)
{
	var delayF = 1200;
	var delayFMid = 400;
	//var elem = $(el.parentNode.parentNode);

	if(elem.hasClass("activeFMid") == false)
	{
		setTimeout(function() 
		{
			if(
				elem.hasClass("activeFMid") == false &&
				elem.attr('id') != lastTabIdClicked
				)
			{
				lastTabIdClicked = elem.attr('id');
				elem.addClass("activeFMid");
			}
		}, 
		delayFMid);
	}	
	
	if(elem.hasClass("activeF") == false)
	{
		setTimeout(function() 
		{			
			if(
				elem.hasClass("active") == true &&
				elem.hasClass("activeF") == false 
				)
			{			
				//lastTabIdClicked = elem.attr('id');
				elem.removeClass("active");
				if(elem.hasClass("activeFMid") == true)
					elem.removeClass("activeFMid");
				if(elem.hasClass("activeFMidOut") == true)
					elem.removeClass("activeFMidOut");
				elem.addClass("activeF");
				
			}
		}, 
		delayF);
	}
	

}

(function($)
{
	//var col0 = "rgba(255,255,255,0)";
	//var col1 = "rgba(255,255,255,.66)";//.66
	//$('#centerPanel').css('background-color', col0);
	$.fn.easyTabs=function(option)
	{
		var param=jQuery.extend(
			{
				fadeSpeed:"fast",
				defaultContent:option.defaultContent,
				actClass_active:'active',
				actClass_activeF:'activeF',
				actClass_activeFMid:'activeFMid',
				actClass_activeFMidOut:'activeFMidOut'
			}
		);
		

		$(this).each(function()
		{

			var thisId="#"+this.id;
			var defaultTab;
			var flag = 3;
			if(param.defaultContent==''){param.defaultContent=1;}
			
			var thash = window.location.hash.slice(1).charAt(0).toUpperCase();

			if( thash != "" &&
				$("#"+thash).parent().attr('id') == "tabs"
			)
			{
				defaultTab = $("#"+thash).find('a').attr('href').slice(1);
			}
			else
			if(typeof param.defaultContent=="number")
			{
				if( thash == "")
				{
					flag = 1
				}
				else
				{
					flag = 2;
				}
				
				var jLink = $(thisId+" .tabs li:eq("+(param.defaultContent-1)+") a");
				defaultTab=jLink.attr('href').slice(1);

			}
			else
			{
				defaultTab=param.defaultContent;

			}
				
			$(thisId+" .tabs li a").each(function()
			{
				var tabToHide=$(this).attr('href').slice(1);

				if(tabToHide.length < 10)
				{
					$("#"+tabToHide).addClass('easytabs-tab-content');
					//$("#"+tabToHide+"L").addClass('easytabs-tab-content');//0
				}

			});
			
			
			
			hideAll();

			changeContent(defaultTab, flag);
			
			function hideAll()
			{
				$('#centerPanel').addClass('centerPanelBG1');
				$(thisId+" .easytabs-tab-content").hide();
				//$(thisId+"L"+".easytabs-tab-content").hide();//0
			}
							
			function changeContent(tabId, flag)
			{
				// flag==0 means from click
				// flag==1 means from initial document.ready() && from default tab number (ie no #tabId in url bar was set)
				// flag==2 means from initial document.ready() && from default tab number && the #tabId was invalid
				// flag==3 means from initial document.ready()
				
				if($("#" + tabId).length == 0) 
				{
				  return;
				}
				
				if(flag == 0 || flag == 3)
				{
					window.location.hash = tabId;
				}
				else
				if(flag == 2)
				{
					window.location.hash = "";
				}
				
				hideAll();
				
				//$(thisId+" .tabs li"+"L").removeClass(param.actClass_active);//0
				//var compId = thisId+" .tabs li a[href=#"+tabId+"]";
				var compId = thisId+' .tabs li div a[href="#'+tabId+'"]';
				//var liId = thisId+" .tabs #"+tabId;
				var liId = "#"+$(compId).closest('li').attr('id');
				
				$(liId).parent().children().each(function()
				{
					var $this = $(this);
					//alert($this.attr('id') + "; " + $this.attr('class'));
					
					if($this.hasClass(param.actClass_activeF) == true && 
						$this.hasClass(param.actClass_activeFMidOut) == false)
					{
						$this.addClass(param.actClass_activeFMidOut);
						setTimeout(function() 
						{
							$this.removeClass(param.actClass_activeFMidOut);
						}, 
						800);
					}
				});
				
				resetHover($(liId));
				
				//console.log($(liId).parent().attr('id'));
				

				if(
					//$(liId).attr('id') != lastTabIdClicked
					$(liId).hasClass(param.actClass_active) == false &&
					$(liId).hasClass(param.actClass_activeF) == false 
				)
				{
					$(liId).parent().children().each(function()
					{
						var $this = $(this);
						//$this.removeClass(param.actClass_active + " " +param.actClass_activeF);
						if($this.hasClass(param.actClass_activeF))
						{
							$this.removeClass(param.actClass_active);
							$this.removeClass(param.actClass_activeF);
							$this.removeClass(param.actClass_activeFMid);
							
						}
						else
						{
							$this.removeClass(param.actClass_active);
							$this.removeClass(param.actClass_activeF);
							$this.removeClass(param.actClass_activeFMid);
							$this.removeClass(param.actClass_activeFMidOut);
						}
					});
					
					var $compId = $(compId);
					$compId.closest('li').addClass(param.actClass_active);
					$compId.closest('li').removeClass(param.actClass_activeF);
					$compId.closest('li').removeClass(param.actClass_activeFMid);
					$compId.closest('li').removeClass(param.actClass_activeFMidOut);
				}
				
				//$(thisId+" .tabs li a[href=#"+tabId+"L"+"]").closest('li').addClass(param.actClass_active);//0
				if(param.fadeSpeed!="none")
				{
					//$('#centerPanel').toggleClass('centerPanelBG1');
					$(thisId+" #"+tabId).fadeIn(param.fadeSpeed, function(){$('#centerPanel').removeClass('centerPanelBG1');});
					/*$(thisId+" #"+tabId+"L").fadeIn(param.fadeSpeed);//0*/
				}
				else{
					
					$(thisId+" #"+tabId).show();
					//$(thisId+" #"+tabId+"L").show();//0
					}
					
				//window.scrollTo(x-coord, y-coord);	
				$(window).scrollTop(0);
			}
	
			$(thisId+" .tabs li").click(function()
			{
				
				var tabId=$(this).find('a').attr('href').slice(1);
				var project = getUrlParameter("project");
				if(project && project.length > 0 
					&& tabId == 'projects'
					//&& window.location.hash == "#projects"
					&& ($(this).hasClass("activeF") == true || $(this).hasClass("active") == true )
					)
				{
					window.location.href = "./";
				}
				else
				{
					changeContent(tabId, 0);
				}
				return false;
			});
			
			/*
			$(window).load(function()
			{
				changeContent(window.location.hash.slice(1));
			});*/
			
			setTimeout(resizeGallery, timeoot);  
			resizeInterval = setInterval(function(){resizeIframe()}, 1250);
		});
	}
})(jQuery);

