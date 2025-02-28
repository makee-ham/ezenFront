$(document).ready(function () {
  // 메뉴
  $(".navi > li").mouseover(function () {
    $(".submenu", this).stop().slideDown();
  });
  $(".navi > li").mouseout(function () {
    $(".submenu", this).stop().slideUp();
  });
  // 이미지 슬라이드
  setInterval(function () {
    $(".slidelist").animate({ marginTop: "-400px" }, function () {
      $(".slidelist a:first").appendTo(".slidelist");
      $(".slidelist").css({ marginTop: 0 });
    });
  }, 3000);
  // 보드
  $(".tab li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    if (this.innerHTML === "공지사항") {
      $(".notice").css({ display: "flex" });
      $(".gallery").css({ display: "none" });
    } else {
      $(".notice").css({ display: "none" });
      $(".gallery").css({ display: "flex" });
    }
  });
  // 모달
  $(".notice li:first").click(function () {
    $("#modal").addClass("active");
  });
  $(".btn").click(function () {
    $("#modal").removeClass("active");
  });
});
