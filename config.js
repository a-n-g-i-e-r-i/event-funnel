const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  ZOOM_VERIFICATION_TOKEN: process.env.ZOOM_VERIFICATION_TOKEN,
  PORT: process.env.PORT,
  ZOOM_PARTICIPANT_JOINED_EVENT: process.env.ZOOM_PARTICIPANT_JOINED_EVENT,
  CLASS_MEETING_ID_8_3: process.env.CLASS_MEETING_ID_8_3,
};
