$(document).ready(function(){
	// navi
	$(".navi > li").mouseover(function(){
		$(".submenu", this).stop().slideDown();
	});
	$(".navi > li").mouseout(function(){
		$(".submenu", this).stop().slideUp();
	});
	
	// modal
	$(".notice li:first").on('click', function(){
		$("#modal").addClass("active");
	});
	$("#modal span").on('click', function(){
		$("#modal").removeClass("active");
	});
	
	// image slide
	let sWidth = $(".imgslide").width();
	$(".slidelist").width(sWidth*3);
	$(".slidelist a").width(sWidth);
	
	// 윈도우 창 크기 바뀔 때 너비 담게 하기
	window.addEventListener("resize", function(){
		sWidth = document.querySelector(".imgslide").offsetWidth;
		$(".slidelist a").width(sWidth);
		$(".slidelist").width(sWidth*3);
	});
	
	setInterval(function(){
		$(".slidelist").animate({"marginLeft" : -sWidth}, function(){
			$(".slidelist a:first").appendTo(".slidelist");
			$(".slidelist").css({"marginLeft":"0"});
		});
	}, 3000);
});