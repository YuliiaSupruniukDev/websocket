let app = require("express")();
let http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
  });
  
io.on("connection", socket => {
  console.log("user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("sum", data  => {
    io.emit("message", { type: "sum", result:  data.first_num + data.second_num });
  });

  socket.on("sub", data  => {
    io.emit("message", { type: "sub", result:  data.first_num - data.second_num });
  });

  socket.on("mult", data  => {
    io.emit("message", { type: "mult", result:  data.first_num * data.second_num });
  });
});

http.listen(5000, () => {
  console.log("started on port 5000");
});
