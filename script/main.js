//#region 엘리먼트를 변수로 선언
var menu = document.getElementById("menu");
var div_sideBar = document.getElementById("div_sideBar");
var img_main = document.getElementById("img_main");
var img_name = document.getElementById("img_name");
var uploaded = document.getElementById("uploaded");
var time = document.getElementsByName("time");
var lat = document.getElementsByName("latitude");
var long = document.getElementsByName("longitude");
var url = document.getElementsByName("fileUrl");
var deviceID = document.getElementById("deviceID").getAttribute('value');
//#endregion

//페이지 시작 시 수행되는 함수
window.onload = function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
    } else {
        var center = map.getCenter();
        infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
        infowindow.open(map, center);
    }
    
    setMarkers(time,lat,long,url);
    
};

//메뉴 클릭
function clickMenu(){ $('.ui.labeled.icon.sidebar').sidebar('toggle'); }
function change(){ callAjax("change") }
function clickThumb(src){ img_main.setAttribute("src",src); }
function clickNext(name) { alert(name); }

const upload = new Upload({
    // This is your API key:
    apiKey: "public_12a1xpGGbbJh2u6J1eqbru3zEWSp"
})

const uploadFile = upload.createFileInputHandler({
    onUploaded: ({ fileUrl, fileId }) => {
        navigator.geolocation.getCurrentPosition(function(pos) {
            callAjax("upload",pos.coords.latitude, pos.coords.longitude, deviceID,fileUrl,fileId);
            //latitude,longitude,deviceID,fileUrl,fileId
        });
        //alert(`File uploaded! ${fileUrl}`);
        //uploaded.setAttribute("src",fileUrl);
    }
});

let markers = new Array();

var HOME_PATH = window.HOME_PATH || '.';

var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.5666805, 126.9784147),
    zoom: 10,
    mapTypeId: naver.maps.MapTypeId.NORMAL
});

var infowindow = new naver.maps.InfoWindow();

function onSuccessGeolocation(position) {
    var location = new naver.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

    map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
    map.setZoom(10); // 지도의 줌 레벨을 변경합니다.

    //infowindow.setContent('<div style="padding:20px;">' + 'geolocation.getCurrentPosition() 위치' + '</div>');

    //infowindow.open(map, location);
    console.log('Coordinates: ' + location.toString());
}

function onErrorGeolocation() {
    var center = map.getCenter();

    infowindow.setContent('<div style="padding:20px;">' +
        '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>'+ "latitude: "+ center.lat() +"<br />longitude: "+ center.lng() +'</div>');

    infowindow.open(map, center);
}

function setMarkers(time,lat,long,url){
    var cnt = 0;
    time.forEach(element => {
        position = new naver.maps.LatLng(lat[cnt].getAttribute("value"), long[cnt].getAttribute("value"));

        var markerOptions = {
            position: position.destinationPoint(0, 0),
            map: map,
            icon: {
                url: url[cnt].getAttribute("value"),
                // scaledSize: new naver.maps.Size(50, 52),
                scaledSize: new naver.maps.Size(map.zoom*3, map.zoom*3),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(25, 26)
            }
        };
        
        var marker = new naver.maps.Marker(markerOptions);
        
        markers.push(marker);
        cnt++;
    });
}