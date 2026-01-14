/*--------------------- Copyright (c) 2024 -----------------------
[Master Javascript]
Project: Atharv Veda HTML
-------------------------------------------------------------------*/
(function ($) {
  "use strict";
  var pureayurveda = {
    initialised: false,
    version: 1.0,
    init: function () {
      if (!this.initialised) {
        this.initialised = true;
      } else {
        return;
      }
      /*-------------- Pure_ayurveda Functions Calling -------------------------------------------------*/
      this.ayur_loader();
      this.ayur_nav_menu();
      this.tr_fix_menu_scroll();
      this.ayur_banner_slider();
      this.ayur_care_slider();
      this.ayur_testimonial_slider();
      this.ayur_counter();
      this.ayur_quantity();
      this.Select2();
      this.CheckoutPayment();
    },
    /*-------------- Pure_ayurveda Functions Calling -------------------------------------------------*/

    // loader js
    ayur_loader: function () {
      jQuery(window).on("load", function () {
        $(".ayur-loader").fadeOut();
        $(".ayur-spin").delay(500).fadeOut("slow");
      });
    },
    // nav menu toggle
    ayur_nav_menu: function () {
      $(document).on("click", function (event) {
        var $trigger = $(".ayur-toggle-btn");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
          $("body").removeClass("ayur-menu-open");
        }
      });
      $(".ayur-toggle-btn").click(function () {
        $("body").toggleClass("ayur-menu-open");
      });

      //submenu
      $(".ayur-has-menu > a").click(function (event) {
        event.stopPropagation();
        var $submenu = $(this).next(".ayur-submenu");
        $(".ayur-submenu").not($submenu).removeClass("ayur-submenu-open");
        $submenu.toggleClass("ayur-submenu-open");
      });
      $(".ayur-submenu a").click(function (event) {
        event.stopPropagation();
      });
      $(document).on("click", function (event) {
        if (!$(event.target).closest(".ayur-has-menu").length) {
          $(".ayur-submenu").removeClass("ayur-submenu-open");
        }
      });
    },
    // fix menu scroll
    tr_fix_menu_scroll: function () {
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
          $(".tr_menu_wrapper1").addClass("tr-fixed");
        } else {
          $(".tr_menu_wrapper1").removeClass("tr-fixed");
        }
      });
    },

    // banner slider
    ayur_banner_slider: function () {
      const not_active_slide_scale_value = 0.85;
      const not_active_slide_opacity_value = 0.5;
      var swiper_scale_active = new Swiper("[swiper_scale_active]", {
        slidesPerView: 2,
        parallax: true,
        loop: true,
        breakpoints: {
          320: {
            speed: 900,
            slidesPerView: 1,
          },
          670: {
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
        },
        keyboard: {
          enabled: true,
        },
        centeredSlides: true,
        loop: true,
        slideToClickedSlide: true,
        spaceBetween: 0,
        grabCursor: true,
        speed: 1500,
        autoplay: {
          delay: 2000,
        },
        effect: "creative",
        creativeEffect: {
          limitProgress: 2,
          rotate: 0,
          stretch: 0,
          depth: 100,
          prev: {
            opacity: not_active_slide_opacity_value,
            scale: not_active_slide_scale_value,
            translate: ["-65%", 0, 0],
          },
          next: {
            opacity: not_active_slide_opacity_value,
            scale: not_active_slide_scale_value,
            translate: ["65%", 0, 0],
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },

    // care slider
    ayur_care_slider: function () {
      var careSwiper = new Swiper(".ayur-care-slider", {
        loop: true,
        slidesPerView: 8,
        spaceBetween: 30,
        navigation: {
          nextEl: ".ayur-care-slider-sec .swiper-button-next",
          prevEl: ".ayur-care-slider-sec .swiper-button-prev",
        },
        breakpoints: {
          1800: {
            slidesPerView: 8,
            spaceBetween: 30,
          },
          1600: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
          1199: {
            slidesPerView: 8,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 0,
          },
          991: {
            slidesPerView: 6,
            spaceBetween: 0,
          },
          767: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
          600: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          460: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          0: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
        },
      });
    },
    // testimonial slider
    ayur_testimonial_slider: function () {
      var testimonialSwiper = new Swiper(".ayur-testimonial-slider", {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        speed: 2000,
        autoplay: {
          delay: 2000,
        },
        navigation: {
          nextEl: ".ayur-testimonial-section .swiper-button-next",
          prevEl: ".ayur-testimonial-section .swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      });
    },

    ayur_counter: function () {
      $(".ayur-counting").text("");
      $(".ayur-counting").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-to");
        $({ countNum: $this.text() }).animate(
          { countNum: countTo },
          {
            duration: 3000,
            easing: "linear",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
    },
    ayur_quantity: function () {
      $(".shop-add").click(function () {
        if ($(this).prev().val() < 50000) {
          $(this)
            .prev()
            .val(+$(this).prev().val() + 1);
        }
      });
      $(".shop-sub").click(function () {
        let inputElement = $(this).prevAll("input");
        if (inputElement.val() > 1) {
          inputElement.val(+inputElement.val() - 1);
        }
      });
    },
    Select2: function () {
      $(".mySelect").select2({
        placeholder: "Select an option",
        width: "100%",
        dropdownAutoWidth: true,
        minimumResultsForSearch: Infinity,
      });
    },
    // Checkout Payment
    CheckoutPayment: function () {
      $("input[name$='checkout']").on("click", function () {
        var test = $(this).val();
        $(".payment_box").hide("slow");
        $(".payment_box[data-period='" + test + "']").show("slow");
      });
    },
  };
  pureayurveda.init();
})(jQuery);

function checkRequire(formId, targetResp) {
  targetResp.html("");
  var email =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  var url =
    /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
  var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
  var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
  var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
  var google_plus =
    /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
  var check = 0;
  $("#er_msg").remove();
  var target = typeof formId == "object" ? $(formId) : $("#" + formId);
  target.find("input , textarea , select").each(function () {
    if ($(this).hasClass("require")) {
      if ($(this).val().trim() == "") {
        check = 1;
        $(this).focus();
        $(this).parent("div").addClass("form_error");
        targetResp.html("You missed out some fields.");
        $(this).addClass("error");
        return false;
      } else {
        $(this).removeClass("error");
        $(this).parent("div").removeClass("form_error");
      }
    }
    if ($(this).val().trim() != "") {
      var valid = $(this).attr("data-valid");
      if (typeof valid != "undefined") {
        if (!eval(valid).test($(this).val().trim())) {
          $(this).addClass("error");
          $(this).focus();
          check = 1;
          targetResp.html($(this).attr("data-error"));
          return false;
        } else {
          $(this).removeClass("error");
        }
      }
    }
  });
  return check;
}

$(".submitForm").on("click", function () {
  var _this = $(this);
  var targetForm = _this.closest("form");
  var errroTarget = targetForm.find(".response");
  var check = checkRequire(targetForm, errroTarget);

  if (check == 0) {
    var formDetail = new FormData(targetForm[0]);
    formDetail.append("form_type", _this.attr("form-type"));
    $.ajax({
      method: "POST",
      url: "ajaxmail.php",
      data: formDetail,
      cache: false,
      contentType: false,
      processData: false,
    }).done(function (resp) {
      console.log(resp);
      if (resp == 1) {
        targetForm.find("input").val("");
        targetForm.find("textarea").val("");
        errroTarget.html(
          '<p style="color:green;">Mail has been sent successfully.</p>'
        );
      } else {
        errroTarget.html(
          '<p style="color:red;">Something went wrong please try again latter.</p>'
        );
      }
    });
  }
});

$(document).ready(function () {
  $(".ayur-tpro-like a").click(function () {
    $(this).toggleClass("likeproduct");
  });
});

/* Floating contact buttons injection (WhatsApp + Call Now)
   Injected here so every page that loads assets/js/custom.js gets the buttons
*/
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      var phone = "+12022021994";
      var wa = "12022021994";

      // Ensure a Font Awesome stylesheet that includes brand icons is present.
      // If an existing font-awesome link is present we leave it; otherwise add a CDN link (FA 5.15.4 all.min.css).
      try {
        var hasFA = !!document.querySelector(
          'link[href*="font-awesome"], link[href*="fontawesome"], link[href*="all.min.css"]'
        );
        if (!hasFA) {
          var faLink = document.createElement("link");
          faLink.rel = "stylesheet";
          faLink.href =
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
          // avoid an integrity attribute here so the resource won't be blocked if the hash changes
          faLink.crossOrigin = "anonymous";
          faLink.referrerPolicy = "no-referrer";
          document.head.appendChild(faLink);
        }
      } catch (err) {
        // non-fatal: continue and create buttons even if adding the stylesheet fails
        console.warn("Could not ensure Font Awesome stylesheet:", err);
      }

      var container = document.createElement("div");
      container.className = "ayur-float-contact";
      // helper to replace a failed image with an icon HTML
      window.__ayur_imgOnError =
        window.__ayur_imgOnError ||
        function (imgEl, html) {
          try {
            imgEl.outerHTML = html;
          } catch (e) {
            imgEl.style.display = "none";
          }
        };
      // Use local images if present (assets/wp.png for WhatsApp, assets/call.png for Call)
      // If the image fails to load, replace it with the corresponding FA icon as a fallback.
      container.innerHTML =
        '<a class="ayur-float-btn ayur-float-whatsapp" href="https://wa.me/' +
        wa +
        '?text=Hello%20Atharv%20Veda" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">' +
        '<img src="assets/wp.png" alt="WhatsApp"/>' +
        "<span>WhatsApp</span></a>" +
        '<a class="ayur-float-btn ayur-float-call" href="tel:' +
        phone +
        '" aria-label="Call Now">' +
        '<img src="assets/call.png" alt="Call"/>' +
        "<span>Call Now</span></a>";
      document.body.appendChild(container);
    } catch (e) {
      console.error("Error adding floating contact buttons:", e);
    }
  });
})();
