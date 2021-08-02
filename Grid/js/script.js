$(document).ready(function() {
    $('.header__burger').click(function() {
       $('.header__burger,.header__sidebar').toggleClass('active');
       $('body').toggleClass('lock');
    });
  });