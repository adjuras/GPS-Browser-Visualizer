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
    .setView([42.87166,17.700805], 17); //[42.87166,17.700805] bistrina [43.3611131146, 5.305774436] marseille
//console.log(L.layerGroup())
L.control.locate().addTo(map);
var polylinePos = L.polyline([]).addTo(map);
polylinePos.setStyle({color: '#920b00'}); // red
var polylineUSBL = L.polyline([]).addTo(map);
polylineUSBL.setStyle({color: '#ffd22b'}); // yellow
var layerGroup = L.layerGroup().addTo(map);
layerGroup.addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/" + layerStyle));

drawTrashMarkersTireBistrina1()
drawTrashMarkersTireBistrina2()

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

function addMarkerLabel(cord, label){
	L.marker(cord).bindTooltip(label, {permanent: true, direction: 'right'}).addTo(map);
}
/*
function drawTrashMarkersLokrum1(){
	addMarkerLabel([42.6253888697, 18.1236155835],'First Tire')
	addMarkerLabel([42.625396665729546, 18.123621678491553],'Trash 1.')
	addMarkerLabel([42.62540160056191, 18.123632822740795],'Trash 2.')
	addMarkerLabel([42.62538579080683, 18.123627038335172],'Trash 3.')
	addMarkerLabel([42.625382711912515, 18.123638493169228],'Trash 4.')
	addMarkerLabel([42.625371139064086, 18.12361981703497],'Trash 5.')
	addMarkerLabel([42.625376138835456, 18.12359834426623],'Trash 6.')
	addMarkerLabel([42.625402372815174, 18.123583912991982],'Trash 7.')
}

function drawTrashMarkersLokrum2(){
	addMarkerLabel([42.6254437075, 18.1236576074],'Second Tire')
	addMarkerLabel([42.625451503529476, 18.123663702396904],'Trash 1.')
	addMarkerLabel([42.62545643836179, 18.123674846655923],'Trash 2.')
	addMarkerLabel([42.62544062860686, 18.123669062245234],'Trash 3.')
	addMarkerLabel([42.62543754971257, 18.123680517089333],'Trash 4.')
	addMarkerLabel([42.62542597686426, 18.123661840938688],'Trash 5.')
	addMarkerLabel([42.62543097663559, 18.123640368151104],'Trash 6.')
	addMarkerLabel([42.625457210615046, 18.123625936864194],'Trash 7.')
}
*/

function drawTrashMarkersTireBistrina1(){
	addMarkerLabel([42.87151153226485, 17.700588302494285],'First Tire')
	addMarkerLabel([42.871519327958126, 17.700594421647075],'Trash 1.')
	addMarkerLabel([42.87152426257762, 17.7006056100734],'Trash 2.')
	addMarkerLabel([42.871508453504475, 17.700599802737717],'Trash 3.')
	addMarkerLabel([42.871505374742945, 17.70061130298],'Trash 4.')
	addMarkerLabel([42.87149380239372, 17.700592552811457],'Trash 5.')
	addMarkerLabel([42.87149880194943, 17.70057099492228],'Trash 6.')
	addMarkerLabel([42.87152503479754, 17.700556506440748],'Trash 7.')
}

function drawTrashMarkersTireBistrina2(){
	addMarkerLabel([42.871500298217796, 17.700443029094114],'Second Tire')
	addMarkerLabel([42.87150809391108, 17.7004491482458],'Trash 1.')
	addMarkerLabel([42.87151302853059, 17.700460336670094],'Trash 2.')
	addMarkerLabel([42.871497219457424, 17.70045452933546],'Trash 3.')
	addMarkerLabel([42.87149414069589, 17.70046602957566],'Trash 4.')
	addMarkerLabel([42.87148256834665, 17.700447279410515],'Trash 5.')
	addMarkerLabel([42.871487567902356, 17.70042572152525],'Trash 6.')
	addMarkerLabel([42.871513800750535, 17.700411233046346],'Trash 7.')
}

/*
function drawTrashMarkersTire1(){
	L.marker([42.87151153226485, 17.700588302494285],{'title':'First Tire'}).addTo(map);
	L.marker([42.871519327958126, 17.700594421647075],{'title':'Trash 1.'}).addTo(map);
	L.marker([42.87152426257762, 17.7006056100734],{'title':'Trash 2.'}).addTo(map);
	L.marker([42.871508453504475, 17.700599802737717],{'title':'Trash 3.'}).addTo(map);
	L.marker([42.871505374742945, 17.70061130298],{'title':'Trash 4.'}).addTo(map);
	L.marker([42.87149380239372, 17.700592552811457],{'title':'Trash 5.'}).addTo(map);
	L.marker([42.87149880194943, 17.70057099492228],{'title':'Trash 6.'}).addTo(map);
	L.marker([42.87152503479754, 17.700556506440748],{'title':'Trash 7.'}).addTo(map);
}

function drawTrashMarkersTire2(){
	L.marker([42.871500298217796, 17.700443029094114],{'title':'Second Tire'}).addTo(map);
	L.marker([42.87150809391108, 17.7004491482458],{'title':'Trash 1.'}).addTo(map);
	L.marker([42.87151302853059, 17.700460336670094],{'title':'Trash 2.'}).addTo(map);
	L.marker([42.871497219457424, 17.70045452933546],{'title':'Trash 3.'}).addTo(map);
	L.marker([42.87149414069589, 17.70046602957566],{'title':'Trash 4.'}).addTo(map);
	L.marker([42.87148256834665, 17.700447279410515],{'title':'Trash 5.'}).addTo(map);
	L.marker([42.871487567902356, 17.70042572152525],{'title':'Trash 6.'}).addTo(map);
	L.marker([42.871513800750535, 17.700411233046346],{'title':'Trash 7.'}).addTo(map);
}

*/
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
