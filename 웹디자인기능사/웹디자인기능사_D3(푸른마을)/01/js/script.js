$(document).ready(function(){
	// 레이어 팝업
	$(".notice li:first").click(function(){
		$("#modal").addClass("active");
	});
	$(".btn").click(function(){
		$("#modal").removeClass("active");
	});
		
	// 이미지 슬라이드
	$(".imgslide a:gt(0)").hide();
	setInterval(function(){
		$(".imgslide a:first").fadeOut()
			.next("a").fadeIn()
			.end().appendTo(".imgslide");
	}, 3000);
		
	// 탭 메뉴
	$(".tabmenu > li > a").click(function(){
		$(this).parent().addClass("active").siblings().removeClass("active");
	});
	
	// 메인 메뉴
	$(".menu").mouseover(function(){
		$(".subMenuBG").css({zIndex : "500", left : "190px", opacity : "1"});
	});
	$(".menu").mouseout(function(){
		$(".subMenuBG").css({zIndex : "-1", left : "220px", opacity : "0"});
	});
});