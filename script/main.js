//네이버맵 클라이언트ID : 52kirtllzz
//네이버맵 클라이언트secret : F638yjejakxPImMRy9PaIaFjdwQ1IXFUEIgSmebS

//#region 엘리먼트를 변수로 선언
var menu = document.getElementById("menu");
var div_sideBar = document.getElementById("div_sideBar");
var img_main = document.getElementById("img_main");
var img_name = document.getElementById("img_name");
var uploaded = document.getElementById("uploaded");
var deviceID = document.getElementById("deviceID").getAttribute('value');
//#endregion

//페이지 시작 시 수행되는 함수
window.onload = function(){
    
    //setMarkers(time,lat,long,url);
    
};

function test(){
    tryAPIGeolocation();
}

//메뉴 클릭
function clickMenu(){ $('.ui.labeled.icon.sidebar').sidebar('toggle'); }
function change(){ callAjax("change") }
function clickThumb(src){ img_main.setAttribute("src",src); }
function clickNext(name) { alert(name); }

function showMap(){ 
    $('.ui.modal').modal('show'); 
    tryAPIGeolocation();
}

function uploadImage(lat,long,address){
    const fileInput = document.getElementById("uploadImg");
    const upload = (file) => {
        if (file && file.size < 5000000) {
            const formData = new FormData();
            
            formData.append("image", file);
            fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    Authorization: "Client-ID ff70f4ca94ef095",
                    Accept: "application/json",
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response.data);
                    callAjaxImage("uploadImage",{link:response.data.link,deletehash:response.data.deletehash,createTm:new Date().YYYYMMDDHHMMSS(),lat:lat,long:long,address:address,deviceID:deviceID}) 
                });
        } else {
            console.error("파일 용량 초과");
        }
    };

    upload(fileInput.files[0]);
}

function deleteImage(obj){
    if(confirm("삭제하실거냥?")){
        var createTm = obj.getAttribute("id");
        callAjaxImage("deleteImage",{createTm:createTm});
    }
}

let markers = new Array();

var HOME_PATH = window.HOME_PATH || '.';

var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.5666805, 126.9784147),
    zoom: 10,
    mapTypeId: naver.maps.MapTypeId.NORMAL
});

var infowindow = new naver.maps.InfoWindow();

function onSuccessGeolocation(position) {
    //alert(position.coords.latitude);
    var location = new naver.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

    map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
    map.setZoom(14); // 지도의 줌 레벨을 변경합니다.
}

function onErrorGeolocation() {
    alert("error");
    var center = map.getCenter();

    // infowindow.setContent('<div style="padding:20px;">' +
    //     '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>'+ "latitude: "+ center.lat() +"<br />longitude: "+ center.lng() +'</div>');

    // infowindow.open(map, center);
}

naver.maps.Event.addListener(map, 'zoom_changed', function (zoom) {
    //console.log('zoom:' + zoom);
    //markers = [];
    //setMarkers(time,lat,long,url);
});

naver.maps.Event.addListener(map, 'click', function(e){
	//alert(e.coord.lat() + ', ' + e.coord.lng());
    
    naver.maps.Service.reverseGeocode({
        location: new naver.maps.LatLng(e.coord.lat(), e.coord.lng()),
    }, function(status, response) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert(status);
        }

        var result = response.result, // 검색 결과의 컨테이너
            items = result.items; // 검색 결과의 배열

        if(confirm(items[1].address)){
            uploadImage(e.coord.lat(),e.coord.lng(),items[1].address);
        }
    });
});

function setMarkers(time,lat,long,url){
    var cnt = 0;
    time.forEach(element => {
        position = new naver.maps.LatLng(lat[cnt].getAttribute("value"), long[cnt].getAttribute("value"));

        var markerOptions = {
            position: position.destinationPoint(0, 0),
            map: map,
            icon: {
                url: "https://i.imgur.com/6qUJ3uP.jpg",
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

//Date format 정리 함수
Date.prototype.YYYYMMDDHHMMSS = function () {
    var yyyy = this.getFullYear().toString();
    var MM = pad(this.getMonth() + 1,2);
    var dd = pad(this.getDate(), 2);
    var hh = pad(this.getHours(), 2);
    var mm = pad(this.getMinutes(), 2)
    var ss = pad(this.getSeconds(), 2)
  
    return yyyy +  MM + dd+  hh + mm + ss;
  };
  
  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }




  /////////////////

  var apiGeolocationSuccess = function(position) {
    //alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
    var location = new naver.maps.LatLng(position.coords.latitude,position.coords.longitude);

        map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
        map.setZoom(14); // 지도의 줌 레벨을 변경합니다.
};

var tryAPIGeolocation = function() {
    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDg_JUjAG9yeU26I7C6rN8COtqH4EHBsw8", function(success) {
        apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
        //AIzaSyDg_JUjAG9yeU26I7C6rN8COtqH4EHBsw8
  })
  .fail(function(err) {
    alert("API Geolocation error! \n\n"+err);
    console.log(err);
  });
};