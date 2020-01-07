if(!window.jQuery){
document.write('<script type="text/javascript" src="/js/lib/jquery.js"></script>')
}

$(document).ready(function () {
 
  var modal = $('.modal');
  var modalUp = $('.modal-up');
  
  var modalForm = $('.modal__form');
  var controlForm = $('.control__form');
  var footerForm = $('.footer__form');
  
  onSubmitForm(modalForm)
  onSubmitForm(controlForm)
  onSubmitForm(footerForm)

  $('[data-toggle=modal]').on('click', function () {
    modal.toggleClass('modal--visible');
  });

  $('.modal__close').on('click', function () {
    modal.toggleClass('modal--visible');
  });

  $('.modal-up__close').on('click', function () {
    modalUp.removeClass('modal-up--visible');
  });

  $(document).keydown(function () {
    if (event.keyCode == 27) {
      modal.removeClass('modal--visible');
      modalUp.removeClass('modal-up--visible');
    }
  });

  $(function () {
    $(window).scroll(function () {
      if ($(document).scrollTop() > $(window).height()) {
        $('.scroll-to-top').show();
      } else {
        $('.scroll-to-top').hide();
      }
    });
    $('.scroll-to-top').click(function () {
      $('html,body').animate({ scrollTop: 0 }, 1000);
    });
  });

  // slider
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');

  next.css('left', prev.width() + 20 + bullets.width() + 20)
  bullets.css('left', prev.width() + 20)

  new WOW().init();

  modalForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
        if (element.attr("type") == "checkbox") {
          return element.next('label').append(error);
        }
        error.insertAfter($(element));
    },
    rules: {

      userName: {
        required: true,
        minlength: 2
      },

      userPhone: "required",
 
      userEmail: {
        required: true,
        email: true
      },

      policyCheckbox: "required",
    }, 
    messages: {
      userName: {
        required: "Имя обязательно для заполнения",
        minlength: "Имя не короче 2-х букв"
      },
      userPhone: "Телефон обязателен для заполнения",
      userEmail: {
        required: "Обязательно укажите Email",
        email: "Введите в формате: name@domain.com"
      },
      policyCheckbox: "Обязательно для заполнения",
    }
  });

  function onSubmitForm(form) { 
   form.submit(function (event) {
     if (form.valid()) {
       event.preventDefault();
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(this).serialize(),
          success: function (response) {
           form[0].reset();
           $('.modal').removeClass('modal--visible'); 
           $('.modal-up').addClass('modal-up--visible');
            console.log(response)
            ym('56835025', 'reachGoal', 'submit'); return true
          
        },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR + " " + textStatus);
            
       }
       });
  }});
  }

  controlForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
        if (element.attr("type") == "checkbox") {
          return element.next('label').append(error);
        }
        error.insertAfter($(element));
    },    
    rules: {
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: "required",
      policyTick: "required",
  }, 
  messages: {
    userName: {
      required: "Имя обязательно для заполнения",
      minlength: "Имя не короче 2-х букв"
    },
    userPhone: "Телефон обязателен для заполнения",
    policyTick: "Обязательно для заполнения",
  }
  });

   footerForm.validate({
    errorClass: "invalid",
     errorElement: "div",
    errorPlacement: function (error, element) {
        if (element.attr("type") == "checkbox") {
          return element.next('label').append(error);
        }
        error.insertAfter($(element));
    },    
    rules: {

      userName: {
        required: true,
        minlength: 2
      },
      userPhone: "required",
      userQuestion: "required",
      policyMark: "required",
      
  }, 
  messages: {
   userName: {
      required: "Имя обязательно для заполнения",
      minlength: "Имя не короче 2-х букв"
    },
    userPhone: "Телефон обязателен для заполнения",
    userQuestion: "Пожалуйста, напишите Ваш вопрос",
    policyMark: "Обязательно для заполнения",
  }
  });
  
  $('[type=tel]').mask('+7(000) 000-00-00', { placeholder: "+7(___) ___-__-__" });

  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '360',
      width: '100%',
      videoId: 'W25aL7SWeJk',
      events: {
        'onReady': videoPlay,
      }
    });
  })

  function videoPlay(event) {
    event.target.playVideo();
  }
});