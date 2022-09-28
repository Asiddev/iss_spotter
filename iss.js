const request = require("request");

const fetchMyIP = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let { ip } = JSON.parse(body);
    if (ip) {
      callback(error, ip);
    }
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // parse the returned body so we can check its information
    const data = JSON.parse(body);
    // check if "success" is true or not
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }

    // console.log(lat, lng);
    // callback(lat, lng);
    // callback(error, lat, lng);
    const { latitude, longitude } = data;

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function (coordinates, callback) {
  let lat = coordinates.latitude;
  let lng = coordinates.longitude;
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lng}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      // if (error) {
      //   callback(error, null);
      //   return;
      // }

      // console.log(data.response);
      if (response.statusCode !== 200) {
        callback(
          Error(
            `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`
          ),
          null
        );
        return;
      }

      let flights = JSON.parse(body);

      callback(null, flights.response);
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, passTimes);
      });
    });
  });
};
module.exports = {
  nextISSTimesForMyLocation,
};
