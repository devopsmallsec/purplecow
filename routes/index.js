//automated routes dictionaries.
// this is essential in order to build a gui system.
// gui system will write to file and change and modified routes
const route = require("./dict");

function run(app) {
  // automate routes here
  let entries = Object.keys(route.dict);
  entries.forEach((folder) => {
    route.dict[folder].forEach((route) => {
      app.use(
        `/${route.type || "api"}/${route.prefix || route.file}`,
        require(`./${folder}/${route.file}`)
      );
    });
  });
}

exports.run = run;
