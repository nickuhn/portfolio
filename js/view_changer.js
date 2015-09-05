$(document).ready(function(){
  $(".tab").on("click", function() {
    if (!$(this).hasClass("active")) {
      $(".active").removeClass("active");
      $(this).addClass("active");
      if ($(this).attr("id") === "show-front") {
        $("#front-end").addClass("active-box");
        $("#back-end").removeClass("active-box");
      } else {
        $("#front-end").removeClass("active-box");
        $("#back-end").addClass("active-box");
      }
    }
  });
});
