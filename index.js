// buildin modules
const cluster = require("cluster");
const os = require("os");
// custom modules
const server = require("./server");
// cpu length
let cores_count = os.cpus().length;

// hosting server such as heroku uses WEB_CONCURRENCY to getch cores count
// for testing purposes, we'll use   1 core
let WORKERS = process.env.WEB_CONCURRENCY || 1 || cores_count;

if (cluster.isMaster) {
  for (var i = 0; i < WORKERS; i++) {
    cluster.fork();
  }
  cluster.on("online", () => {});
  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  server.run(cluster.worker.process.pid);
}
