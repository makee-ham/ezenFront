$(document).ready(function () {
  // 아코디언 메뉴
  $(".navi > li").mouseover(function () {
    $(".submenu", this).stop().slideDown(300);
  });
  $(".navi > li").mouseout(function () {
    $(".submenu", this).stop().slideUp(300);
  });

  // imgslide
  setInterval(function () {
    let slideWidth = $(".sliderWrap").width();
    $(".sliderContainer").animate(
      {
        marginLeft: `-${slideWidth}px`,
      },
      1000,
      function () {
        $("a:first", this).appendTo(this);
        $(this).css("margin-left", "0px");
      }
    );
  }, 3000);

  // modal
  $(".notice > ul > li:first").click(function () {
    $("#modal").addClass("active");
  });
  $(".btn").click(function () {
    $("#modal").removeClass("active");
  });
});
