const { Server } = require("socket.io");

const run = ({ httpServer }) => {
  const io = new Server(httpServer);
  // testing connections
  io.on("connection", async (socket) => {});
};

exports.run = run;
