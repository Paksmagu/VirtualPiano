// JavaScript Document

/*  BOOTSTRAP BUTTON FIX*/
var btn = $.fn.button.noConflict();
$.fn.btn = btn;
/**/

/*(function ($) {
    $.fn.menuOnFly = function (options) {
        var opts = $.extend({}, $.fn.menuOnFly.defaults, options);
        var mi = $(this);
        $(this).children('li').hover(function () {
                thisLink = $(this).find('a');
                thisItem = $(this);
                thisLink.addClass(opts.selectedClass);
                thisLink.next(opts.affect).slideDown({
                    duration: opts.speed, queue: false, complete: function () {
                        thisLink.next(opts.affect).css('overflow', 'visible');
                    }
                });
            }
            , function () {
                thisLink = $(this).find('a');
                thisItem = $(this);
                thisLink.next(opts.affect).css('overflow', 'hidden');
                mi.find('li a.' + opts.selectedClass).removeClass(opts.selectedClass + ' open');
                mi.find('li.' + opts.selectedClass).removeClass(opts.selectedClass + ' open');
                thisLink.removeClass('hover');
                //thisLink.addClass(opts.selectedClass);
                thisLink.next(opts.affect).stop().slideUp({duration: opts.speed, queue: false});
            }
        );
    }
    $.fn.menuOnFly.defaults = {
        animation: '',
        speed: 300,
        type: 'accordion',
        affect: 'ul',
        selectedClass: 'selected',
        hoverClass: 'hover'
    };
})(jQuery);*/

/*$('#sndMenuContainer li').hover(function(){
 $('#sndMenuContainer .sub2Menu_h li.selected').parent('li').hide();
 $('#sndMenuContainer .selected').removeClass('selected');
 $(this).addClass('hover');
 $(this).children('.sub2Menu_h').show();
 },function(){
 $(this).removeClass('hover');
 $(this).children('.sub2Menu_h').hide();
 });*/
/*
$("#mainMenu").menuOnFly({affect: "div", animation: "slide", selectedClass: "open", hoverClass: "hover"});
$(".subMenu").menuOnFly({affect: "ul", animation: "slide", selectedClass: "open", hoverClass: "hover"});
*/
//
/*var menuInter;
 $("#mainMenu").hover(function(){
 clearInterval(menuInter);
 },function(){
 menuInter = setInterval(function(){$("#mainMenu .subMenuCont").filter(":visible").slideUp('fast');clearInterval(menuInter);},500);
 });*/


// initialize with defaults bootstrapi puuduvad upload nupu jaoks
// kuigi võibolla liiga keeruline lahendus
//$("#field_719").fileinput({'browseClass' : 'btn btn-default'});


//layout2twbs();

//$('.content_b .subMenu').addClass('nav nav-pills nav-stacked');
$('.content_b .nav .selected').addClass('active');

//$('#mainMenu').addClass('nav nav-pills');
$('#mainMenu .selected').addClass('active');

$('.eqH').equalHeights();


$('pre').addClass('prettyprint');
//prettyPrint();

//teeb tabeli responsiviks
$('.contentBox table').wrap('<div class="tableWrap"></div>');

//Responsive piltide jõuga paikapanemine mobiilides http://test.greaton.ee/labor/moodulid/css/moblavaates-artiklikte-sees-olevate-piltide-kujundus/
$('.modArticle img').wrap('<span class="imgWrap"></span>');


/*
 var owlParm = $("#owl-images");
 var nav = ($(owlParm).attr('data-nav') == '1' ? true : false);
 var interval = ($(owlParm).attr('data-interval') ? $(owlParm).attr('data-interval') : '1000');

 //console.log(nav);

 var owl = $("#owl-images").data('owlCarousel');



 $("#owl-images").owlCarousel({
 singleItem: true,
 stopOnHover: true,
 pagination: nav,
 navigation: true,
 paginationNumbers: true,
 resposnive: true,
 touchDrag: true,
 autoPlay: interval,
 transitionStyle: "fade",
 navigationText: false,
 afterInit: function () {
 // Custom Navigation Events

 }
 });



 $(".owlPrev").click(function(){
 $("#owl-images").trigger('owl.prev');
 });

 $(".owlNext").click(function(){
 $("#owl-images").trigger('owl.next');
 });

 var itemCount = $(owlParm).attr('data-items');
 console.log(itemCount);

 var owl = $("#owl-images").data('owlCarousel');



 if(itemCount == 1) {
 $("#owl-images").data('owlCarousel').stop();
 }
 */
