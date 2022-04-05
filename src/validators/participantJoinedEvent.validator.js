const Joi = require('joi');

const participant = Joi.object({
  user_id: Joi.string().required(),
  user_name: Joi.string().required(),
  id: Joi.string().required(),
  join_time: Joi.string().required(),
  email: Joi.string().email().required(),
  registrant_id: Joi.string().required(),
  participant_user_id: Joi.string().required(),
}).required();

const object = Joi.object({
  id: Joi.number().integer().required(),
  uuid: Joi.string().uuid().required(),
  host_id: Joi.string().required(),
  topic: Joi.string().required(),
  type: Joi.number().integer().required(),
  start_time: Joi.string().required(),
  timezone: Joi.string().required(),
  duration: Joi.number().integer().required(),
  participant: participant,
}).required();

const payload = Joi.object({
  account_id: Joi.string().required(),
  object: object,
}).required();

const participantJoinedEvent = Joi.object({
  event: Joi.string().required(),
  event_ts: Joi.date().timestamp().required(),
  payload: payload,
});

module.exports = participantJoinedEvent;
