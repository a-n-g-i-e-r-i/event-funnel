const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  ZOOM_VERIFICATION_TOKEN: process.env.ZOOM_VERIFICATION_TOKEN,
  GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
  GOOGLE_ATTENDANCE_SHEET_ID: process.env.GOOGLE_ATTENDANCE_SHEET_ID,
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  GOOGLE_ACCOUNT_TYPE: process.env.GOOGLE_ACCOUNT_TYPE,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
  ZOOM_EVENTS: process.env.ZOOM_EVENTS.split(","),
  MEETING_IDS: process.env.MEETING_IDS.split(","),
};
