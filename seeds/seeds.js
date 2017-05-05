var faker = require("faker");

const imageArr = [
  "https://cdn.peopleewnetwork.com/dims4/default/c099240/2147483647/thumbnail/654x368/quality/90/?url=https%3A%2F%2Fcdn.peopleewnetwork.com%2Ffb%2F82%2F7f9cbd184a68a9a3adcc2fd1fa24%2Fthumb-peoplefeat-kellyripa.jpg",
  "http://dreamatico.com/data_images/people/people-2.jpg",
  "http://assets.nydailynews.com/polopoly_fs/1.2400213.1445017578!/img/httpImage/image.jpg_gen/derivatives/article_750/brandon15f-7-web.jpg",
  "http://piximus.net/media/20413/old-people-of-new-york-2.jpg",
  "https://piximus.net/media/27818/people-of-new-york-7.jpg",
  "https://laughingsquid.com/wp-content/uploads/tumblr_m82eawuTya1qggwnvo1_500.jpeg",
  "https://colmhogan.files.wordpress.com/2013/10/humansnyc4.jpg?w=768",
  "https://cdn.tutsplus.com/photo/uploads/legacy/732_streetportraits/1.jpg",
  "https://i2.wp.com/www.brainpickings.org/wp-content/uploads/2016/03/hony1.jpg?fit=600%2C315&ssl=1",
  "http://s3.amazonaws.com/media.wbur.org/wordpress/11/files/2014/10/1016_baby-batman.jpg",
  "http://www.nyphotoreview.com/PANPICS/Image3496c.jpg",
  "https://s-media-cache-ak0.pinimg.com/originals/8e/89/d8/8e89d84f945305f9bcfd9344e5dd2e13.jpg",
  "https://s.yimg.com/ny/api/res/1.2/6n_tVrMtTmWLTpFKmRWawg--/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://magazines.zenfs.com/resizer/original/c8i7VsJeMnWbFAxhtQ42KgrDfg8"
];

module.exports = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  function workoutGen() {
    const size = Math.floor(Math.random() * 25);
    let obj = {};
    workouts = [];
    let push = 0;
    let pull = 0;
    let min = 99999;
    let sec = 0;
    for (let i = 0; i < size; i++) {
      let workout = {
        push: Math.floor(Math.random() * 100),
        pull: Math.floor(Math.random() * 100),
        seconds: Math.floor(Math.random() * 59),
        minutes: Math.floor(Math.random() * 100),
        date: faker.date.past
      };
      workouts.push(workout);
      workout.run = workout.minutes + workout.seconds / 60;
      push = push < workout.push ? workout.push : push;
      pull = pull < workout.pull ? workout.pull : pull;
      if (workout.run < min + sec / 60) {
        min = workout.minutes;
        sec = workout.seconds;
      }
    }
    obj.workouts = workouts;
    obj.push = push;
    obj.pull = pull;
    obj.min = min;
    obj.sec = sec;
    return obj;
  }

  console.log("Creating Users");
  var users = [];
  for (let i = 0; i < 13; i++) {
    var workoutGenResults = workoutGen();
    let user = new User({
      fname: faker.name.firstName(),
      lname: faker.company.bsBuzz(),
      email: `${faker.company.bsBuzz()}${i}@gmail.com`,
      picture: imageArr[i],
      password: "demo",
      workouts: workoutGenResults.workouts,
      bestMin: workoutGenResults.min,
      bestSec: workoutGenResults.sec,
      bestPush: workoutGenResults.push,
      bestPull: workoutGenResults.pull
    });
    users.push(user);
  }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log("Saving...");
  var promises = [];
  [users].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
