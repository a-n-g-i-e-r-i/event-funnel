'use strict';
const { google } = require('googleapis');
const config = require('../config.js');

const logger = config.LOGGER;

const appendRowToGSheet = async (meetingId, participantEmail, joinTime) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: config.GOOGLE_CLIENT_EMAIL,
      private_key: config.GOOGLE_PRIVATE_KEY,
      type: config.GOOGLE_ACCOUNT_TYPE,
    },
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  const client = await auth.getClient();

  const sheets = google.sheets({
    version: 'v4',
    auth: client,
  });

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: config.GOOGLE_ATTENDANCE_SHEET_ID,
    range: 'A1',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[meetingId, participantEmail, joinTime]],
    },
  });
  logger.info(res.data);
  return res.data;
};

module.exports = {
  appendRowToGSheet,
};
