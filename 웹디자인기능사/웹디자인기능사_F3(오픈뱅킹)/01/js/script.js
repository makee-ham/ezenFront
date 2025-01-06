'use strict';

$(document).ready(function(){
	// 서브 메뉴 슉슉
	//.navi > li에 mouseover하면 .submenu 전체와 .menu_bg가 보이게 된다.
	$(".navi > li").mouseover(function(){
		$(".submenu").stop().slideDown(500);
		$(".menu_bg").stop().slideDown(500);
	}).mouseout(function(){
		$(".submenu").stop().slideUp(500);
		$(".menu_bg").stop().slideUp(500);
	});
	
	// 이미지 슬라이드 1, 2, 3
	// 3초마다 반복
	setInterval(function(){
		// 1-2-3 수직으로 나열되어 있으나, 횡으로 슬라이드 되게 해야 함!!
		// 1-2-3 을 수평으로 나열해야 하므로
		// imgslide는 프레임으로 놔두고, slidelist width를 300%?
		$(".slidelist").width("300%");
		$(".slidelist a").width("100vw");
		// 1이 왼쪽으로 가는 건 .slidelist가 왼쪽으로 움직이는 것
		$(".slidelist").animate({'marginLeft' : '-100vw'}, function(){
			// 그 후 1은 3 다음 차례로 appendTo 되어야 함
			$(".slidelist a:first").appendTo(".slidelist");
			$(".slidelist").css('margin-left', '0');
		});
	}, 3000);
	
	// 탭 메뉴 쇽쇽
	$(".tabmenu > li > a").on('click', function(){
		$(this).parent().addClass('active')
		.siblings().removeClass('active');
	});
	
	// 팝업이 뿅뿅
	$(".notice li:first-of-type").on('click', function(){
		$('#modal').addClass('active');
	});
	$(".btn").on('click', function(){
		$('#modal').removeClass('active');
	});
	
	// 팝업, esc 키로 꺼보자!
	document.addEventListener('keydown', function(e){
		if (e.key === 'Escape' && document.querySelector('#modal').classList.contains('active')) {
			$('#modal').removeClass('active');
		};
	});
});
