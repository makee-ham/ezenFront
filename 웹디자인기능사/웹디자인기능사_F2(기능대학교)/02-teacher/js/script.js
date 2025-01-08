'use strict';

$(document).ready(function(){
	// 메뉴
	$(".navi > li").mouseover(function(){
		$(".submenu", this).stop().slideDown(500);
	}).mouseout(function(){
		$(".submenu", this).stop().slideUp(500);
	});
	
	// 레이어 팝업
	$(".notice li:first-of-type").on('click', function(){
		$('#modal').addClass('active');
	});
	$(".btn").on('click', function(){
		$('#modal').removeClass('active');
	});
	
	// 이미지 슬라이드
	$(".imgslide a:not(:first)").hide(); // 첫 번째 거 빼고 다 숨기기!
	setInterval(function(){
		$(".imgslide a:first").fadeOut(500)
			.next("a") // 그 다음의 a 찾기
			.fadeIn(500)
			.end() // 그 전에 선택했던 것, 즉 첫번째 a ('끝'에, 마지막으로 선택했던 것) - 선택했던 것이 메소드체인 등으로 같이 이어져 있어야 적용됨
			.appendTo(".imgslide");
	}, 3000);
});