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
	setInterval(function(){
		$(".slidelist").width("300vw");
		$(".slidelist a").width("100vw");
		$(".slidelist").animate({"marginLeft" : "-100vw"}, function(){
			$(".slidelist a:first").appendTo(".slidelist");
			$(".slidelist").css({"marginLeft":"0"});
		});
	}, 3000);
});