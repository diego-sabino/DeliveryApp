const ErrorMap = {
  CREATE_USER_FAIL: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  ErrorMap,
  mapError,
};