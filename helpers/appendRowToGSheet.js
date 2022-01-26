"use strict";
const { google } = require("googleapis");
const path = require("path");
const config = require("../config.js");
const { AuthenticationFailedError } = require("./customErrors");

async function appendRowToGSheet(meetingId, participantEmail, joinTime) {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, config.GOOGLE_APPLICATION_CREDENTIALS),
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
  const client = await auth.getClient();

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: config.GOOGLE_ATTENDANCE_SHEET_ID,
    range: "A1",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[meetingId, participantEmail, joinTime]],
    },
  });
  console.log(res.data);
  return res.data;
}

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const authClient = await auth.fromAPIKey(config.GOOGLE_SHEETS_API_KEY);
  google.options({ auth: authClient });

  if (authClient == null) {
    throw new AuthenticationFailedError("AUTHENTICATION FAILED");
  }

  return authClient;
}

module.exports = {
  appendRowToGSheet,
};
