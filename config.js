const dotenv = require("dotenv");

dotenv.config();

const env = process.env.NODE_ENV || process.env.DEVELOPMENT;
let googlePrivateKey;

if (env === process.env.DEVELOPMENT) {
  googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;
} else {
  googlePrivateKey = JSON.parse(process.env.GOOGLE_PRIVATE_KEY);
}

module.exports = {
  PORT: process.env.PORT,
  ZOOM_VERIFICATION_TOKEN: process.env.ZOOM_VERIFICATION_TOKEN,
  GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
  GOOGLE_ATTENDANCE_SHEET_ID: process.env.GOOGLE_ATTENDANCE_SHEET_ID,
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  GOOGLE_ACCOUNT_TYPE: process.env.GOOGLE_ACCOUNT_TYPE,
  GOOGLE_PRIVATE_KEY: googlePrivateKey,
  ZOOM_EVENTS: process.env.ZOOM_EVENTS.split(","),
  MEETING_IDS: process.env.MEETING_IDS.split(","),
};
