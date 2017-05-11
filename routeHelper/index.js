function pullKings(users) {
  users.sort(function(userA, userB) {
    return userB.bestPull - userA.bestPull;
  });
  return users;
}
function pushKings(users) {
  users.sort(function(userA, userB) {
    return userB.bestPush - userA.bestPush;
  });
  return users;
}
function runKings(users) {
  users.sort(function(userA, userB) {
    return (
      userA.bestMin + userA.bestSec / 60 - (userB.bestMin + userB.bestSec / 60)
    );
  });
  return users.map(user => {
    if (user.bestMin === 99999) {
      user.bestMin = 0;
    }
    return user;
  });
}

function updateUserInfo(userInfo) {
  let updateObj = {};
  for (let key in userInfo) {
    if (userInfo[key] !== "") {
      updateObj[key] = userInfo[key];
    }
  }
  return { $set: updateObj };
}

module.exports = { pullKings, pushKings, runKings, updateUserInfo };
