const errorParser = (error) => {
  const DEFAULT_ERROR = "An error occured";
  if (error instanceof Error) {
    return error.message;
  }
  return DEFAULT_ERROR;
};

module.exports = {
  errorParser,
};
