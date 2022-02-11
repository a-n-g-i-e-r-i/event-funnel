const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const { appendRowToGSheet } = require('./helpers/appendRowToGSheet');
const {
  UnprocessableEntityError,
  UnauthorizedRequestError,
  InternalServerError,
  BadRequestError,
} = require('./helpers/customErrors');
const Validator = require('./middlewares/Validator');

const app = express();
const logger = config.LOGGER;
app.use(express.static('./app.js'));
app.use(bodyParser.json());
app.use((e, req, res, next) => {
  res.status(e.status || 500).send(e.message);
});

app.get('/', (req, res, next) => {
  res.send('REQUEST RECEIVED');
});

app.post('/', Validator('participantJoinedEvent'), (req, res, next) => {
  let body = req.body;
  let meetingInfo = body.payload.object;
  let meetingId = meetingInfo.id;
  let participantEmail = meetingInfo.participant.email;
  let joinTime = meetingInfo.participant.date_time;

  try {
    if (!config.ZOOM_EVENTS.includes(`${body.event}`)) {
      throw new UnprocessableEntityError(
        `EVENT TYPE IS NOT SUPPORTED: ${body.event}`,
      );
    } else if (config.MEETING_IDS.includes(`${meetingId}`) === false) {
      throw new UnprocessableEntityError(
        `MEETING ID IS NOT SUPPORTED: ${meetingId}`,
      );
    } else if (!req.headers.authorization === config.ZOOM_VERIFICATION_TOKEN) {
      throw new UnauthorizedRequestError('UNAUTHORIZED POST REQUEST');
    } else {
      appendRowToGSheet(meetingId, joinTime, participantEmail);
      res.status(200).send('SUCCESS');
    }
  } catch (e) {
    if (e instanceof UnauthorizedRequestError) {
      const m = `FORBIDDEN: ${e.message}`;
      logger.warn(m, e.status);
      res.status(e.status).send(m);
    } else if (e instanceof UnprocessableEntityError) {
      const m = `UNPROCESSABLE ENTITY: ${e.message}`;
      logger.warn(m, e.status);
      res.status(e.status).send(m);
    } else {
      logger.warn(e.message, e.status);
      e = new InternalServerError();
      res.status(e.status).send();
    }
  }
});

module.exports = {
  app,
};
