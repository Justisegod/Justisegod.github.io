$(function () {

  $('.header__btn').on('click', function () {
      $('.rightside-menu').removeClass('rightside-menu--close');
  })
  $('.rightside-menu__close').on('click', function () {
    $('.rightside-menu').addClass('rightside-menu--close');
  })
  

  $('.header__btn-menu').on('click', function () {
    $('.menu').toggleClass('menu--open');
});



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
  $('.article-slider__box').slick({
    nextArrow:
    '<button  type="button" class="article-slider__arrow article-slider__arrowright "><img src="images/arrow-slider-right.svg" alt="arrow right"></button>',
    


    prevArrow:
    '<button  type="button" class="article-slider__arrow  article-slider__arrowleft"><img src="images/arrow-slider-left.svg" alt="arrow left"></button>'


    
    
  });

 
    


//   $('.gallery__inner').mixItUp({
//     selectors: {
//       filter: '.living'
//     }
//   });

//   $('.blog__items-content').mixItUp({
//     selectors: {
//       filter: '.all'
//     }
//   });
// });




  var mixer = mixitup('.gallery__inner',{
    load: {
      filter: '.living'
    }
  });

 


})
