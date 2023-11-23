const apiRoutePrefixer = (route) => {
  return `/api/v1${route}`;
};

module.exports = {
  apiRoutePrefixer,
};
