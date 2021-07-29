$(function () {

  $('.header__btn').on('click', function () {
      $('.rightside-menu').removeClass('rightside-menu--close');
  })
  $('.rightside-menu__close').on('click', function () {
    $('.rightside-menu').addClass('rightside-menu--close');
  })
  
  $('.top__slider').slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true
  });

  $('.contact-slider__items').slick({
    dots: true,
    arrows: false,
    slidesToScroll: 10,
    slidesToShow: 10
  });


  var mixer = mixitup('.gallery__inner',{
    load: {
      filter: '.living'
    }
  });



})
