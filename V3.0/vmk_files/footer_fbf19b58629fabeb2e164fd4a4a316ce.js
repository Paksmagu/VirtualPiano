$('a:not([class])').each(function(){if($(this).attr('href')){$(this).filter(function(){return $(this).attr('href').match(/\.(jpg|jpeg|png|gif)/i)}).addClass('zoom')}});$('a.zoom').each(function(){$(this).fancybox({'zoomOpacity':!0,'titlePosition':'inside','zoomSpeedIn':500,'zoomSpeedOut':500,'hideOnContentClick':!0,'transitionIn':'elastic','transitionOut':'elastic'})});$('a[href*="youtube.com/watch"],a[href*="youtu.be/"],a[href*="vimeo.com/"]').each(function(){t=$(this);if(!t.prop('class')||t.hasClass('video')||t.hasClass('youtubeLink')){t.attr('href',convertVideo(t.attr('href'))).fancybox({'type':'iframe','zoomOpacity':!0,'titlePosition':'inside','zoomSpeedIn':500,'zoomSpeedOut':500,'hideOnContentClick':!0,'transitionIn':'elastic','transitionOut':'elastic',"titlePosition":"inside","scrolling":"no","overlayOpacity":0.6,'orig':this,'title':this.title})}});$("#mobileMenuIcon").click(function(event){event.preventDefault();$("#mobileMenuIcon, header .mainMenuContainer, #mainMenu").toggleClass('show');if($("#mainMenu").hasClass('slideInRight')){$("#mainMenu").toggleClass('slideOutRight slideInRight')}else{$("#mainMenu").addClass('animated slideInRight').removeClass('slideOutRight')}});$(".mainMenuContainer li").each(function(){var element=$(this);if(element.find('ul').eq(0).length){element.addClass('dropDown')}});$("header ").on('click','.mainMenuContainer li.dropDown > a',function(){if($(window).width()<0){if($(this).parent('li').hasClass('show')){$(this).parent('li').removeClass('show')}else{$(this).parents('ul:eq(0)').find('li.show').removeClass('show');$(this).parent().addClass('show')}
return!1}});if($(window).width()<980){$(".subMenuCont").prev().after("<span class='arrow--icon'></span>");$(".arrow--icon").click(function(){$(this).next().toggleClass("show-me")})}
$(window).resize(function(){if($(window).width()>980){$("header .show").removeClass('show');$('#mainMenu').removeClass('animated slideInRight slideOutRight')}
if(resizeInProgress){clearTimeout(resizeInProgress)}
resizeInProgress=setTimeout(function(){resizeInProgress=!1;menuController()},100)});menuController();var resizeInProgress=!1;function menuController(){var ww=$(window).width();$('#mainMenu>.dropDown').each(function(){var subMenu=$(this).find('.subMenu');var position=subMenu.offset();var parentPos=subMenu.parent().parent().offset();if(subMenu.width()+position.left>ww){subMenu.parent().addClass('switchLeft')}else if(subMenu.parent().hasClass('switchLeft')){if(parentPos.left+subMenu.width()<ww){subMenu.parent().removeClass('switchLeft')}}
console.log('ParentPos.left: '+parentPos.left);console.log('subMenu.left: '+position.left);var sub2Menu=subMenu.find('.sub2Menu');if(sub2Menu.length){position=sub2Menu.offset();if(sub2Menu.width()+position.left>ww){sub2Menu.addClass('switchLeft')}else if(sub2Menu.hasClass('switchLeft')){var position2=subMenu.offset();if(position2.left+subMenu.width()+sub2Menu.width()<ww){sub2Menu.removeClass('switchLeft')}}}})}