const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  const parsed = JSON.parse(body);
  let ip = parsed.ip;
  // console.log(ip);
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function (body) {
  const parsed = JSON.parse(body);
  let lat = parsed.latitude;
  let lng = parsed.longitude;
  return request(
    `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lng}`
  );
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      //make sure we put .response at the end of JSON.parse(data) or else your going to get un iterable error again

      const res = JSON.parse(data).response;

      return res;
    });
};

module.exports = { nextISSTimesForMyLocation };
