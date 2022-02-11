const request = require('supertest');
const { loggers } = require('winston');
const { app } = require('./app');
const config = require('./config');
const { appendRowToGSheet } = require('./helpers/appendRowToGSheet');
const { v4: uuidv4 } = require('uuid');

const logger = config.LOGGER;
jest.mock('./helpers/appendRowToGSheet', () => ({
  appendRowToGSheet: jest.fn().mockImplementation(() => {}),
}));

const successReqHeaders = { authorization: config.ZOOM_VERIFICATION_TOKEN };
const successEventType = config.ZOOM_EVENTS[0];
const successMeetingId = parseInt(config.MEETING_IDS[0]);
let mockRec = {
  event: successEventType,
  event_ts: 1626230691572,
  payload: {
    account_id: 'AAAAAABBBB',
    object: {
      id: successMeetingId,
      uuid: uuidv4(),
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

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /', () => {
  it('given a request', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
  });
});

describe('POST /', () => {
  it('responds status code 200 given correct request body', async () => {
    let tempMockRec = deepCopy(mockRec);

    const res = await request(app)
      .post('/')
      .set(successReqHeaders)
      .send(tempMockRec);

    expect(res.status).toBe(200);
    expect(appendRowToGSheet).toHaveBeenCalledTimes(1);
  });

  it('responds status code 422 given a null request body', async () => {
    let tempMockRec = deepCopy(mockRec);
    tempMockRec = null;

    const res = await request(app)
      .post('/')
      .set(successReqHeaders)
      .send(tempMockRec);

    expect(res.status).toBe(422);
    expect(appendRowToGSheet).toHaveBeenCalledTimes(0);
  });

  it('responds status code 422 given a null payload object', async () => {
    let tempMockRec = deepCopy(mockRec);
    tempMockRec.payload.object = null;

    const res = await request(app)
      .post('/')
      .set(successReqHeaders)
      .send(tempMockRec);

    expect(res.status).toBe(422);
    expect(appendRowToGSheet).toHaveBeenCalledTimes(0);
  });

  it('responds status code 422 given a null meetingId', async () => {
    let tempMockRec = deepCopy(mockRec);
    tempMockRec.payload.object.id = null;

    const res = await request(app)
      .post('/')
      .set(successReqHeaders)
      .send(tempMockRec);

    expect(res.status).toBe(422);
    expect(appendRowToGSheet).toHaveBeenCalledTimes(0);
  });

  it('responds status code 422 given a null participantEmail', async () => {
    let tempMockRec = deepCopy(mockRec);
    tempMockRec.payload.object.participant.email = null;

    const res = await request(app)
      .post('/')
      .set(successReqHeaders)
      .send(mockRec);

    expect(res.status).toBe(422);
    expect(appendRowToGSheet).toHaveBeenCalledTimes(0);
  });

  // body = JSON.parse(req.body);
  // meetingInfo = body.payload.object;
  // meetingId = meetingInfo.id;
  // participantEmail = meetingInfo.participant.email; <-- null/undefined
  // joinTime = meetingInfo.participant.join_time;
  // send BAD REQUEST 400

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
