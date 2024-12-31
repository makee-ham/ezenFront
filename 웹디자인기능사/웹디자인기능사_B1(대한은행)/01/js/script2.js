$(document).ready(function(){
	// 이미지 슬라이드
	// .slidelist를 marginLeft 값이 -1200px 되도록 animate
	// .slidelist의 a의 첫번째 요소를 .slidelist의 맨 마지막으로 이동
	// .slidelist의 marginLeft값을 0으로 재조정(css)
	// 위의 작업을 3초에 한번씩 주기적으로 실행되도록 한다.
	setInterval(function(){							// callback함수. 앞함수 끝나고 나서 실행됨
	/*
		$(".slidelist").animate({"marginLeft":"-1200px"},function(){
			$(".slidelist a:first").appendTo(".slidelist")
			$(".slidelist").css({"marginLeft":"0"})
		})
	*/
		$(".slidelist a:last").prepandTo(".slidelist")
	
	}, 3000);
});