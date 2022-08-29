const express = require("express");
const router = express.Router();
let { AsyncLocalStorage } = require("async_hooks");
const { UUID } = require("../../utils/agent");
const asyncLocalStorage = new AsyncLocalStorage();
const webapp = require("../../app");

// initialized db
// todo: finish async_hooks and use async_hooks via express middleware
let db = [];

const query = (db, config = {}) => {
  let filter = config.filter || {};
  let query_entries = Object.entries(filter);
  let filtered = db.filter((item) => {
    let found = item;
    query_entries.forEach((entry) => {
      if (item[entry[0]] != entry[1]) {
        found = false;
      }
    });

    return found;
  });
  let output;
  if (!config.limit) {
    output = filtered;
  } else if (config.limit == 1) {
    output = filtered[0];
  } else if (config.limit > 1) {
    if (filtered.length > config.limit) {
      output = filtered.slice(0, config.limit);
    } else {
      output = filtered;
    }
  }

  return output;
};

const saveItem = async (body) => {
  let db = asyncLocalStorage.getStore();
  let _id = await UUID();
  let payload = {
    ...body,
    _id,
  };
  db.push(payload);
  let output = db;

  return output;
};

const readItem = async (q = {}) => {
  let db = asyncLocalStorage.getStore();
  let found_item = query(db, { filter: q, limit: 1 });
  let output = found_item;

  return output;
};

const listItems = (q, limit) => {
  let db = asyncLocalStorage.getStore();
  let list_items = query(db, { filter: q, limit });
  let output = list_items;

  return output;
};

const dropItem = async (q) => {
  let db = asyncLocalStorage.getStore();
  let list_items = query(db, { filter: q });
  let output = db.filter((item) => {
    let foundItem = list_items.find((from_list) => from_list._id == item._id);
    return !foundItem && item;
  });
  db = output;

  return output;
};
router.post(`/create`, async (req, res) => {
  try {
    let body = req.body;
    // base on requirement: error if no name
    // id will be assigned
    if (!body.name) {
      throw { status: 401, message: "Name is required" };
    }
    let output = await asyncLocalStorage.run(
      db,
      async () => await saveItem(req.body)
    );
    res.send(output);
  } catch (error) {
    console.log(error);
    res.status(error.status || 501).send(error.message || "Server Error");
  }
});

router.get(`/list`, async (req, res) => {
  try {
    let query = req.query;
    let limit = req.query.limit;
    delete query.limit;

    let output = await asyncLocalStorage.run(
      db,
      async () => await listItems(req.query, limit)
    );
    res.send(output);
  } catch (error) {
    console.log(error);
    res.status(501).send("Server Error");
  }
});

router.get(`/read/`, async (req, res) => {
  try {
    let output = await asyncLocalStorage.run(
      db,
      async () => await readItem(req.query, "find")
    );
    res.send(output);
  } catch (error) {
    console.log(error);
    res.status(501).send("Server Error");
  }
});

router.delete(`/drop`, async (req, res) => {
  try {
    let output = await asyncLocalStorage.run(
      db,
      async () => await dropItem(req.body)
    );
    db = output;
    res.send(output);
  } catch (error) {
    console.log(error);
    res.status(501).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  let list = await asyncLocalStorage.run(
    db,
    async () => await listItems(req.query)
  );
  res.send(webapp.List(list));
});

module.exports = router;
