// gps
var latPos = "N/A";
var lngPos = "N/A";
var latUSBL = "N/A";
var lngUSBL = "N/A";
var centerPos;
var centerUSBL;
var pointsPos = 0;
var pointUSBL = 0;
var speed = 0;

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
var layerStyle = "satellite-v8";

// example: https://docs.mapbox.com/mapbox.js/api/v3.2.1/
L.mapbox.accessToken = "pk.eyJ1IjoiYWRqdXJhcyIsImEiOiJja3czbzRrMzIwOHRyMnJudnJrMzNic2k5In0.WTOIjxycE_w6hdyUNKDqVQ";
var map = L.mapbox.map('map', null, {minZoom:7,maxZoom:24,
layers: [L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 24,
    maxNativeZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})]
})
    .setView([42.625300051062084, 18.12355958871609], 17); //[42.87166,17.700805] bistrina [43.3611131146, 5.305774436] marseille
//console.log(L.layerGroup())
L.control.locate().addTo(map);
var polylinePos = L.polyline([]).addTo(map);
polylinePos.setStyle({color: '#920b00'}); // red
var polylineUSBL = L.polyline([]).addTo(map);
polylineUSBL.setStyle({color: '#ffd22b'}); // yellow
var layerGroup = L.layerGroup().addTo(map);
layerGroup.addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/" + layerStyle));

drawTireMarkers();

function drawPos() {
    polylinePos.addLatLng(centerPos);
    if (pointsPos == 0) {
        map.setView(centerPos, 20);            
    } else {
        map.setView(centerPos);
    }
    pointsPos++;
}

function drawTireMarkers() {
	// left 2.7 meters 43.36082528, 5.30571771
	// center 3.4 meters 43.36085878, 5.30564011
	// right 3.7 meters 43.36082945 5.3054971
	L.marker([43.360805734, 5.30572024986],{'title':'left'}).addTo(map);
	L.marker([43.3608375017, 5.30564439012],{'title':'center'}).addTo(map);
	L.marker([43.3608097259, 5.30550118437],{'title':'right'}).addTo(map);
}

function drawUSBL() {
    polylineUSBL.addLatLng(centerUSBL);
}


var listener_pos = new ROSLIB.Topic({
    ros : ros,
    name : '/matrice/rov_global_position',
    messageType : 'sensor_msgs/NavSatFix'
});

var listener_ref = new ROSLIB.Topic({
    ros : ros,
    name : '/matrice/rov_global_position_refraction',
    messageType : 'sensor_msgs/NavSatFix'
});


listener_pos.subscribe(function(message) {
    latPos = message.latitude;
    lngPos = message.longitude;
    centerPos = L.latLng(latPos, lngPos);
    if (centerPos)
        drawPos();
    document.getElementById("position").innerHTML = "Latitude:" + latPos + " Longitude:" + lngPos;
});

listener_ref.subscribe(function(message) {
    latUSBL = message.latitude;
    lngUSBL = message.longitude;
    centerUSBL = L.latLng(latUSBL, lngUSBL);
    if (centerUSBL)
        drawUSBL();
    document.getElementById("position").innerHTML = "Latitude:" + latUSBL + " Longitude:" + lngUSBL;
});


colors = ['#ffd22b', '#ffb524', '#fe981e', '#f67b18', '#ea6012', '#da460d', '#c62d09', '#ae1705', '#920b00'];
function switchColor(speed) {
    if (speed < 10)
        return colors[0];
    if (speed < 15)
        return colors[1];
    if (speed < 20)
        return colors[2];
    if (speed < 25)
        return colors[3];
    if (speed < 30)
        return colors[4];
    if (speed < 35)
        return colors[5];
    if (speed < 40)
        return colors[6];
    if (speed < 45)
        return colors[7];
    return colors[8];
}

function switchLayer(layerId) {
    if (layerId == 1) {
        layerStyle = "satellite-v8";
    } else {
        layerStyle = "streets-v11";
    }
    layerGroup.clearLayers().addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/" + layerStyle));
}

var panel = document.getElementsByClassName("panel");
panel[0].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    console.log(content);
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
});
