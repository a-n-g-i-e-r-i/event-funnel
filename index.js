const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config");

app.use(express.static("./index.js"));

app.get("/", (req, res) => {
  res.send("REQUEST RECEIVED");
});

app.post("/", bodyParser.raw({ type: "application/json" }), (req, res) => {
  let body;

  try {
    body = JSON.parse(req.body);
    if (body.event !== config.ZOOM_PARTICIPANT_JOINED_EVENT) {
      throw new Error(
        `EVENT IS NOT OF TYPE: ${config.ZOOM_PARTICIPANT_JOINED_EVENT}`
      );
    }
  } catch (e) {
    res.status(400).send(`BAD REQUEST: ${e.message}`);
  }

  if (req.headers.authorization === config.ZOOM_VERIFICATION_TOKEN) {
    res.status(200);

    const meetingInfo = body.payload.object;
    const meetingId = meetingInfo.id;
    const participantEmail = meetingInfo.participant.email;
    const joinTime = meetingInfo.participant.join_time;

    console.log(
      `\nPARTICIPANT JOINED\n
      MEETING ID: ${meetingId}\n
      PARTICIPANT EMAIL: ${participantEmail}\n
      JOIN TIME: ${joinTime}`
    );

    res.send("SUCCESS");
  } else {
    res.status(403).end("FORBIDDEN");
    console.log("INVALID POST REQUEST");
  }
});

app.listen(config.PORT, () => {
  console.log(`SERVER IS RUNNING ON ${config.PORT}`);
});
