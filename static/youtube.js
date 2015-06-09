// Load the youtube iframe api
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var lblStatus = document.getElementById("status");
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
  var t = player.getDuration();
  var c = player.getCurrentTime();
  lblStatus.innerHTML = parseTime(c)+"/"+parseTime(t);
  if (player.getPlayerState() == YT.PlayerState.BUFFERING) 
    lblStatus.innerHTML = "Buffering...";
}
update()
