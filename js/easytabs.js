
var lastTabIdClicked = ' ';
function resetHover(elem)
{

    var delay = 1200;
	//var elem = $(el.parentNode.parentNode);
	
	
	if(elem.hasClass("activeF") == false)
	{
		
		setTimeout(function() 
		{
			if(
			elem.hasClass("active") == true &&
			elem.hasClass("activeF") == false &&
			elem.attr('id') != lastTabIdClicked
			
			)
			{
				lastTabIdClicked = elem.attr('id');
				elem.removeClass("active");
				elem.addClass("activeF");
			}
		}, 
		delay);
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
				activeClass:'active',
				activeClass2:'activeF'
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
				
				//$(thisId+" .tabs li"+"L").removeClass(param.activeClass);//0
				//var compId = thisId+" .tabs li a[href=#"+tabId+"]";
				var compId = thisId+' .tabs li div a[href="#'+tabId+'"]';
				//var liId = thisId+" .tabs #"+tabId;
				var liId = "#"+$(compId).closest('li').attr('id');

				resetHover($(liId));
				
				//console.log($(liId).parent().attr('id'));
				

				if(
					//$(liId).attr('id') != lastTabIdClicked
					$(liId).hasClass(param.activeClass) == false &&
					$(liId).hasClass(param.activeClass2) == false 
				)
				{
					$(liId).parent().children().each(function()
					{

						$(this).removeClass(param.activeClass + " " +param.activeClass2);
					});
					
					
					$(compId).closest('li').addClass(param.activeClass);
					$(compId).closest('li').removeClass(param.activeClass2);
				}

				
				//$(thisId+" .tabs li a[href=#"+tabId+"L"+"]").closest('li').addClass(param.activeClass);//0
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
			}
			
			$(thisId+" .tabs li").click(function()
			{
				var tabId=$(this).find('a').attr('href').slice(1);
				changeContent(tabId, 0);
				return false;
			});
			
			/*
			$(window).load(function()
			{
				changeContent(window.location.hash.slice(1));
			});*/
			
		});
	}
})(jQuery);