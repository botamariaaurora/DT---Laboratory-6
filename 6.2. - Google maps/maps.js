// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
let selectedPos = {
  lat: 10.0,
  lng: 10.0,
};
let actualPos = {
  lat: 10.0,
  lng: 10.0,
};
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.757956, lng: -73.985546 },
    zoom: 15,
  });
  infoWindow = new google.maps.InfoWindow();
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        (actualPos.lat = position.coords.latitude),
          (actualPos.lng = position.coords.longitude),
          infoWindow.setPosition(actualPos);
        infoWindow.setContent(
          `This is your location: <br><br>Lat: ${position.coords.latitude}<br><br>Long: ${position.coords.longitude}`
        );
        infoWindow.open(map);
        map.setCenter(actualPos);
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  map.addListener(`click`, function (e) {
    // infoWindow.close();
    SelectedPosition(e.latLng, map);
  });
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function SelectedPosition(latLng, map) {
  infoWindow2 = new google.maps.InfoWindow();
  selectedPos.lat = latLng.lat();
  selectedPos.lng = latLng.lng();
  infoWindow2.setPosition(latLng);
  const airDistance = ComputeDistance(
    actualPos.lat,
    actualPos.lng,
    selectedPos.lat,
    selectedPos.lng
  );
infoWindow2.setContent(
    `The location you selected:<br><br>Lat: ${selectedPos.lat}<br><br>Long: ${
      selectedPos.lng
    }<br><br>DISTANCE: ${airDistance.toFixed(
      5
    )} km`
  );
  infoWindow2.open(map);
}
function convertDegreeIntoRad(deg) {
  return deg*(Math.PI / 180);
}
function ComputeDistance(lat1,lon1,lat2,lon2) {
  var R = 6371;
  var dLat = convertDegreeIntoRad(lat2 - lat1); 
  var dLon = convertDegreeIntoRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2)*Math.sin(dLat / 2) +
    Math.cos(convertDegreeIntoRad(lat1)) *
      Math.cos(convertDegreeIntoRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

