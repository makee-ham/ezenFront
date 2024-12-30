$(document).ready(function(){
	// 메인메뉴(gnb)
	$(".navi > li").mouseover(function(){
		$(".submenu").stop().slideDown(500);
	}).mouseout(function(){
		$(".submenu").stop().slideUp(500);
	});
	// 레이어 팝업
	// .notice의 li의 첫번째 요소를 클릭하면
	// #modal에 active 클래스를 부여한다.
	$(".notice li:first").click(function(){
		$("#modal").addClass("active");
	});
	$(".btn").click(function(){
		$("#modal").removeClass("active");
	});
	// tabmenu
	// .tabmenu > li > a를 클릭하면
	// 클릭한 애의 부모한테 active를 부여하고
	// 걔의 형제들한테서 active 클래스를 회수한다.
	$(".tabmenu > li > a").click(function(){
		$(this).parent().addClass("active")
		.siblings().removeClass("active");
	});
	// 이미지 슬라이드
	// .slidelist를 marginLeft 값이 -1200px 되도록 animate
	// .slidelist의 a의 첫번째 요소를 .slidelist의 맨 마지막으로 이동
	// .slidelist의 marginLeft값을 0으로 재조정(css)
	// 위의 작업을 3초에 한번씩 주기적으로 실행되도록 한다.
	setInterval(function(){							// callback함수. 앞함수 끝나고 나서 실행됨
		$(".slidelist").animate({"marginLeft":"-1200px"},function(){
			$(".slidelist a:first").appendTo(".slidelist")
			$(".slidelist").css({"marginLeft":"0"})
		})
	}, 3000);
});