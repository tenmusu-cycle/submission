$(function () {
//PCヘッダー
  $(".pc_header .gnav_btn").on("click", function (){
    $(".pc_header .gnav_content").addClass("active");
  });
  $(
    ".pc_header .gnav_content .close , .pc_header .gnav_content .bg"
  ).on("click", function () {
    $(".pc_header .gnav_content").removeClass("active");
  });
//スマホヘッダー
  $(".sp_header .gnav_btn").on("click", function () {
    $(".sp_header .gnav_content").addClass("active");
  });
  $(".sp_header .gnav_content .close , .sp_header .gnav_content .bg"
  ).on("click", function () {
    $(".sp_header .gnav_content").removeClass("active");
  });
});





    jQuery(function ($) {
        $('.accordion .title').on('click', function () {
            $(this).next().slideToggle(200);
            $(this).toggleClass('open', 200);
        });
    });