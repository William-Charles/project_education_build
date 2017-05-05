function authPath(value) {
  value = value.toLowerCase();
  return `/auth/${value}`;
}

function authPathDelete(value) {
  value = value.toLowerCase();
  return `/auth/${value}/delete`;
}

module.exports = { authPath, authPathDelete };
