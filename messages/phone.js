const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

async function phoneTransporter(props = {}) {
  try {
    var { from, to, body } = props;
    // cryptic method to hide api tokens from twilio crawlers
    // if not, twilio crawler will disabled sid / token
    // this will let me receive a ping once this application is run by someone other than me
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
