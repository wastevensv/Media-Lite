function collapseQueue() {
    var $collapse = $("#queue-container");
    $collapse.collapse('toggle');
    refreshQueue();
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() {
  gapi.client.setApiKey('AIzaSyChUnKkfU27FX8Qz01DXQIP91RpkQz0Zbw');
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}

$("#query").keypress(function(event){
  if(event.keyCode == 13){
    event.preventDefault();
    $("#search-button").click();
  }
});


// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  refreshQueue();
  $('#search-button').attr('disabled', false);
}

function refreshQueue() {
 $.getJSON("/api/",function(queue){
   $('#queue-container').html("")
   for (var video in queue) {
     var video = queue[video]
     console.log(video)
     var request = gapi.client.youtube.videos.list({
         id: video,
         part: 'snippet',
         type: 'video'
    });

     request.execute(function(response) {
       $.each( response.result.items, function( i, val ) {
         $('#queue-container').append('<div class="video-result"></div>');
         var container = $('#queue-container .video-result:last');
         container.append('<h2>'+val.snippet.title+'</h2>');
         container.append('<div class="video-info"></div>')
         var info = container.children(".video-info")
         info.append('<img class="video-thumbnail" src="'+val.snippet.thumbnails.default.url+'"/>');
         info.append(val.snippet.channelTitle);
      });
    });
  }
 });
}

function collapseSearch() {
    var $collapse = $("#search-container");
    $collapse.collapse('toggle');
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    type: 'video',
    maxResults: 10
  });

  request.execute(function(response) {
    $('#search-container').html("")
    $.each( response.result.items, function( i, val ) {
      $('#search-container').append('<div class="video-result"></div>');
      var container = $('#search-container .video-result:last');
      container.append('<h2><a onclick="addVideo(\''+val.id.videoId+'\')">'+val.snippet.title+'</a></h2>');
      container.append('<div class="video-info"></div>')
      var info = container.children(".video-info")
      info.append('<img class="video-thumbnail" src="'+val.snippet.thumbnails.default.url+'"/>');
      info.append(val.snippet.description);
    });
  });
  var $collapse = $("#search-container");
  $collapse.collapse('show');
}

function addVideo(vid) {
 $.ajax({
   url: "/api/add",
   type: 'POST',
   contentType:'application/json',
   data: JSON.stringify({'data':vid}),
   dataType:'json'
  });
  refreshQueue();
}
