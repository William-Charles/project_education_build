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

function createChallenge(formInfo) {
  let quiz = [];
  let challenge = {};

  challenge.name = formInfo.name;
  challenge.desc = formInfo.desc;
  challenge.notes = formInfo.notes;
  challenge.video = formInfo.video;
  challenge.mock = formInfo.mock;

  for (let i = 0; i < 5; i++) {
    let question = {};
    question.correct = formInfo[`right1-${i}`];
    question.incorrect1 = formInfo[`false1-${i}`];
    question.incorrect2 = formInfo[`false2-${i}`];
    question.incorrect3 = formInfo[`false3-${i}`];
    question.incorrect4 = formInfo[`false4-${i}`];
    quiz.push(question);
  }

  return challenge;
}

module.exports = {
  pullKings,
  pushKings,
  runKings,
  updateUserInfo,
  createChallenge
};
