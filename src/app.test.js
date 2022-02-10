const request = require('supertest');
const { app } = require('./app');
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

const nullBodyReq = null;

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
    const res = await request(app)
      .post('/')
      .set(successReqHeaders)
      .send(successReq);
    expect(res.status).toBe(200);
    expect(appendRowToGSheet).toHaveBeenCalledTimes(1);
  });

  it('responds status code 400 given a null request body', async () => {
    const res = await request(app)
      .post('/')
      .set(successReqHeaders)
      .send(nullBodyReq);
    expect(res.status).toBe(400);
    expect(appendRowToGSheet).toHaveBeenCalledTimes(0);
  });
});
