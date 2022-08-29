//**** Internal Modules */
const http = require("http");
// external modules
const express = require("express");
const dotenv = require("dotenv");
const Routes = require("./routes");

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
    const server = http.createServer(app);
    await new Promise((resolve) => server.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`, pid);
    return { app };
  } catch (error) {
    console.log(error, "server error");
  }
}

exports.run = run;
