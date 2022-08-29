function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function UUID() {
  let raw_dict = "0123456789abcdefghijklmnopqrstuvwxyz";
  let dict = raw_dict.split("");
  let temp = [8, 4, 4, 4, 12];
  let output = [];
  temp.forEach((num) => {
    let val = "";
    while (val.length < num) {
      let location = getRandomInt(0, dict.length - 1);
      val += dict[location];
    }
    output.push(val);
  });
  return output.join("-");
}

module.exports = {
  UUID,
  getRandomInt,
};
