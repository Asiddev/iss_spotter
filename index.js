const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//   }

//   console.log("It worked! Returned IP:", ip);

//   fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }

//     console.log("It worked! Returned coordinates:", coordinates);

//     fetchISSFlyOverTimes(coordinates, (error, flights) => {
//       if (error) {
//         console.log("It didn't work!", error);
//         return;
//       }

//       console.log("It worked! Returned flights:", flights);

//       nextISSTimesForMyLocation((error, flights) => {
//         if (error) {
//           return console.log("It didn't work!", error);
//         }
//         // success, print out the deets!
//         console.log(passTimes);
//       });
//     });
//   });
// });

const printDisplay = function (passTimes) {
  for (const singleTime of passTimes) {
    const date = new Date(0);
    date.setUTCSeconds(singleTime.risetime);
    const howLong = singleTime.duration;
    console.log(`Next pass at ${date} for ${howLong} seconds`);
  }
};

nextISSTimesForMyLocation((error, flights) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(flights);
  // success, print out the deets!
  printDisplay(flights);
});
