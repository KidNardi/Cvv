$(document).ready(function () {
    var nascosto = '.nascosto';

    // var leggi = $('.leggi');
    var torna = $(".torna");
    var info = $("#informativa");
    var fadoneInt = $('.fadoneInterno');
    TweenLite.to(fadoneInt,2, { left: "-100%", width: '0px' });

    torna.click(function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('safari') != -1) {
            if (ua.indexOf('chrome') > -1) {
                TweenLite.to(fadoneInt, 1.5, {
                    left: 0, width: '100%', onComplete: function () {
                        window.history.back();
                    }
                });
            } else {
                TweenLite.to(fadoneInt, 1.5, {
                    left: 0, width: '100%', onComplete: function () {
                        window.history.back();
                    }
                });
            }
        }else{
            window.location.href = $(this).attr('href');
        }
    });
});