var $loader = $('.pre-loader');
var appMaster = {

    preLoader: function() {
        var imageSources = [];
        $('img').each(function() {
            var sources = $(this).attr('src');
            imageSources.push(sources);
        });
        if ($(imageSources).load()) {
            $loader.fadeOut('slow', function() {
                $loader.addClass('loaded');
            });
        }
    },

    showLoader: function() {
        $loader.fadeIn('slow');
    },

    hideLoader: function() {
        $loader.fadeOut('slow');
    },

    smoothScroll: function() {
        // Smooth Scrolling
        $('a[href*=#]:not([href=#carousel-example-generic])').click(function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    },

    reviewsCarousel: function() {
        // Reviews Carousel
        $('.review-filtering').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000
        });
    },

    screensCarousel: function() {
        // Screens Carousel
        $('.filtering').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });

        $('.js-filter-all').on('click', function() {
            $('.filtering').slickUnfilter();
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-one').on('click', function() {
            $('.filtering').slickFilter('.one');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-two').on('click', function() {
            $('.filtering').slickFilter('.two');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

        $('.js-filter-three').on('click', function() {
            $('.filtering').slickFilter('.three');
            $('.filter a').removeClass('active');
            $(this).addClass('active');
        });

    },

    animateScript: function() {
        $('.scrollpoint.sp-effect1').waypoint(function() {
            $(this).toggleClass('active');
            $(this).toggleClass('animated fadeInLeft');
        }, {
            offset: '100%'
        });
        $('.scrollpoint.sp-effect2').waypoint(function() {
            $(this).toggleClass('active');
            $(this).toggleClass('animated fadeInRight');
        }, {
            offset: '100%'
        });
        $('.scrollpoint.sp-effect3').waypoint(function() {
            $(this).toggleClass('active');
            $(this).toggleClass('animated fadeInDown');
        }, {
            offset: '100%'
        });
        $('.scrollpoint.sp-effect4').waypoint(function() {
            $(this).toggleClass('active');
            $(this).toggleClass('animated fadeIn');
        }, {
            offset: '100%'
        });
        $('.scrollpoint.sp-effect5').waypoint(function() {
            $(this).toggleClass('active');
            $(this).toggleClass('animated fadeInUp');
        }, {
            offset: '100%'
        });
    },

    scrollMenu: function() {
        var num = 50; //number of pixels before modifying styles

        $(window).bind('scroll', function() {
            if ($(window).scrollTop() > num) {
                $('nav').addClass('scrolled');

            } else {
                $('nav').removeClass('scrolled');
            }
        });
    },
    placeHold: function() {
        // run Placeholdem on all elements with placeholders
        Placeholdem(document.querySelectorAll('[placeholder]'));
    }

}; // AppMaster

$(document).ready(function() {

    appMaster.smoothScroll();

    appMaster.reviewsCarousel();

    appMaster.screensCarousel();

    appMaster.animateScript();

    appMaster.scrollMenu();

    //appMaster.placeHold();

    $('#contact-us').on('click', function() {
        $('#support').removeClass('hidden');
        this.click();
    });

    var $mailChimpForm = $('#mail-chimp-form');

    $mailChimpForm.find('.close').on('click', function() {
        $mailChimpForm.hide();
    });

    $('.subscribe-now').on('click', showForm);

    function showForm(event) {
        event && event.preventDefault();
        $mailChimpForm.show();
    }

    function linky(text) {
        var LINKY_URL_REGEXP =
                /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"”’]/,
            MAILTO_REGEXP = /^mailto:/;

        var match;
        var raw = text;
        var html = [];
        var url;
        var i;

        while ((match = raw.match(LINKY_URL_REGEXP))) {
            // We can not end in these as they are sometimes found at the end of the sentence
            url = match[0];
            // if we did not match ftp/http/www/mailto then assume mailto
            if (!match[2] && !match[4]) {
                url = (match[3] ? 'http://' : 'mailto:') + url;
            }
            i = match.index;
            addText(raw.substr(0, i));
            addLink(url, match[0].replace(MAILTO_REGEXP, ''));
            raw = raw.substring(i + match[0].length);
        }
        addText(raw);
        return html.join('');

        function addText(text) {
            if (!text) {
                return;
            }
            html.push(text);
        }

        function addLink(url, text) {
            html.push('<a ');
            html.push('target="',
                '_blank',
                '" ');
            html.push('href="',
                url.replace(/"/g, '&quot;'),
                '">');
            addText(text);
            html.push('</a>');
        }
    }
});
