'use strict';

const thisSub = document.querySelector

$(document).ready(function(){
	$(".navi > li").mouseover(function(){
		$(this).find(".submenu").stop().slideDown(500);
	}).mouseout(function(){
		$(this).find(".submenu").stop().slideUp(500);
	});


	$(".slidelist a:gt(0)").hide();
	setInterval(function(){
		$(".slidelist a:first").fadeOut(1000)
			.next("a")
			.fadeIn(1000)
			.end()
			.appendTo(".slidelist");
	}, 3000);
	

	$(".notice li:first-of-type").on('click', function(){
		$('#modal').addClass('active');
	});
	$(".btn").on('click', function(){
		$('#modal').removeClass('active');
	});
});