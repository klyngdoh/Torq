
var body = $('body');
var hover = $('.thumbnail');
var navigation = $('.navigation');


// Slide in/out with fade animation function
jQuery.fn.slideFadeToggle = function (speed, easing, callback) {
    return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};
//
jQuery.fn.slideFadeIn = function (speed, easing, callback) {
    return this.animate({opacity: 'show', height: 'show'}, speed, easing, callback);
};
jQuery.fn.slideFadeOut = function (speed, easing, callback) {
    return this.animate({opacity: 'hide', height: 'hide'}, speed, easing, callback);
};

jQuery(document).ready(function () {
    // Prevent empty links
    // ---------------------------------------------------------------------------------------
    $('a[href=#]').on('click', function (event) {
        event.preventDefault();
    });
    // Sticky header/menu
    // ---------------------------------------------------------------------------------------
    if ($().sticky) {
        $('.header.fixed').sticky({topSpacing: 0});

    }


    $('ul.sf-menu a').on('click', function () {
        body.scrollspy('refresh');
    });

    // Fixed menu toggle
    $('.menu-toggle').on('click', function () {
        if (navigation.hasClass('opened')) {
            navigation.removeClass('opened').addClass('closed');
        } else {
            navigation.removeClass('closed').addClass('opened');
        }
    });
    $('.menu-toggle-close').on('click', function () {
        if (navigation.hasClass('opened')) {
            navigation.removeClass('opened').addClass('closed');
        } else {
            navigation.removeClass('closed').addClass('opened');
        }
    });
    //
    if ($('.content-area.scroll').length) {
        $('.open-close-area').on('click', function () {
            if ($('.wrapper').hasClass('opened')) {
                $('.wrapper').removeClass('opened').addClass('closed');
            } else {
                $('.wrapper').removeClass('closed').addClass('opened');
            }
        });
    }
    // Smooth scrolling
    // ----------------------------------------------------------------------------------------
    $('.sf-menu a, .scroll-to').on('click', function () {

        $('.sf-menu a').removeClass('active');
        $(this).addClass('active');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 43
        }, {
            duration: 1200,
            easing: 'easeInOutExpo'
        });
        return false;
    });




    updater();
});

jQuery(window).load(function () {
    // Preloader
    $('#status').fadeOut();
    $('#preloader').delay(200).fadeOut(200);

    updater();
});

function updater() {
    if ($().sticky) {
        $('.header.fixed').sticky('update');
    }


    $('.datepicker').datetimepicker();
}

jQuery(window).resize(function () {
    updater();
});

jQuery(window).scroll(function () {
    if ($().sticky) {
        $('.header.fixed').sticky('update');
    }
});