
(function($){
	//var col0 = "rgba(255,255,255,0)";
	//var col1 = "rgba(255,255,255,.66)";//.66
	//$('#centerPanel').css('background-color', col0);
	$.fn.easyTabs=function(option){
									var param=jQuery.extend({fadeSpeed:"fast",defaultContent:1,activeClass:'active'},option);
									$(this).each(function(){
															var thisId="#"+this.id;
															if(param.defaultContent==''){param.defaultContent=1;}
															if(typeof param.defaultContent=="number"){
																var defaultTab=$(thisId+" .tabs li:eq("+(param.defaultContent-1)+") a").attr('href').substr(1);
															}
															else{var defaultTab=param.defaultContent;}
																
															$(thisId+" .tabs li a").each(function(){
																										var tabToHide=$(this).attr('href').substr(1);
																										$("#"+tabToHide).addClass('easytabs-tab-content');
																										//$("#"+tabToHide+"L").addClass('easytabs-tab-content');//0
																									}
																						);
															hideAll();
															changeContent(defaultTab);
															
															function hideAll(){
																				$('#centerPanel').addClass('centerPanelBG1');
																				$(thisId+" .easytabs-tab-content").hide();
																				//$(thisId+"L"+".easytabs-tab-content").hide();//0
																			}
																			
															function changeContent(tabId){
																
																hideAll();
																
																$(thisId+" .tabs li").removeClass(param.activeClass);
																//$(thisId+" .tabs li"+"L").removeClass(param.activeClass);//0
																$(thisId+" .tabs li a[href=#"+tabId+"]").closest('li').addClass(param.activeClass);
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
															$(thisId+" .tabs li").click(function(){
																									var tabId=$(this).find('a').attr('href').substr(1);
																									changeContent(tabId);
																									return false;
																								});
														});
								}
			})(jQuery);