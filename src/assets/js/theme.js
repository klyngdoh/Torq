
var body = $('body');
var hover = $('.thumbnail');
var navigation = $('.navigation');
var mainSlider = $('#main-slider');
var imageCarousel = $('.img-carousel');
var partnersCarousel = $('#partners');
var owlCarouselSelector = $('.owl-carousel');
var priceSliderRange = $('#slider-range');
var carCarousel = $('.car-carousel');


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

  $('.link-checkbox').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var chk = $(this).parent().find('input:checkbox');
    chk.prop("checked", !chk.prop('checked'));
  });
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




    $('.car-categories ul.children').each(function () {
        if (!$(this).hasClass('active')) {
            $(this).hide();
        }
    });


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
    /*$('.sf-menu a, .scroll-to').on('click', function () {

        $('.sf-menu a').removeClass('active');
        $(this).addClass('active');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 43
        }, {
            duration: 1200,
            easing: 'easeInOutExpo'
        });
        return false;
    });*/




    updater();
});

jQuery(window).load(function () {
    // Preloader
    $('#status').fadeOut();
    $('#preloader').delay(200).fadeOut(200);

    updater();
});
var done = false;
function updater() {

  if ($().superfish && !done) {
    done = true;
    $('ul.sf-menu').superfish();
  }
    if ($().sticky) {
        $('.header.fixed').sticky('update');
    }

    if($().datetimepicker) {
        $('.datepicker').datetimepicker();
        $('.datepick').datetimepicker({
            format: 'LL'
        });
    }

  if ($().selectpicker) {
    $('.selectpicker').selectpicker();
  }


}

jQuery(window).resize(function () {
    updater();
});

jQuery(window).scroll(function () {
    if ($().sticky) {
        $('.header.fixed').sticky('update');
    }
});

// Sliders
    // ---------------------------------------------------------------------------------------
    if ($().owlCarousel) {
        var owl = $('.owl-carousel');
        owl.on('changed.owl.carousel', function (e) {
            // update prettyPhoto
            if ($().prettyPhoto) {
                $("a[data-gal^='prettyPhoto']").prettyPhoto({
                    theme: 'dark_square'
                });
            }
        });
        // Main slider
        if (mainSlider.length) {
            mainSlider.owlCarousel({
                //items: 1,
                autoplay: false,
                autoplayHoverPause: true,
                loop: true,
                margin: 0,
                dots: true,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsiveRefreshRate: 100,
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        }

        // Car carousel
        if (carCarousel.length) {
            carCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 30,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsiveRefreshRate: 100,
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 2},
                    991: {items: 3},
                    1024: {items: 3}
                }
            });
        }
        // on tab click
        $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
            updater();
        });
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            updater();
        });
    }
 // sliders end -----------------------------

var autocomplete;
function init() {
  var input = document.getElementById('formSearchUpLocation');
   autocomplete = new google.maps.places.Autocomplete(input);
}


function getCheckedElements(name) {
  var elemName = 'input[name='+name+']:checked';
  return $(elemName).map(function(){
    return $(this).val();
  }).get();
}

function getSliderValues() {
  return $('#slider-range').slider("values");
}


function buildImgSlider() {
  if ($('.img-carousel').length) {
    var owl = $('.owl-carousel');
    owl.on('changed.owl.carousel', function (e) {
      // update prettyPhoto
      if ($().prettyPhoto) {
        $("a[data-gal^='prettyPhoto']").prettyPhoto({
          theme: 'dark_square'
        });
      }
    });
    $('.img-carousel').owlCarousel({
      autoplay: false,
      loop: true,
      margin: 0,
      dots: true,
      nav: true,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>"
      ],
      responsiveRefreshRate: 100,
      responsive: {
        0: {items: 1},
        479: {items: 1},
        768: {items: 1},
        991: {items: 1},
        1024: {items: 1}
      }
    });
  }
}

function buildFilterWidget() {
  $('.car-categories .arrow').on('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).parent().parent().find('ul.children').removeClass('active');
      $(this).parent().parent().find('.fa-angle-up').addClass('fa-angle-down').removeClass('fa-angle-up');
      if ($(this).parent().find('ul.children').is(":visible")) {
      }
      else {
        $(this).find('.fa-angle-down').addClass('fa-angle-up').removeClass('fa-angle-down');
        $(this).parent().find('ul.children').addClass('active');
      }
      $(this).parent().parent().find('ul.children').each(function () {
        if (!$(this).hasClass('active')) {
          $(this).slideFadeOut();
        }
        else {
          $(this).slideFadeIn();
        }
      });
    }
  );

  if ($.ui) {
    if ($('#slider-range').length) {
      $('#slider-range').slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function (event, ui) {
          $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
      });
      $("#amount").val(
        "$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1)
      );
    }
  }
}
