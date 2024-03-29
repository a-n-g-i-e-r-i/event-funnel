const dotenv = require('dotenv');
const winston = require('winston');

dotenv.config();

const env = process.env.NODE_ENV || process.env.DEVELOPMENT;
let googlePrivateKey;
let logLevel;

if (env === process.env.DEVELOPMENT || env === process.env.TEST) {
  googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;
  logLevel = 'silly';
} else {
  googlePrivateKey = JSON.parse(process.env.GOOGLE_PRIVATE_KEY);
  logLevel = 'info';
}

module.exports = {
  LOGGER: winston.createLogger({
    transports: [new winston.transports.Console({ level: logLevel })],
  }),
  PORT: process.env.PORT,
  ZOOM_VERIFICATION_TOKEN: process.env.ZOOM_VERIFICATION_TOKEN,
  GOOGLE_SHEETS_API_KEY: process.env.GOOGLE_SHEETS_API_KEY,
  GOOGLE_ATTENDANCE_SHEET_ID: process.env.GOOGLE_ATTENDANCE_SHEET_ID,
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  GOOGLE_ACCOUNT_TYPE: process.env.GOOGLE_ACCOUNT_TYPE,
  GOOGLE_PRIVATE_KEY: googlePrivateKey,
  ZOOM_EVENTS: process.env.ZOOM_EVENTS.split(','),
  MEETING_IDS: process.env.MEETING_IDS.split(','),
};
