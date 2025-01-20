$(document).ready(function(){
	// menu
	$(".navi > li").mouseover(function(){
		$(".submenu", this).stop().fadeIn(500);
	});
	$(".navi > li").mouseout(function(){
		$(".submenu", this).stop().fadeOut(500);
	});
	
	// popup
	$(".notice li:first").on('click', function(){
		$("#modal").addClass("active");
	});
	$(".btn").on('click', function(){
		$("#modal").removeClass("active");
	});
	
	// gallery img
	$(".gallery img").mouseover(function(){
		$(this).css("opacity", "60%");
	});
	$(".gallery img").mouseout(function(){
		$(this).css("opacity", "100%");
	});
	
	// imgslide
	setInterval(function(){
		$(".slidelist").animate({marginTop:"-700px"}, function(){
			$(".slidelist a:first").appendTo(".slidelist");
			$(".slidelist").css("margin-top", 0);
		});
	}, 3000);
});