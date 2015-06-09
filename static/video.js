var myVideo = document.getElementById("player"); 
var lblStatus = document.getElementById("status");

function parseTime(t) {
  var str = Math.floor(t/60) +":"+ ("0" + Math.floor(t%60)).slice(-2);
  return str;
}

function playPause() { 
  if (myVideo.paused) 
    myVideo.play(); 
  else 
    myVideo.pause();
} 

function seek(val) { 
  myVideo.currentTime += val;
}

function update() {
  var t = myVideo.duration;
  var c = myVideo.currentTime;
  lblStatus.innerHTML = parseTime(c)+"/"+parseTime(t);
}

function buffering() {
  lblStatus.innerHTML = "Buffering...";
}