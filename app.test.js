const { app } = require('./app');
const request = require('supertest');
const config = require('./config');
const { appendRowToGSheet } = require('./helpers/appendRowToGSheet');
jest.mock('./helpers/appendRowToGSheet', () => ({
  appendRowToGSheet: jest.fn().mockImplementation(() => {}),
}));

const successReqHeaders = { authorization: config.ZOOM_VERIFICATION_TOKEN };
const successEventType = config.ZOOM_EVENTS[0];
const successMeetingId = config.MEETING_IDS[0];

const successReq = {
  event: successEventType,
  event_ts: 1626230691572,
  payload: {
    account_id: 'AAAAAABBBB',
    object: {
      id: successMeetingId,
      uuid: '4444AAAiAAAAAiAiAiiAii==',
      host_id: 'x1yCzABCDEfg23HiJKl4mN',
      topic: 'Test Meeting',
      type: 8,
      start_time: '2021-07-13T21:44:51Z',
      timezone: 'America/New_York',
      duration: 60,
      participant: {
        user_id: '1234567890',
        user_name: 'TestUser',
        id: 'iFxeBPYun6SAiWUzBcEkX',
        date_time: '2021-07-13T21:44:51Z',
        email: 'test.user@test.com',
        registrant_id: 'abcdefghij0-klmnopq23456',
        participant_user_id: 'rstuvwxyza789-cde',
      },
    },
  },
};

describe('GET /', () => {
  it('given a request', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
  });
});

describe('POST /', () => {
  describe('given a request body', () => {
    it('should respond with 200 status code', async () => {
      const res = await request(app)
        .post('/')
        .set(successReqHeaders)
        .send(successReq);
      expect(res.status).toBe(200);
      expect(appendRowToGSheet).toHaveBeenCalledTimes(1);
    });
  });

  // describe("when request body is null or undefined", () => {
  //   // body = JSON.parse(req.body); <-- null/undefined
  //   // meetingInfo = body.payload.object;
  //   // meetingId = meetingInfo.id;
  //   // participantEmail = meetingInfo.participant.email;
  //   // joinTime = meetingInfo.participant.join_time;
  //   // send BAD REQUEST 400
  // });

  // describe("when request body object is null/undefined", () => {
  //   // body = JSON.parse(req.body);
  //   // meetingInfo = body.payload.object; <-- null/undefined
  //   // meetingId = meetingInfo.id;
  //   // participantEmail = meetingInfo.participant.email;
  //   // joinTime = meetingInfo.participant.join_time;
  //   // send BAD REQUEST 400
  // });

  // describe("when meetingId is null/undefined", () => {
  //   // body = JSON.parse(req.body);
  //   // meetingInfo = body.payload.object;
  //   // meetingId = meetingInfo.id; <-- null/undefined
  //   // participantEmail = meetingInfo.participant.email;
  //   // joinTime = meetingInfo.participant.join_time;
  //   // send BAD REQUEST 400
  // });

  // describe("when participantEmail is null/undefined", () => {
  //   // body = JSON.parse(req.body);
  //   // meetingInfo = body.payload.object;
  //   // meetingId = meetingInfo.id;
  //   // participantEmail = meetingInfo.participant.email; <-- null/undefined
  //   // joinTime = meetingInfo.participant.join_time;
  //   // send BAD REQUEST 400
  // });

  // describe("when joinTime is null/undefined", () => {
  //   // body = JSON.parse(req.body);
  //   // meetingInfo = body.payload.object;
  //   // meetingId = meetingInfo.id;
  //   // participantEmail = meetingInfo.participant.email;
  //   // joinTime = meetingInfo.participant.join_time; <-- null/undefined
  //   // send BAD REQUEST 400
  // });

  // describe("when ZOOM_EVENTS includes event", () => {
  //   // should appendRowToGSheet (mock this)
  //   // send SUCCESS 200
  // });

  // describe("when ZOOM_EVENTS does not include event", () => {
  //   // throw new UnprocessableEntityError(
  //   //   `EVENT TYPE IS NOT SUPPORTED: ${body.event}`
  //   // );
  //   // send UNPROCESSABLE ENTITY 422
  // });

  // describe("when MEETING_IDS includes event meeting_id", () => {
  //   // should appendRowToGSheet (mock this)
  //   // send SUCCESS 200
  // });

  // describe("when MEETING_IDS does not include event meeting_id", () => {
  //   // throw new UnprocessableEntityError(
  //   //   `MEETING ID IS NOT SUPPORTED: ${meetingId}`
  //   // );
  //   // send UNPROCESSABLE ENTITY 422
  // });

  // describe("when request auth header equals ZOOM_VERIFICATION_TOKEN", () => {
  //   // should appendRowToGSheet (mock this)
  //   // send SUCCESS 200
  // });

  // describe("when request auth header does not equal ZOOM_VERIFICATION_TOKEN", () => {
  //   // throw new UnauthorizedRequestError("UNAUTHORIZED POST REQUEST");
  //   // send FORBIDDEN 403
  // });
});
