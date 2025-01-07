'use strict';

$(document).ready(function(){
	// 서브 메뉴 슉슉
	//.navi > li에 mouseover하면 .submenu 전체와 .menu_bg가 보이게 된다.
	$(".navi > li").mouseover(function(){
		$(".submenu, .menu_bg").stop().slideDown(500);
	}).mouseout(function(){
		$(".submenu, .menu_bg").stop().slideUp(500);
	});
	
	/*
	// 이미지 슬라이드 내가 만들어보기
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
	*/
	
	// 선생님 따라서 이미지 슬라이드 1
	/*
	// 가로로 쭉 배치되게 하기
	// 현재 너비 값 받기
	let sWidth = document.querySelector(".imgslide").offsetWidth;
	// 배경 이미지 등 a에 현재 너비 지정
	$(".slidelist a").width(sWidth);
	// 그걸 담고 있는 슬라이드리스트는 a 3개니까 현재 너비 곱하기 3
	$(".slidelist").width(sWidth*3);
	// 윈도우 창 크기 바뀔 때 너비 담게 하기
	window.addEventListener("resize", function(){
		sWidth = document.querySelector(".imgslide").offsetWidth;
		$(".slidelist a").width(sWidth);
		$(".slidelist").width(sWidth*3);
		console.log(sWidth);
	});
	// 이하 이전과 동일
	setInterval(function(){
		$(".slidelist").animate({"marginLeft":-sWidth}, function(){
			$(".slidelist a:first").appendTo(".slidelist");
			$(".slidelist").css({"marginLeft":"0"});
		});
	}, 3000);
	*/
	
	// 선생님 따라서 이미지 슬라이드 2 오잉 내 버전이네 ^__^
	// 추가할 때; 유지보수 대비하기
	const cnt = $(".slidelist a").length;

	setInterval (function () {
		// vw : viewport width
		$(".slidelist a").width("100vw");
		// 이미지 몇 개가 되도 들어갈 수 있게! 걍 300vw 하면 3개 fix니까. 이게 프로그래밍임!!!
		$(".slidelist").width(cnt*100+"vw");
		
		$(".slidelist").animate({"marginLeft":"-100vw"}, function(){
			$(".slidelist a:first").appendTo(".slidelist");
			$(".slidelist").css({"marginLeft":"0"});
		});
	}, 3000);
	
	
	// 탭 메뉴 쇽쇽
	$(".tabmenu > li > a").on('click', function(){
		$(this).parent().addClass('active')
				.siblings().removeClass('active');
	});
	
	// 레이어 팝업이 뿅뿅
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
