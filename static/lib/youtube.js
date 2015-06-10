// Load the youtube iframe api
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var lblStatus = document.getElementById("status");

var player;
function createPlayer(vid) {
  player = new YT.Player('player', {
    width:$(window).width,
    height:$(window).height,
    videoId: vid,
    events: {
      'onReady': onReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: { controls: 0, disablekb: 1, iv_load_policy: 3, showinfo: 0, modestbranding: 1, wmode: 'transparent' }
  });
}

onYouTubeIframeAPIReady = videoInit

function videoInit() {
  $.get( "/api/current", function(data) {
    console.log(data);
    if(data)
      createPlayer(data);
    else
      setTimeout(onYouTubeIframeAPIReady, 1000);
  })
}

function onReady(event) {
  event.target.playVideo(); 
}

function onPlayerStateChange(event) {
  if(event.data == 0)
    nextVideo();
}

function nextVideo() {
  $.get( "/api/advance", function(data) {
    console.log(data);
    $('#player').replaceWith(function() {
      return "<div id='player'></div>"
    });
    if(data)
      createPlayer(data);
    else
      setTimeout(videoInit, 1000);
  })
}

function parseTime(t) {
  var str = Math.floor(t/60) +":"+ ("0" + Math.floor(t%60)).slice(-2);
  return str;
}

function playPause() { 
  if (player.getPlayerState() == YT.PlayerState.PLAYING) 
    player.pauseVideo();
  else 
    player.playVideo();
} 

function seek(val) { 
  player.seekTo(player.getCurrentTime()+val, true)
}

function update() {
  setTimeout(update, 1000);
  if(player) {
    var t = player.getDuration();
    var c = player.getCurrentTime();
    lblStatus.innerHTML = parseTime(c)+"/"+parseTime(t);
    if (player.getPlayerState() == YT.PlayerState.BUFFERING) 
      lblStatus.innerHTML = "Buffering...";
  } else
    lblStatus.innerHTML = "Loading...";
}
update()
