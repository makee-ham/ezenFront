$(document).ready(function(){
	$('ul#panel li:not('+  $('ul#tab  li  a.selected').attr('href')  +')').hide();
	$('ul#tab li a').click(function(){
		$('ul#tab li a').removeClass('selected');
		$(this).addClass('selected');
		
		$('ul#panel li').hide();
		$($(this).attr('href')).show();
		return false
	});

});

......
 1. 탭패널의 초기설정  

선택된 패널의 속성을 보여준다. 
$('ul#tab  li  a.selected').attr('href')

not() 연산자 사용 , 제외하고 보여주세요
$("요소선택:not(요소명)")

선택되지 않은 패널(ul.tab  li  a.selected  ) 숨기기(hide)
-  선택된 패널만 보여주기  => 선택된 패널의 링크걸린 속성만 빼고 숨기기   
answer01)))  $('ul#panel  li:not(:first)').hide();
answer02)))  $('ul#panel  li:not('+   선택된 패널의 링크걸린 속성    + ')').hide();	

2 탭패널(ul#tab  li  a) 이 클릭되면( click ) - a 속성 click => return false
 $('ul#tab li a').click(function(){ 
 
3 탭패널(ul#tab  li  a)  selected 클래스 속성 지우기(removeClass)
$('ul#tab li a').removeClass('selected');

4 선택된 탭에 selected 클래스 속성값 붙이기 (addClass) $(this).addClass('selected');

5 일단 모든 패널을(ul#panel li) 비표시로 설정하고(hide) $('ul#panel li').hide();

6 클릭된 a의 href 속성을 가져와(attr)
같은 이름의 id 속성을 가진 패널을 표시하기(show)
$($(this).attr('href')).show();