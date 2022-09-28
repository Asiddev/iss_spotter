const { nextISSTimesForMyLocation } = require("./iss_promised");

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((data) => console.log(data));

const printDisplay = function (passTimes) {
  for (const singleTime of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(singleTime.risetime);
    const howLong = singleTime.duration;
    console.log(`Next pass at ${date} for ${howLong} seconds`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printDisplay(passTimes);
  })
  .catch((error) => {
    console.log("Hey we got a error here ", error.message);
  });
