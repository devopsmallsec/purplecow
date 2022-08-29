const ping = require("./ping");

let dict = {
  ping,
};

const template = (dict_key, data = {}) => {
  let output = dict[dict_key];
  return output;
};

module.exports = { template };
