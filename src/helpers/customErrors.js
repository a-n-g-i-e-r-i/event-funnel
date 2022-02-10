class UnprocessableEntityError extends Error {
  constructor(message) {
    super(message);

    this.name = "UnprocessableEntityError";
  }
}

class UnauthorizedRequestError extends Error {
  constructor(message) {
    super(message);

    this.name = "UnauthorizedRequestError";
  }
}

class AuthenticationFailedError extends Error {
  constructor(message) {
    super(message);

    this.name = "AuthenticationFailedError";
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);

    this.name = "InternalServerError";
  }
}

module.exports = {
  UnprocessableEntityError,
  UnauthorizedRequestError,
  AuthenticationFailedError,
  InternalServerError,
};
