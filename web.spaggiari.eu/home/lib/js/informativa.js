
$(document).ready(function () {

var logo = $('.logo');
var tooltips = $('.fp-tooltip');
var dist;

$(window).scroll(function () {
    dist = $(window).scrollTop();
    if (dist > 300) {
        logo.addClass('logoriduci')
    } else {
        logo.removeClass('logoriduci');
    }
});

    $('.scroll').click(function () {
        $.fn.fullpage.moveSectionDown();
    });

    var leggi = $('.leggi');
    // var fadone = $('.fadone');
    var fadebianco = $('.fadebianco'); 
    
    TweenLite.to(fadebianco, 1, {height: '0px', top: 0}); 
    
    
    leggi.on('click',function(e) {
        let fadone = $(e.target).closest(".box").find('.fadone');
        let fadebianco = $(e.target).closest(".box").find('.fadebianco');
        //e.preventDefault();
        var url = e.target.href;
        fadone.animate({width:'toggle'},1500);
        
        //TweenLite.to(fadebianco, .8, {bottom: 0, height: '100%', onComplete: function() {
            TweenLite.to(fadone, .8, {
                left: '0', width: '100%', onComplete: function () {
                    console.log('prima')
                    window.location = url;
                }
            });
        //}});
    });
});
