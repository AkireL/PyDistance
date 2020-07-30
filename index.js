/**
 * Show map, draw some market and market custom position
 * @author Erika L. Basurto <iamdleonor@gmail.com>
 * @version 1.0.0
 */

/**
 * Places
 */
var places = [
  ["Puebla", -19.033333, -98.183334, 4],
  ["Baja California", 32.663334, -115.467781, 5],
  ["Isla Mujeres", 21.2338, -86.7331, 3],
  ["Oaxaca", -17.0669, -96.7203, 2],
  ["Maroubra Beach", -33.950198, 151.259302, 1],
];

/**
 * Calculate distance
 */
const calculateDistance = (lat0, lng0, lat1, lng1) => {
  let x1 = new google.maps.LatLng(lat0, lng0);
  let x2 = new google.maps.LatLng(lat1, lng1);
  let distance = google.maps.geometry.spherical.computeDistanceBetween(x1, x2);
  return parseFloat(distance / 1000).toFixed(3);
};

/**
 * Request handler button to send a SMS
 * @param {dom} event 
 */
const sendSMS = (event) => {
  lat0 = event.dataset.lato;
  lng0 = event.dataset.lngo;
  lat1 = event.dataset.lat;
  lng1 = event.dataset.lng;
  distancia = event.dataset.distance;
  destination = event.dataset.destination;
  event.disabled = true;
  event.innerText = "Enviando..";
  sendSMSService(lat0, lng0, lat1, lng1, distancia, destination)
    .then(function (data) {
      if (data.statusCode != 200) {
        vanillaToast.error( data.statusCode,{duration:8000, fadeDuration:120});
      } else {
        vanillaToast.success("Mensaje enviado correctamente",{duration:2000, fadeDuration:120});
      }
    })
    .catch(function (error) {
      if (error.response && error.response.data) {
        vanillaToast.error( error.response.data.error || "Error al procesar",{duration:8000, fadeDuration:120});
      } else {
        vanillaToast.error( error.message,{duration:8000, fadeDuration:120});
      }
    })
    .finally(function () {
      setTimeout(function () {
        event.innerText = "Enviar SMS";
        event.disabled = false;
      }, 1000);
    });
};

/**
 * Render description market
 * @param {object} data: {<name place, lat, lng, deep>}: item's info 
 * @param {string lat, string lng} locationOrigen: Customer coordinates
 */
const renderContentInfo = (data, locationOrigen) => {
  let distance = calculateDistance(
    locationOrigen.lat,
    locationOrigen.lng,
    data[1],
    data[2]
  );

  return `
            <p>Lugar: ${data[0]}</p>
            <p>lat: ${data[1]}</p>
            <p>lng: ${data[2]}</p>
            <p>Distancia al origen: ${distance} km. </p>
            <button 
                data-lat="${data[1]}"
                data-lng="${data[2]}"
                data-distance= "${distance}"
                data-destination="${data[0]}"
                data-lato="${locationOrigen.lat}"
                data-lngo="${locationOrigen.lng}"
                type="button" 
                class="btn btn-success"
                onclick="sendSMS(this)">
                Enviar SMS
            </button>
        `;
};

/**
 * Draw market
 * @param {*} map 
 * @param {object} data: [{<name place, lat, lng, deep>},...]: array places
 * @param {string lat, string lng} locationOrigen: Customer coordinates
 */
const draw = (map, data, locationOrigen) => {
  var marker = new google.maps.Marker({
    position: { lat: data[1], lng: data[2] },
    map: map,
    title: data[0],
    zIndex: data[3],
  });

  var infowindow = new google.maps.InfoWindow({
    content: renderContentInfo(data, locationOrigen),
  });
  marker.addListener("click", function () {
    infowindow.open(map, marker);
  });
};

/**
 * Draw markerts
 * @param {*} map 
 * @param {string lat, string lng} locationOrigen: Customer coordinates
 */
const drawList = (map, locationOrigen) => {
  places.forEach((item) => {
    draw(map, item, locationOrigen);
  });
};

/**
 * Main
 */
navigator.geolocation.getCurrentPosition(function (location) {
  var map;
  var center = {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
  };
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 6,
    });

    var marker = new google.maps.Marker({
      position: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
      map: map,
      title: "Tu ubicación",
    });
    drawList(map, center);
  }
  initMap();
});

