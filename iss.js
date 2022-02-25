/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = ((callback) => {
  
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // pass through the error to the callback if and error occurs when requesting IP data
    if (error) {
      return callback(error, null);
    }
    //if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    // if we get here, all's well and we got the data

    //pasrse & extract the IP address using json & then pass that through the callback if no errors
    const ipAddress = JSON.parse(body).ip;
    callback(null, ipAddress);

  });
});
const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
      return callback(Error(msg), null);
    }
    //my original way.
    // const data = JSON.parse(body);
    // const latitude = data.latitude;
    // const longitude = data.longitude;

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchCoordsByIP };