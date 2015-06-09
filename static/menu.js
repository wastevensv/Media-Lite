var socket = io();

function navdown() {
  var current = $(".active"); // Find active menu item.
  current.removeClass("active");
  
  if( current.attr("id") === "last") { // Find the previous item.
    var next = $(".menu-option:first");
  } else {
    var next = current.next("li.menu-option");
  }
  
  next.addClass("active"); // Previous item is now active item.
}
function navup() {
  var current = $(".active"); // Find active menu item.
  current.removeClass("active");
  
  if( current.attr("id") === "first") { // Find the previous item.
    var prev = $(".menu-option:last");
  } else {
    var prev = current.prev("li.menu-option");
  }
  
  prev.addClass("active"); // Previous item is now active item.
}
function select() {
  var current = $(".active > a"); // Find link within active menu item.
  window.location.href = current.attr("href"); // Execute command.
}
$(document).ready(function() {
  $(".menu-option:first").attr("id", "first");
  if(!$(".active")[0])
    $("#first").addClass("active");
  $(".menu-option:last").attr("id", "last");
});
$(document).keydown( function(event) {
  event.stopPropagation();
  if(event.which == 38) { // Up Key
    navup();
  } else if(event.which == 40) { //  Down Key
    navdown();
  } else if(event.which == 32) { // Space Key
    select();
  }
})
socket.on('nav',function(data) {
  if(data == 0) {
    select()
  } else if(data >= 0) {
    navup()
  } else {
    navdown()
  }
})