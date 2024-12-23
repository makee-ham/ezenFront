$(document).ready(function(){
	// 메뉴 표시
	$(".navi > li").mouseover(function(){
		$(".submenu", this).stop().slideDown(500);  // 지금까지의 마우스오버 다 취소!
	});
	$(".navi > li").mouseout(function(){
		$(".submenu", this).stop().slideUp(500);
	});
	// 레이어 팝업
	$(".notice li:first").click(function(){
		// #modal에 active라는 클래스를 부여해
		$("#modal").addClass("active");
	});$(".btn").click(function(){
		// #modal에 active라는 클래스를 지워
		$("#modal").removeClass("active");
	});
	// tabmenu
	$(".tabmenu > li > a").click(function(){
		$(this).parent().addClass("active").siblings().removeClass("active");
		// tabmenu의 li의 a를 클릭하면
		// 걔의 부모를 찾아
		// 그래서 active 클래스를 부여해
		// 그런 다음에 걔의 형제들을 찾아
		// 그리고는 active 클래스를 뺏어
	});
	// 이미지 슬라이드
	// 슬라이드 이미지 중 가장 처음 것만 남기고 다 보이지 마우스오버
	$(".imgslide a:gt(0)").hide();  // gt는 greater than
	// 3초에 한번씩 반복되었으면 좋겠어
	// .imgslide a 중에서 첫 번째 애를 fadeOut
	// 그 다음에 있는 a를 fadeIn 시켜
	// 그 전에 선택했던 애 있잖아? (end)
	// 걔를 imgslide의 맨 마지막으로 위치이동시켜!(appendTo)
	setInterval(function(){
		$(".imgslide a:first").fadeOut()
			.next("a")
			.fadeIn()
			.end()
			.appendTo(".imgslide");
	}, 3000);
});