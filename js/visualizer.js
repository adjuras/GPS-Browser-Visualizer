// gps
var lats;
var lngs;
var center;
var points = 0;

// ros
// Connecting to ROS
var ros = new ROSLIB.Ros({
url : 'ws://localhost:9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

// map
L.mapbox.accessToken = 'pk.eyJ1IjoiemlsaWhhcnZleSIsImEiOiJjazVuYnFpbDYxOHRhM2tvMXFyMDh6eGJyIn0.ABWx_KoY0Zrc1aIsSU0XNQ';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([0, 0], 3)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-v8'));;
var polyline = L.polyline([]).addTo(map);

function draw() {
    polyline.addLatLng(center);
    if (points == 0) {
        map.setView(center, 17);            
    } else {
        map.setView(center);
    }
    points++;
}

var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/piksi/navsatfix_best_fix',
    messageType : 'sensor_msgs/NavSatFix'
});

listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name);
    console.log('Current timestamp: ' + message.header.stamp.secs)
    console.log('Latitude: ' + message.latitude + ' Longitude: ' + message.longitude)
    lat = message.latitude;
    lng = message.longitude;
    center = L.latLng(lat, lng);
    if (center)
        draw();
});