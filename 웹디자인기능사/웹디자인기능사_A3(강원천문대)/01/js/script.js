$(document).ready(function () {
  // menu
  $(".navi > li").mouseover(function () {
    $(".submenu").stop().slideDown(500);
    $(".menu_bg").stop().slideDown(500);
  });
  $(".navi > li").mouseout(function () {
    $(".submenu").stop().slideUp(500);
    $(".menu_bg").stop().slideUp(500);
  });

  // img slide
  $(".imgslide a:gt(0)").hide();
  setInterval(function () {
    $(".imgslide a:first")
      .fadeOut(800)
      .next()
      .fadeIn(800)
      .end()
      .appendTo(".imgslide");
  }, 3000);

  // tab menu
  $(".tabmenu > li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  // modal popup
  $(".notice li:first").on("click", function () {
    $("#modal").addClass("active");
  });
  $(".btn").on("click", function () {
    $("#modal").removeClass("active");
  });
});
