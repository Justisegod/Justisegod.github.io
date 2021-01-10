$(document).ready(function() {
	function slowScroll(id) {
 		$('html, body').animate({
          scrollTop: $(id).offset().top
 		}, 500);
 	}

 	$(document).on("scroll", function () {
       if($(window).scrollTop() === 0)
       	 $("header").removeClass("fixed");
       else
       	 $("header").attr("class", "fixed");
 	});

 $('h2').click(function() {
   $(this).toggleClass('blue')
  });

  $('input').focus(function() {
  	console.log('Pole V Focuse')
  });

 $('input').change(function() {
 	 $('#name').text(', ' + $(this).val());

 });

$('input').keyup(function() {
	$('#userName').text(', ' + $(this).val());

});

//
$('#box').delay(1000).hide(1000).show(1000);
	 $('#box:first').animate({
	 	'width': '100%'
	 	,'height': '100%'
	 	,'margin-top': '50%'
	 }, 1000).hide(10000)

 //
 $('img').click(function(){
 	$(this).fadeOut(500, function() {
 		$(this).attr('src', 'img/coming-soon.jpg').fadeIn(500);
 	});
 });

$('#overview').attr('data-target', 'text')

 });


	



 
