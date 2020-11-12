$(document).ready(function () {
    centraTutto();
});

function centraTutto() {
    var toCenter = $('.row');
    var altezza = toCenter.height();
    var altezzaPagina = $(window).height();

    $(window).resize(function () {
        altezzaPagina = $(window).height();
    });

    toCenter = $('.row');
    if(altezza<altezzaPagina) {
        toCenter.css('margin-top', 'calc(' + altezzaPagina / 2 + 'px - ' + altezza / 2 + 'px)');
    } else {
        toCenter.css('margin-top', '100px');
    }
}