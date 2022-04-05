class UnprocessableEntityError extends Error {
  constructor(message) {
    super(message);

    this.name = 'UnprocessableEntityError';
    this.status = 422;
  }
}

class UnauthorizedRequestError extends Error {
  constructor(message) {
    super(message);

    this.name = 'UnauthorizedRequestError';
    this.status = 403;
  }
}

class InternalServerError extends Error {
  constructor() {
    this.name = 'InternalServerError';
    this.status = 500;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.name = 'BadRequestError';
    this.status = 400;
  }
}

module.exports = {
  UnprocessableEntityError,
  UnauthorizedRequestError,
  InternalServerError,
  BadRequestError,
};
