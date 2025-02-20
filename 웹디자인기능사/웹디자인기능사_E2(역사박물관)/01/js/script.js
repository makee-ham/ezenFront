$(document).ready(function () {
  // 메인 메뉴
  $(".navi > li").mouseover(function () {
    $(".submenu", this).stop().slideDown(500);
  });
  $(".navi > li").mouseout(function () {
    $(".submenu", this).stop().slideUp(500);
  });

  // 모달
  $(".notice li:first").click(function () {
    $("#modal").addClass("active");
  });
  $(".btn").click(function () {
    $("#modal").removeClass("active");
  });

  // 이미지 슬라이드
  setInterval(function () {
    $(".slidelist").animate({ marginTop: "-750px" }, function () {
      $("a:first", this).appendTo(".slidelist");
      $(".slidelist").css({ marginTop: 0 });
    });
  }, 3000);
});
