/* js
document.addEventListener("DOMContentLoaded", function (event) {
  const modal = document.querySelector('.modal');
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');
  const switchModal = () => {
    modal.classList.toggle('modal--visible');
  }

  modalBtn.forEach(element => {
    element.addEventListener('click', switchModal);
  });

  closeBtn.addEventListener('click', switchModal);

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {switchModal() }
  });

  document.addEventListener('click', function(e) {
    e.target.classList.toggle('.modal--visible')
    });
  
  });
*/

// jquery
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

  //Валидация форма
  $('.modal__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: "required",
      // правило-объект (блок)
      userEmail: {
        required: true,
        email: true
      }
    }, // сообщения
    messages: {
      userName: {
        required: "Имя обязательно для заполнения",
        minlength: "Имя не короче 2-х букв"
      },
      userPhone: "Телефон обязателен для заполнения",
      userEmail: {
        required: "Обязательно укажите Email",
        email: "Введите в формате: name@domain.com"
      }
    }
  });

  function onSubmitForm(form) { 
   return form.submit(function (event) {
     if (form.valid()) {
       event.preventDefault();
        $.ajax({
          type: "POST",
          url: "send.php",
         data: $(this).serialize(),
          success: function (response) {
            form[0].reset();
           $('.modal-up').addClass('modal-up--visible');
           console.log(response)

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
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: "required",
  }, // сообщения
  messages: {
    userName: {
      required: "Имя обязательно для заполнения",
      minlength: "Имя не короче 2-х букв"
    },
    userPhone: "Телефон обязателен для заполнения",
  }
  });

   footerForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: "required",
      userQuestion: "required",
      
  }, // сообщения
  messages: {
   userName: {
      required: "Имя обязательно для заполнения",
      minlength: "Имя не короче 2-х букв"
    },
    userPhone: "Телефон обязателен для заполнения",
    userQuestion: "Пожалуйста, напишите Ваш вопрос",
  }
  });
  
  //маска для номера телефона

  $('[type=tel]').mask('+7(000) 000-00-00', { placeholder: "+7(___) ___-__-__" });


  
  // создание yandex карты
 ymaps.ready(function () {
   var myMap = new ymaps.Map('map', {
     center: [47.244734, 39.723227],
     zoom: 9
   }, {
     searchControlProvider: 'yandex#search'
   }),

     // Создаём макет содержимого.
     MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
       '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
     ),

     myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
       hintContent: 'Наш офис',
       balloonContent: 'Вход со двора'
     }, {
       // Опции.
       // Необходимо указать данный тип макета.
       iconLayout: 'default#image',
       // Своё изображение иконки метки.
       iconImageHref: 'img/location-pin.png',
       // Размеры метки.
       iconImageSize: [32, 32],
       // Смещение левого верхнего угла иконки относительно
       // её "ножки" (точки привязки).
      iconImageOffset: [-5, -38]
     });

    myMap.geoObjects
        .add(myPlacemark);
});

});