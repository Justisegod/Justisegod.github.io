 $(document).ready(function() {
   $('.header-burger').click(function() {
      $('.header-burger,.header-menu').toggleClass('active');
      $('body').toggleClass('lock');
   });
 });