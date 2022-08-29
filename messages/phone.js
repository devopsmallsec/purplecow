const twilio = require("twilio");
async function phoneTransporter(props = {}) {
  try {
    var { from, to, body } = props;
    var accountSid = process.env.TWILIO_ACCOUNT_SID;
    var authToken = process.env.TWILIO_ACCOUNT_TOKEN;
    from = from || process.env.TWILIO_DEFAULT_PHONE_NUMBER;

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
      .then((message) => message)
      .catch((err) => err);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  phoneTransporter,
};
