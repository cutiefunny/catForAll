//네이버맵 클라이언트ID : 52kirtllzz
//네이버맵 클라이언트secret : F638yjejakxPImMRy9PaIaFjdwQ1IXFUEIgSmebS

//#region 엘리먼트를 변수로 선언
var deviceID = document.getElementById("deviceID").getAttribute('value');
var photos = document.getElementsByName("photo");
//#endregion

//#region 네이버맵 api 선언부
let markers = new Array();

var HOME_PATH = window.HOME_PATH || '.';

var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.5569527, 126.9240634),
    zoom: 10,
    mapTypeId: naver.maps.MapTypeId.NORMAL
});

var map2 = new naver.maps.Map('map2', {
    center: new naver.maps.LatLng(37.5569527, 126.9240634),
    zoom: 13,
    mapTypeId: naver.maps.MapTypeId.NORMAL
});

var marker = new naver.maps.Marker({position: new naver.maps.LatLng(37.5569527, 126.9240634).destinationPoint(0, 0),map: map});

var marker2 = new naver.maps.Marker({position: new naver.maps.LatLng(37.5569527, 126.9240634).destinationPoint(0, 0),map: map2});

var infowindow = new naver.maps.InfoWindow();
//#endregion

//페이지 시작 시 수행되는 함수
window.onload = function(){

    photos.forEach(photo => {
        setMarker2(photo.getAttribute("value").split("+")[0],photo.getAttribute("value").split("+")[1],photo.getAttribute("value").split("+")[2]);
    });

    showNearPhoto();
    //setMarkers(time,lat,long,url);
    
};

//메뉴 클릭
function clickMenu(){ $('.ui.labeled.icon.sidebar').sidebar('toggle'); }
function change(){ callAjax("change") }
function clickThumb(src){ img_main.setAttribute("src",src); }
function clickNext(name) { alert(name); }
function clickUpload() { $("#uploadImg").click() }

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

//2km 이내의 사진 로드
function showNearPhoto(){
    var html = "";
    //marker2.setMap(null);
    photos.forEach(photo => {
        if( getDistanceFromLatLonInKm(map2.getCenter().y,map2.getCenter().x,photo.getAttribute("value").split("+")[0],photo.getAttribute("value").split("+")[1]) < 2 ){
            html+="<img src='"+photo.getAttribute("value").split("+")[2]+"' width='33%'>";
            //setMarker2(photo.getAttribute("value").split("+")[0],photo.getAttribute("value").split("+")[1],photo.getAttribute("value").split("+")[2]);
        }
    });
    $("#nearPhoto").html(html);
}

naver.maps.Event.addListener(map2, 'dragend', function () {
    showNearPhoto();
});

naver.maps.Event.addListener(map, 'click', function(e){

    marker.setMap(null);
    setMarker(e.coord.lat(),e.coord.lng())
    naver.maps.Service.reverseGeocode({
        location: new naver.maps.LatLng(e.coord.lat(), e.coord.lng()),
    }, function(status, response) {
        if (status !== naver.maps.Service.Status.OK) {
            return alert(status);
        }

        var result = response.result, // 검색 결과의 컨테이너
            items = result.items; // 검색 결과의 배열

        if(confirm(items[1].address+"\n이 위치가 맞냥?")){
            $("#mod").html("uploding...");  
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
            // icon: {
            //     url: "https://i.imgur.com/6qUJ3uP.jpg",
            //     // scaledSize: new naver.maps.Size(50, 52),
            //     scaledSize: new naver.maps.Size(map.zoom*3, map.zoom*3),
            //     origin: new naver.maps.Point(0, 0),
            //     anchor: new naver.maps.Point(25, 26)
            // }
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

  //경도 위도로 거리계산 함수
  function getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lng2-lng1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function imageClick(obj){
    var lat=obj.getAttribute("id");
    var long=obj.getAttribute("name");
    alert(getDistanceFromLatLonInKm(map2.getCenter().y,map2.getCenter().x,lat,long));
}


  /////////////////

  var apiGeolocationSuccess = function(position) {

    var location = new naver.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
        map.setZoom(15); // 지도의 줌 레벨을 변경합니다.
        marker.setMap(null);
        //setMarker(position.coords.latitude,position.coords.longitude);
};

var tryAPIGeolocation = function() {
    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDg_JUjAG9yeU26I7C6rN8COtqH4EHBsw8", function(success) {
        apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
  })
  .fail(function(err) {
    alert("API Geolocation error! \n\n"+err);
    console.log(err);
  });
};

function setMarker(lat,long){
    position = new naver.maps.LatLng(lat, long);

    var markerOptions = {
        position: position.destinationPoint(0, 0),
        map: map
    };
    
    marker = new naver.maps.Marker(markerOptions);
}

function setMarker2(lat,long,link){
    position = new naver.maps.LatLng(lat, long);

    var markerOptions = {
        position: position.destinationPoint(0, 0),
        map: map2
    };
    
    marker2 = new naver.maps.Marker(markerOptions);
    naver.maps.Event.addListener(marker2, 'click', function(){ clickMarker(link); });
}

function clickMarker(link){
    $("#nearPhoto").html("<img src='"+link+"' width='100%'>");
}