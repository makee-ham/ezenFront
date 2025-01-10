'use strict';

$(document).ready(function(){
	// menu
	$(".navi > li").mouseover(function(){
		$(".submenu").stop().slideDown();
	});
	$(".navi > li").mouseout(function(){
		$(".submenu").stop().slideUp();
	});
	
	// tabmenu
	$(".tabmenu > ul > li > a").on("click", function(){
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	
	// image slide
	setInterval(function(){
		$(".slidelist").animate({"marginTop" : "-300px"}, function(){
			$(".slidelist a:first").appendTo(".slidelist");
			$(".slidelist").css("margin-top", "0");
		});
	} ,3000);
	
	// modal
	$(".notice > li:first").click(function(){
		$("#modal").addClass("active");
	});
	$(".btn").click(function(){
		$("#modal").removeClass("active");
	});
});