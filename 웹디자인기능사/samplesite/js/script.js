$(function () {
  //대메뉴

  $(".submenu,.sub_bg").hide();
  $(".main_menu>ul>li").mouseover(function () {
    $(".add", this).addClass("hover");
    $(".submenu", this).stop().slideDown();
    $(".sub_bg").stop().slideDown();
  });

  $(".main_menu>ul>li").mouseout(function () {
    $(".add", this).removeClass("hover");
    $(".submenu", this).stop().slideUp();
    $(".sub_bg").stop().slideUp();
  });

  // 상단 슬라이드

  var ww = $(window).width();
  $(".m_slide, .m_slide>div").css("width", ww + "px");
  $(".m_slide>div")
    .not(":eq(0)")
    .css("left", ww + "px");

  clear = setInterval(slide, 4000);

  now = 0;
  imgs = 3;

  function slide() {
    now = now == imgs ? 0 : (now += 1);
    $(".m_slide>div")
      .eq(now - 1)
      .animate({ left: -ww + "px" }, 1000);
    $(".m_slide>div")
      .eq(now)
      .animate({ left: "0px" }, 1000, function () {
        $(".m_slide>div")
          .not(":eq(" + now + ")")
          .css("left", ww + "px");
      });
    $(".m_bullet>li").removeClass("m_bullet_hover");
    $(".m_bullet>li").eq(now).addClass("m_bullet_hover");
  }

  // 상단 슬라이드- 버튼, 블릿기호 클릭시 자동 슬라이드 clear

  $(".m_prev, .m_next, .m_bullet>li").click(function () {
    clearInterval(clear);
  });

  // 상단 슬라이드- next버튼 클릭시 슬라이드 0-1-2-3-0

  function slide_right() {
    now = now == imgs ? 0 : (now += 1);
    if (now == 0) {
      $(".m_slide>div")
        .not(":eq(3)")
        .css("left", ww + "px");
      $(".m_slide>div")
        .eq(3)
        .animate({ left: -ww + "px" }, 1000);
    } else {
      $(".m_slide>div")
        .not(":eq(" + (now - 1) + ")")
        .css("left", ww + "px");
      $(".m_slide>div")
        .eq(now - 1)
        .animate({ left: -ww + "px" }, 1000);
    }
    $(".m_slide>div")
      .eq(now)
      .animate({ left: "0px" }, 1000, function () {
        $(".m_slide>div")
          .not(":eq(" + now + ")")
          .css("left", ww + "px");
      });
    $(".m_bullet>li").removeClass("m_bullet_hover");
    $(".m_bullet>li").eq(now).addClass("m_bullet_hover");
  }

  $(".m_next").click(function () {
    slide_right();
  });

  // 상단 슬라이드- prev버튼 클릭시 슬라이드 0-3-2-1-3

  function slide_left() {
    var imgs = 0;
    now = now == imgs ? 3 : (now -= 1);
    if (now == 3) {
      $(".m_slide>div")
        .not(":eq(0)")
        .css("left", -ww + "px");
      $(".m_slide>div")
        .eq(0)
        .animate({ left: ww + "px" }, 1000);
    } else {
      $(".m_slide>div")
        .not(":eq(" + (now + 1) + ")")
        .css("left", -ww + "px");
      $(".m_slide>div")
        .eq(now + 1)
        .animate({ left: ww + "px" }, 1000);
    }
    $(".m_slide>div")
      .eq(now)
      .animate({ left: "0px" }, 1000, function () {
        $(".m_slide>div")
          .not(":eq(" + now + ")")
          .css("left", ww + "px");
      });
    $(".m_bullet>li").removeClass("m_bullet_hover");
    $(".m_bullet>li").eq(now).addClass("m_bullet_hover");
  }

  $(".m_prev").click(function () {
    slide_left();
  });

  // 상단 슬라이드- 블릿기호

  $(".m_bullet>li").click(function () {
    var bulletNumber = $(this).index();
    // $(alert(bulletNumber));
    if (now == bulletNumber) return;
    else {
      $(".m_slide>div")
        .not(":eq(" + now + ")")
        .css("left", ww + "px");
      $(".m_slide>div")
        .eq(now)
        .animate({ left: -ww + "px" }, 1000);
      $(".m_bullet>li").removeClass("m_bullet_hover");
      $(".m_bullet>li").eq(bulletNumber).addClass("m_bullet_hover");
      $(".m_slide>div")
        .eq(bulletNumber)
        .animate({ left: "0px" }, 1000, function () {
          $(".m_slide>div")
            .not(":eq(" + bulletNumber + ")")
            .css("left", ww + "px");
        });
      now = bulletNumber;
    }
  });

  // 신메뉴 슬라이드

  $(".n_slide>div").not(":eq(0)").css("top", "-300px");

  clear2 = setInterval(new_slide, 3000);

  new_now = 0;
  new_imgs = 4;

  function new_slide() {
    new_now = new_now == new_imgs ? 0 : (new_now += 1);
    $(".n_slide>div")
      .eq(new_now - 1)
      .animate({ top: "300px" }, 1000);
    $(".n_slide>div")
      .eq(new_now)
      .animate({ top: "0px" }, 1000, function () {
        $(".n_slide>div")
          .not(":eq(" + new_now + ")")
          .css("top", "-300px");
      });
    $(".new_bullet>li").removeClass("new_bullet_hover");
    $(".new_bullet>li").eq(new_now).addClass("new_bullet_hover");
  }

  // 신메뉴- 버튼, 블릿기호 클릭시 자동 슬라이드 clear

  $(".new_bullet>li").click(function () {
    clearInterval(clear2);
  });

  // 신메뉴 블릿기호

  $(".new_bullet>li").click(function () {
    var new_bulletNumber = $(this).index();
    if (new_now == new_bulletNumber) return;
    else {
      $(".n_slide>div")
        .not(":eq(" + new_now + ")")
        .css("top", "-300px");
      $(".n_slide>div").eq(new_now).animate({ top: "300px" }, 1000);
      $(".new_bullet>li").removeClass("new_bullet_hover");
      $(".new_bullet>li").eq(new_bulletNumber).addClass("new_bullet_hover");
      $(".n_slide>div")
        .eq(new_bulletNumber)
        .animate({ top: "0px" }, 1000, function () {
          $(".n_slide>div")
            .not(":eq(" + new_bulletNumber + ")")
            .css("top", "-300px");
        });
      new_now = new_bulletNumber;
    }
  });

  // 베스트메뉴 슬라이드

  function bestmenu_next() {
    $(".best_slide>div>ul").animate({ left: "-320px" }, 800, function () {
      $(".best_slide>div>ul>li:first").appendTo(".best_slide>div>ul");
      $(".best_slide>div>ul").css("left", "0px");
    });
  }

  var clear1 = setInterval(bestmenu_next, 3000);

  $(".best_prev").click(function () {
    clearInterval(clear1);
    bestmenu_next();
    return false;
  });

  function bestmenu_prev() {
    $(".best_slide>div>ul>li:last").prependTo(".best_slide>div>ul");
    $(".best_slide>div>ul").css("left", "-320px");
    $(".best_slide>div>ul").animate({ left: "0px" }, 800);
  }

  $(".best_next").click(function () {
    clearInterval(clear1);
    bestmenu_prev();
    return false;
  });

  // 모든 메뉴 탭

  $(".best,.bred,.cookie").hide();

  $(".menu_tab>ul>li").click(function () {
    $(".subbanner").hide();
    $(".subbanner", this).show();
    $(".ff").removeClass("hovertab");
    $(".ff", this).addClass("hovertab");
  });
});
