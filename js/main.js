


        function loadScript(src, callback) {
            'use strict';
            var s,
                r,
                t;
            r = false;
            s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = src;
            s.onload = s.onreadystatechange = function () {
                ////console.log( this.readyState ); //uncomment this line to see which ready states are called.
                if (!r && (!this.readyState || this.readyState == 'complete')) {
                    r = true;
                    callback();
                }
            };
            t = document.getElementsByTagName('script')[0];
            t.parentNode.insertBefore(s, t);
        }

        function initialize_map() {
            'use strict';

            loadScript('js/infobox.js', after_load);
        }
        function after_load() {
            'use strict';
            initialize_new();
        }





//**************************************** Parallax script ****************************************** //



function parallax() {
    'use strict';
    var $window = $(window);
    $('.b-parallax[data-type="background"]').each(function(){
        var $bgobj = $(this);
        $(window).scroll(function() {
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));
            var coords = '50% '+ yPos +'px';
            $bgobj.css({ backgroundPosition: coords });
        });
    });
}

//**************************************** lazyLoadImages ****************************************** //

function lazyLoadImages() {
    'use strict';
    var images = document.querySelectorAll(".lazy[data-src]"), item;
    // load images that have entered the viewport

    [].forEach.call(images, function (item) {
        if (item.getBoundingClientRect().top > 0) { //alert(1);

            //$(this).
            var image = item.getAttribute("data-src"),
                img = jQuery('<img />');
            img.bind('load', function () {
                jQuery(item).find(".b-placeholder").addClass('b-placeholder--fadeout');
            });
            img.attr('src', image);
            jQuery(item).css("background-image", "url(" + image + ")")

            item.removeAttribute("data-src");
        }
    })
    // if all the images are loaded, stop calling the handler
    if (images.length == 0) {
        window.removeEventListener("DOMContentLoaded", lazyLoadImages);
        window.removeEventListener("load", lazyLoadImages);
        window.removeEventListener("resize", lazyLoadImages);
        window.removeEventListener("scroll", lazyLoadImages);
    }
}


//****************************** Tooltip plugin activate ******************************//
function tooltip() {
    'use strict';
    jQuery('[data-toggle="tooltip"]').tooltip()
}

//****************************** Button up ******************************//
function buttonUp() {
    'use strict';
    var inputVal = $('.searchbox-input').val();
    inputVal = jQuery.trim(inputVal).length;
    if (inputVal !== 0) {
        jQuery('.searchbox-icon').css('display', 'none');
    } else {
        jQuery('.searchbox-input').val('');
        jQuery('.searchbox-icon').css('display', 'block');
    }
}

//****************************** Lazy load ******************************//
window.addEventListener("DOMContentLoaded", lazyLoadImages);
window.addEventListener("load", lazyLoadImages);
window.addEventListener("resize", lazyLoadImages);
window.addEventListener("scroll", lazyLoadImages);


(function ($) {
    $(document).ready(function () {
        'use strict';

        jQuery(document).one('mousemove', 'body', function(){
            $('.home').prepend('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAI_iMtLfLxggW38M7mrcv2-Fq2NKf8ab4"></script><script scr="js/custom.js"></script>');
        });
	/*
        $('.jquery_popup').popup({
            content: $('.b-jquery-popup')
        });
	*/
        $('html').removeClass('no-js');

        /*ajax subscribe*/
        jQuery(document).on("click", '.b-gadget__subscribe__button', function (e) {
            e.preventDefault();
            var email = jQuery(".b-gadget__subscribe__field");
            email.removeClass('error');
            var thisbtn = jQuery(this);


            if (isValidEmailAddress(email.val())) {
                thisbtn.prop('disabled', true);

                jQuery.ajax({
                    url: nightcity_obj.ajaxurl,
                    type: 'POST',
                    data: "action=nightcity_mailchimp_send&email=" + email.val(),
                    success: function (date) {
                        jQuery('#subscribe_mini_form').append("<div class=\"alert alert-success fade in\">" +
                            "<button class=\"close\" data-dismiss=\"alert\" type=\"button\">&times;</button><strong>" +
                            "" + date + "" +
                            "</strong></div>");
                        jQuery('#subscribe_mini_form')[0].reset();
                        thisbtn.prop('disabled', false);
                    }

                });
            } else {
                email.addClass('error');

            }
        });
    
        //****************************** Ion range slider plugin activate ******************************//


        //****************************** Script for animate.css ******************************//
        $.fn.extend({
            animateCss: function (animationName) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                $(this).addClass('animated ' + animationName).one(animationEnd, function () {
                    $(this).removeClass('animated ' + animationName);
                });
            }
        });


        //****************************** Simple popup plugin activate ******************************//


        if ($("div").is(".b-map-menu")) {
            $(".b-footer").hide(0);
        } else {
            $(".b-footer").show(0);
        }


        //********************************************** Ajax script **************************************** //

        function ajax_init() {
		return true;
            // $('a:not(.noajax):not(.ab-item):not(.chosen-single)').unbind( "click" );
            $("a:not(.noajax):not(.ab-item):not(.chosen-single)").on('click', function(){
                    var $linkClicked = $(this).attr('href');
                    console.log($linkClicked);
                    //$("body").css('opacity',"0.5");
                    $('.b-preloader').show();
                    $.get($linkClicked, function (d) { 
                        var response = new Object();
                        response.html = $('<div>').html(d);
                        $("#content").html($(response.html).find('#content').html());
                        if ($("div").is(".b-map-menu")) {
                            $(".b-footer").hide(0);
                        } else {
                            $(".b-footer").show(0);
                        }
                        document.title = $(response.html).find('title').html();
                        window.history.pushState({
                            "html": $(response.html).find('html').html(),
                            "pageTitle": response.pageTitle
                        }, "", $linkClicked);
                        //lazyLoadImages();
                        ajax_init();
                        main_js();
                        // clearInterval(i);
                        //initialize_new();
                        window.scrollTo(0, 0);
                        $('.b-preloader').hide();
                        //$("body").css('opacity',"1");
                    });
                return false;
            });
        }
        
        ajax_init();

        var submitIcon = $('.searchbox-icon');
        var inputBox = $('.searchbox-input');
        var searchBox = $('.searchbox');
        var isOpen = false;

        jQuery(document).on("click",'.searchbox-icon', function (e) {
            if (isOpen == false) {
                searchBox.addClass('searchbox-open');
                inputBox.focus();
                isOpen = true;
            } else {
                searchBox.removeClass('searchbox-open');
                inputBox.focusout();
                isOpen = false;
            }
        });

        jQuery(document).on("mouseup", submitIcon , function () {
            return false;
        });

        jQuery(document).on("mouseup", searchBox , function () {
            return false;
        });

        jQuery(document).on("mouseup", searchBox , function () {
            return false;
        });

        if($(window).width() > 992) {
            $('.fadein').delay(2000).queue(function (next) {
                $(this).addClass('active');
                next();
            });
        }

        jQuery(document).on("click", '.b-nav-toggle' , function (e) {
            var bNav = $('.b-nav');
            var iconToggle = $(this).find('.fa');
            if ($(this).hasClass('closed')) {
                bNav.slideDown('fast');
                $(this).removeClass('closed').addClass('opened');
                iconToggle.removeClass('fa-chevron-down').addClass('fa-chevron-up');
            } else if ($(this).hasClass('opened')) {
                bNav.slideUp('fast');
                $(this).removeClass('opened').addClass('closed');
                iconToggle.removeClass('fa-chevron-up').addClass('fa-chevron-down');
            }
        })

        $('.b-nav>ul>li.menu-item-has-children>a').append('<i class="fa fa-angle-down"></i>');

        jQuery(document).on('click', '.b-view-btn__grid' , function (e) { 
            $('.b-place-list--list').removeClass('opened').addClass('closed');
            $('.b-place-list--grid').removeClass('closed').addClass('opened');
            $(window).trigger('resize');
        });

        jQuery(document).on('click', '.b-view-btn__list' , function (e) { 
            $('.b-place-list--grid').removeClass('opened').addClass('closed');
            $('.b-place-list--list').removeClass('closed').addClass('opened');
            $(window).trigger('resize');
        });

        main_js(jQuery);

    });
})(jQuery);


