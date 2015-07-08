var http = require("http");
var path = require("path");
var express = require("express");
var WebSocketServer = require("ws").Server;

var app = express();
var server = http.createServer(app);
var wss = new WebSocketServer({server: server});
var helloMessage = {
    name: "System",
    message: "Hello!",
};

app.set("port", process.env.PORT || 8000);
app.set("view engine", "jade");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", function (req, res) {
  res.render("index", { title: "Chat System" });
});

wss.on("connection", function (socket) {
  socket.send(JSON.stringify(helloMessage));
  socket.on("message", function (msg) {
    wss.broadcast(escapeMessage(msg));
  });
});

wss.broadcast = function (data) {
    for (var i in this.clients){
        this.clients[i].send(data);
    }
};

function escapeMessage(msg) {
    return msg.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

server.listen(app.get("port"));

console.log("App running on port " + app.get("port"));
