const ErrorMap = {
  CREATE_USER_FAIL: 400,
};

const mapError = (type) => ErrorMap[type] || 500;

module.exports = {
  ErrorMap,
  mapError,
};