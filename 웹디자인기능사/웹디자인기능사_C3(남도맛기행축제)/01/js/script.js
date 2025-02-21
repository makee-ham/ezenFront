$(document).ready(function () {
  // 메뉴
  $(".navi > li").mouseover(function () {
    $(".submenu", this).stop().fadeIn();
  });
  $(".navi > li").mouseout(function () {
    $(".submenu", this).stop().fadeOut();
  });
  // 이미지 슬라이드
  setInterval(function () {
    $(".slidecontainer").animate({ marginLeft: "-800px" }, function () {
      $("a:first", this).appendTo(this);
      $(this).css({ marginLeft: 0 });
    });
  }, 3000);
  // 팝업
  $(".notice li:first").click(function () {
    $("#modal").addClass("active");
  });
  $(".btn").click(function () {
    $("#modal").removeClass("active");
  });
});
