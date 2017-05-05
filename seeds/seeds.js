var faker = require("faker");
var voca = require("voca");

const imageArr = [];

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
        minutes: Math.floor(Math.random() * 59),
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
    return workouts;
  }

  console.log("Creating Users");
  var users = [];
  for (let i = 0; i < 13; i++) {
    let user = new User({
      fname: faker.name.firstName(),
      lname: faker.company.bsBuzz(),
      email: `${faker.company.bsBuzz()}${i}@gmail.com`,
      picture: imageArr[i],
      password: "demo",
      workouts: workoutGen()
    });
    users.push(user);
  }

  // ----------------------------------------
  // Hotels
  // ----------------------------------------
  console.log("Creating Hotels");
  var hotels = [];
  for (let i = 0; i < MULTIPLIER * 100; i++) {
    var hotel = new Hotel({
      name: randomLodgingName("hotel")
    });
    hotels.push(hotel);
  }

  // ----------------------------------------
  // Motels
  // ----------------------------------------
  console.log("Creating Motels");
  var motels = [];
  for (let i = 0; i < MULTIPLIER * 100; i++) {
    var motel = new Motel({
      name: randomLodgingName("motel")
    });
    motels.push(motel);
  }

  // ----------------------------------------
  // Ratings
  // ----------------------------------------
  console.log("Creating Ratings");
  var ratings = [];
  for (let i = 0; i < MULTIPLIER * 1000; i++) {
    var hotel = hotels[i % hotels.length];
    var motel = motels[i % motels.length];
    var user = users[1];
    var hotelRating = new Rating({
      ratable: hotel,
      user: user,
      value: randomRating()
    });
    var motelRating = new Rating({
      ratable: motel,
      user: user,
      value: randomRating()
    });
    hotel.ratings.push(hotelRating);
    motel.ratings.push(motelRating);
    ratings.push(hotelRating);
    ratings.push(motelRating);
  }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log("Saving...");
  var promises = [];
  [users, hotels, motels, ratings].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
