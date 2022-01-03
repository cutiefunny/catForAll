//#region 엘리먼트를 변수로 선언
var menu = document.getElementById("menu");
var div_sideBar = document.getElementById("div_sideBar");
var img_main = document.getElementById("img_main");
var img_name = document.getElementById("img_name");
var filelist = document.getElementsByName("file");
//#endregion

//페이지 시작 시 수행되는 함수
window.onload = function(){
    setMarkers(filelist);
};

//메뉴 클릭
function clickMenu(){ $('.ui.labeled.icon.sidebar').sidebar('toggle'); }
function change(){ callAjax("change") }
function clickThumb(src){ img_main.setAttribute("src",src); }
function clickNext(name) { alert(name); }

let markers = new Array();

var HOME_PATH = window.HOME_PATH || '.';
var position = new naver.maps.LatLng(37.546219, 126.919683);

var mapOptions = {
    center: position,
    zoom: 17
};

var map = new naver.maps.Map('map', mapOptions);

var markerOptions = {
    position: position.destinationPoint(0, 0),
    map: map,
    icon: {
        url: HOME_PATH+'/images/'+img_name.getAttribute('value'),
        //size: new naver.maps.Size(50, 52),
        scaledSize: new naver.maps.Size(map.zoom*3, map.zoom*3),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26)
    }
};

var marker = new naver.maps.Marker(markerOptions);

markers.push(marker);

function setMarkers(filelist){

    var x;
    var y;
    var y1;
    var y2;
    var y3;

    filelist.forEach(file => {
        x=file.getAttribute("value").split("_")[0];
        y1=file.getAttribute("value").split("_")[1];
        y2=y1.toString().split(".")[0];
        y3=y1.toString().split(".")[1];
        y=y1+"."+y2;

        position = new naver.maps.LatLng(x, y);

        var markerOptions = {
            position: position.destinationPoint(0, 0),
            map: map,
            icon: {
                url: HOME_PATH+'/images/'+file.getAttribute("value"),
                // scaledSize: new naver.maps.Size(50, 52),
                scaledSize: new naver.maps.Size(map.zoom*3, map.zoom*3),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(25, 26)
            }
        };
        
        var marker = new naver.maps.Marker(markerOptions);
        
        markers.push(marker);
    });
}