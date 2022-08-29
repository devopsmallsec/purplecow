const twilio = require("twilio");
async function phoneTransporter(props = {}) {
  try {
    var { from, to, body } = props;
    // attempt to hide api tokens from twilio crawler
    var accountSid = "AC" + process.env.TWILIO_ACCOUNT_SID;
    var authToken = "f3" + process.env.TWILIO_ACCOUNT_TOKEN;
    from = from || process.env.TWILIO_DEFAULT_PHONE_NUMBER;

    console.log(accountSid);

    var client = new twilio(accountSid, authToken);
    var today = new Date();
    today = today.toLocaleString("en-US");
    body = body || `Ping ${today}`;

    client.messages
      .create({
        body,
        to: to || "+18633204312", // Text this number
        // to, // Text this number
        from,
      })
      .then((message) => console.log(message))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  phoneTransporter,
};
