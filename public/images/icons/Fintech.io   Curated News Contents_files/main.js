function disableButton(buttonSelector, forceEnable, forceDisable) {
    // forceEnable and forceDisable options allows one-way enabling of button on event
    var button = $(buttonSelector);
    if (button.length > 0) {
        var buttonStatus = button.prop('disabled');
        if (buttonStatus == true  && !forceDisable || forceEnable) {
            button.removeAttr('disabled');
        } else {
            button.attr('disabled', 'disabled');
        }
    }
}

function conditionalToggle(sourceSelector, targetSelector) {
    toggleCheck = $(sourceSelector).siblings(':checked').length;
    if (toggleCheck >= 1) {
        disableButton(targetSelector, true, false);
    } else if (toggleCheck == 0) {
        disableButton(targetSelector, false, true);
    } else {
        disableButton(targetSelector, false, false);
    }
}

// set default z-index for jQuery modals
// https://github.com/kylefox/jquery-modal#options
$.modal.defaults = {
    zIndex: 99,              // Overlay z-index.
}

$(document).ready(function(){
    // toggle switch logic
    $('[data-toggle="on"]').click(function(event) {
        // prevent default binding between labels and inputs, execute manually
        // to enable custom handling afterwards
        event.preventDefault();
        $("#" + $(this).attr('for')).prop('checked', true);
        $("#" + $(this).attr('for')).trigger('change');
        // remove active classes from other radio buttons
        $(this).siblings('label').removeClass('on');
        $(this).siblings('label').addClass('off');
        // remove active classes from other radio buttons in same group
        var id = $(this).attr("for");
        var name = $("#" + id).attr("name");
        $("[name=" + name + "]").each(function(index, elm){
            var that = $(this);
            var label = $("label[for=" + that.attr("id") + "]");
            label.removeClass('on').addClass('off');
        });
        $(this).toggleClass('on off');




        // deselect any related disable input
        var disableInput = $($(this).data('disable'));
        disableInput.prop('checked', false);

        // button disable logic for onboarding forms
        conditionalToggle('[data-toggle]', '[data-button="onboarding"]');
    });

    $('[data-toggle="checkbox"]').click(function(event){
        event.preventDefault();
        var input = $('#' + $(this).attr('for'));
        var checked = input.prop('checked');
        input.prop('checked', !checked);
        $(this).toggleClass('on off');
    });

    $('[data-toggle="disable"]').click(function(event) {
        // prevent default binding between labels and inputs, execute manually
        // to enable custom handling afterwards
        event.preventDefault();
        var input = $("#" + $(this).attr('for'));
        var checked = input.prop('checked');
        // toggle check
        input.prop('checked', !checked)

        // set all related radio inputs to be unselected
        var disableRadio= $($(this).data('disable'));
        disableRadio.prop('checked', false);
        disableRadio.siblings('label').removeClass('on')
        disableRadio.siblings('label').addClass('off')

        // button disable logic for onboarding forms
        conditionalToggle('[data-toggle="disable"]', '[data-button="onboarding"]');
    });

    // toggle email registration visibility on email address link click
    $('.email-auth-toggle').click(function() {
        $('form[data-toggle]').toggle();
    });

    // enable submit button when email and password entered
    var authInputs = $('input[name=username], input[name=email], input[name=password], input[name=is_accredited], input[name=accredit-disable], input[name=us_resident]');
    authInputs.on("input change keyup paste", function() {
        var validValues = $.grep(authInputs, function(input) {
            if($(input).val()) {
                return true;
            } else {
                return false;
            }
        });

        var submitButton = $(this).closest('form').find('button[type=submit]');
        if (validValues.length == 2 || validValues.length == authInputs.length) {
            submitButton.removeAttr('disabled');
        } else {
            submitButton.attr('disabled', true);
        }
    });
});

//footer logic
$(document).ready(function(){
    $(".comment-form-submit").click(function(){
        dataString = $(".comment-form").serialize();
        $.ajax({
            type: "POST",
            url: "/suggestion/",
            data: dataString,
            success: function() {
                alert("Thank you for your feedback");
                $(".comment-box").val("");
            }
        });
        return false;
    });
});

$(document).ready(function(){
  $(".profile-button").on({ 'touchstart' : function(){
      $(".profile-menu").toggle();
    }
  });
});

$(document).ready(function(){
    var images = $('[data-image]');

    images.each(function(idx, elem){
        var that = $(elem);
        var src = window.location.origin + that.data("image");
        var preloader = new Image();
        preloader.src = src;
        preloader.onload = function(){
            debugger
            that.attr("src", src);
        };
    });
});



function MakeCarousel(carousels){
    carousels.owlCarousel({
        items: 1,
        nav: true,  // show navigation arrows
        navClass: ["carousel-nav left", "carousel-nav right"],
        navText: ["", ""],
        onInitialized: styleCarousel,
    });

}




function styleCarousel() {
    // show thumbnails if more than one, otherwise hide
    targetCarousel  =  this.$element
    carouselItems = targetCarousel.find('.carousel-image');
    if (carouselItems.length > 1) {
        // adding A to div.owl-page
        targetCarousel.find('.owl-controls .owl-dot').append('<a class="item-link" href="#"/><div class="item-thumbnail"></div></a>');

        var carouselLinks = targetCarousel.find('.owl-controls .item-link');
        var carouselThumbnails = targetCarousel.find('.owl-controls .item-thumbnail');

        $.each(carouselItems, function(i) {
            that = $(this);
            // i - counter
            // set Custom Event for pagination item
            carouselLink = $(carouselLinks[i]).click(function () {
                targetCarousel.trigger('targetCarousel.goTo', i);
            });
            // Give some styles and set background image for pagination item
            carouselThumbnail = $(carouselThumbnails[i]).css('background-image', "url('/static/img/ajax-loader.gif')" ).css("background-size", "auto").css("background-repeat","no-repeat");
            var thumbnailSource = that.attr('src');
            preloader = new Image();
            preloader.src = thumbnailSource;
            preloader.onload = function(){
                carouselThumbnail = $(carouselThumbnails[i]).css('background-image', "url('" + thumbnailSource + "')" ).css("background-size", "cover");
            };

        });
    } else {
        targetCarousel.find('.owl-controls').hide();
    }
}

function fullScreenElement(element) {
    if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.requestFullScreen) {
        element.requestFullScreen();
    }
}

$(document).ready(function() {
  $("input#id_phone_number").formance('format_phone_number');
});
