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


if($(window).width() < 651){
  $('.works-path__item--measuring').appendTo($('.works-path__items-box'));
}





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
    slidesToShow: 10,
    responsive: [ 
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 8,
          

        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
          

        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          

        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          

        }
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          

        }
      },
      {
        breakpoint: 545,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          

        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          

        }
      },
      

    ]
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
