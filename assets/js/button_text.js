$(document).ready(function(){
  $("#about-aside").on("hide.bs.collapse", function(){
    $(".btn").html('More...');
  });
  $("#about-aside").on("show.bs.collapse", function(){
    $(".btn").html('Less...');
  });
});
