/**
 * @author Erika L. Basurto
 * @version 1.0.0
 */

/**
 * Function to consume an end point that sends an SMS of the information of the 
 * origin and destination points, as well as the straight line distance between them
 * 
 * @param Number lat0
 * @param Number lng0
 * @param Number lat1
 * @param Number lng1
 * @param Number distance
 * @param string destination
 * 
 * @return Promise promise 
 */
var sendSMSService = function (lat0, lng0, lat1, lng1, distance, destination) {
  return axios({
    method: "GET",
    // url: "http://localhost:8888",
    url: "https://pydistance.000webhostapp.com",
    params: {
      lato: lat0,
      lngo: lng0,
      latd: lat1,
      lngd: lng1,
      distance: distance,
      destination: destination,
    },
  })
    .then(function (res) {
      return res.data;
    })
    .then(function (data) {
      return Promise.resolve(data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};
