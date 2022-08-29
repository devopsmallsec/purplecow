//**** Internal Modules */
const http = require("http");
const { AsyncLocalStorage } = require("async_hooks");
// external modules
const express = require("express");
const dotenv = require("dotenv");
const Routes = require("./routes");
const Socket = require("./socket");
const LesDB = require("./db/LesDB");

const asyncLocalStorage = new AsyncLocalStorage();

// init env variables
dotenv.config();
// init express
const app = express();

async function run(pid) {
  try {
    // to parse json object in body
    app.use(express.json({ extended: false }));

    // app.use(requestIdMiddleware);
    // initialize routes
    Routes.run(app);
    app.get("/items/list/", (req, res) => {
      asyncLocalStorage.run(new Map(), () => {
        asyncLocalStorage.getStore().set("db", { items: [] });
        next();
      });
    });
    app.post("/items/create", (req, res) => {
      let payload = {
        ...req.body,
      };
      const db = asyncLocalStorage.getStore().get("db");
      db.items.push(payload);
      asyncLocalStorage.getStore().set("db", db);

      res.send(payload);
    });

    // get the port number or set to default
    const PORT = process.env.PORT || 3000;

    // via http server instead of express for:
    // - with other servers such as websocket && graphql
    const httpServer = http.createServer(app);
    Socket.run({ httpServer, app });

    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`, pid);
    return { app };
  } catch (error) {
    console.log(error, "server error");
  }
}

exports.run = run;
