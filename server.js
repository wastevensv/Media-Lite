// Express setup
var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('view engine', 'ejs');  

// HTML Routes

app.get('/', function(req,res) {
  res.render('layout', { title:'The index page' })
});

// API Routes
var channels = new Object();

app.get("/api/:id/", function(req,res) {
  if(channels[req.params.id] === undefined) {
    res.send("Invalid ID");
    return
  }
  res.send(channels[req.params.id]);
});
app.get("/api/:id/current", function(req,res) {
  if(channels[req.params.id] === undefined) {
    res.send("Invalid ID");
    return
  }
  res.send(channels[req.params.id][0]);
});

app.post("/api/:id/add", function(req,res) {
  if(channels[req.params.id] === undefined)
    channels[req.params.id] = new Array()
  channels[req.params.id].push(req.body.data);
  res.send(req.body.data);
});
app.post("/api/:id/set", function(req,res) {
  if(channels[req.params.id] === undefined)
    channels[req.params.id] = new Array()
  channels[req.params.id] = req.body;
  res.send(req.body);
});

app.get("/api/:id/rotate", function(req,res) {
  if(channels[req.params.id] === undefined) {
    res.send("Invalid ID");
    return
  }
  channels[req.params.id].push(channels[req.params.id].shift());
  res.send(channels[req.params.id][0]);
});
app.get("/api/:id/advance", function(req,res) {
  if(channels[req.params.id] === undefined) {
    res.send("Invalid ID");
    return
  }
  channels[req.params.id].shift();
  res.send(channels[req.params.id][0]);
});

// Start Server
app.listen(3000, function() {
  console.log("listening on http://*:3000")
});
