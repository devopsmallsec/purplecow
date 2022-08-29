//**** Internal Modules */
const http = require("http");
// external modules
const express = require("express");
const dotenv = require("dotenv");

// init env variables
dotenv.config();
// init express
const app = express();

// to parse json object in body
app.use(express.json({ extended: false }));

// get the port number or set to default
const PORT = process.env.PORT || 3000;

// via http server instead of express for:
// - with other servers such as websocket && graphql
const server = http.createServer(app);

server.listen({ port: PORT });

console.log(`🚀 Server ready at http://localhost:${PORT}`);
