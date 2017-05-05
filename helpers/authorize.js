function authPath(value) {
  value = value.toLowerCase();
  return `/auth/${value}`;
}

module.exports = { authPath };
