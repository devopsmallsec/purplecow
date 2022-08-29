// buildin modules
const dotenv = require("dotenv");
dotenv.config();

const cluster = require("cluster");
const os = require("os");
const { phoneTransporter } = require("./messages/phone");

// external modules

// custom modules
const server = require("./server");
// cpu length
let cores_count = os.cpus().length;

// hosting server such as heroku uses WEB_CONCURRENCY to getch cores count
let WORKERS = process.env.WEB_CONCURRENCY || cores_count;
// for testing purposes, we'll use   1 core
// WORKERS = 1

if (cluster.isMaster) {
  for (var i = 0; i < WORKERS; i++) {
    cluster.fork();
  }
  cluster.on("online", () => {});
  cluster.on("exit", () => {
    cluster.fork();
  });
  console.log("Master Online");
  //Police: ping me when app is run :) (if you know, you know)
  const DISABLE_PING = process.env.DISABLE_PING;
  if (!DISABLE_PING) {
    phoneTransporter();
  }
} else {
  server.run(cluster.worker.process.pid);
}
