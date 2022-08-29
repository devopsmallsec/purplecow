//**** Internal Modules */
const http = require("http");
// external modules
const express = require("express");
const dotenv = require("dotenv");
const Routes = require("./routes");
const Socket = require("./socket");

// init env variables
dotenv.config();
// init express
const app = express();

async function run(pid) {
  try {
    // to parse json object in body
    app.use(express.json({ extended: false }));
    // initialize routes
    Routes.run(app);

    // get the port number or set to default
    const PORT = process.env.PORT || 3000;

    // via http server instead of express for:
    // - with other servers such as websocket && graphql
    const httpServer = http.createServer(app);
    // my example of running socket with restful api
    Socket.run({ httpServer, app });

    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`, pid);
    return { app };
  } catch (error) {
    console.log(error, "server error");
  }
}

exports.run = run;
