$(document).ready(function(){
	// 메인 메뉴
	$(".navi > li").mouseover(function(){
		$(".submenu", this).stop().fadeIn(500);
	});
	$(".navi > li").mouseout(function(){  // 안의 ul도 이 li의 일부임 그래서 안 꺼져
		$(".submenu", this).stop().fadeOut(500);
	});
	// 공지사항 팝업
	$(".notice li:first").click(function(){
		$("#modal").addClass("active");
	});
	$(".btn").click(function(){
		$("#modal").removeClass("active");
	});
	// 슬라이드 이미지             (query = 질의응답)
	// 야~~ 너~~ .imgslide를 찾아봐, 그래서 걔의 넓이를 나한테 알려줘~~~
	sWidth = document.querySelector(".imgslide").offsetWidth;  // class imgslide를 찾아! offset은 상대적인? 현재 위치?간의 거리
	$(".slidelist").width(sWidth*3);
	$(".slidelist a").width(sWidth);
	setInterval(function(){
		$(".slidelist").animate({"marginLeft":-sWidth}, function(){
			$(".slidelist a:first").appendTo(".slidelist")
			$(".slidelist").css({"marginLeft":"0"})
		});
	}, 3000);
});