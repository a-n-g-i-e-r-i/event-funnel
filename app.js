const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const { appendRowToGSheet } = require('./helpers/appendRowToGSheet');
const {
  UnprocessableEntityError,
  UnauthorizedRequestError,
  InternalServerError,
} = require('./helpers/customErrors');

app.use(express.static('./app.js'));

app.get('/', (req, res) => {
  res.send('REQUEST RECEIVED');
});

app.post('/', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  let body;
  let meetingInfo;
  let meetingId;
  let participantEmail;
  let joinTime;

  try {
    body = JSON.parse(req.body);
    meetingInfo = body.payload.object;
    meetingId = meetingInfo.id;
    participantEmail = meetingInfo.participant.email;
    joinTime = meetingInfo.participant.date_time;

    if (!config.ZOOM_EVENTS.includes(`${body.event}`)) {
      throw new UnprocessableEntityError(
        `EVENT TYPE IS NOT SUPPORTED: ${body.event}`
      );
    } else if (config.MEETING_IDS.includes(`${meetingId}`) === false) {
      throw new UnprocessableEntityError(
        `MEETING ID IS NOT SUPPORTED: ${meetingId}`
      );
    } else if (!req.headers.authorization === config.ZOOM_VERIFICATION_TOKEN) {
      throw new UnauthorizedRequestError('UNAUTHORIZED POST REQUEST');
    } else {
      try {
        appendRowToGSheet(meetingId, joinTime, participantEmail);
        res.status(200).send('SUCCESS');
        console.log(
          `\nSUCCESS: PARTICIPANT DATA APPENDED TO GOOGLE SHEET:\n
        MEETING ID: ${meetingId}\n
        PARTICIPANT EMAIL: ${participantEmail}\n
        JOIN TIME: ${joinTime}`
        );
      } catch (e) {
        throw e;
      }
    }
  } catch (e) {
    if (e instanceof UnauthorizedRequestError) {
      const m = `FORBIDDEN: ${e.message}`;
      res.status(403).send(m);
      console.log(m);
    } else if (e instanceof UnprocessableEntityError) {
      const m = `UNPROCESSABLE ENTITY: ${e.message}`;
      res.status(422).send(m);
      console.log(m);
    } else if (e instanceof InternalServerError) {
      const m = 'INTERNAL SERVER ERROR';
      res.status(500).send(m);
      console.log(m, e.message);
    } else {
      const m = `BAD REQUEST: ${e.message}`;
      res.status(400).send(m);
      console.log(m);
    }
  }
});

module.exports = {
  app,
};
