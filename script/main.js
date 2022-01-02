//#region 엘리먼트를 변수로 선언
var menu = document.getElementById("menu");
var div_sideBar = document.getElementById("div_sideBar");
var img_main = document.getElementById("img_main");
var img_name = document.getElementById("img_name");
//#endregion

//페이지 시작 시 수행되는 함수
window.onload = function(){

};

//메뉴 클릭
function clickMenu(){ $('.ui.labeled.icon.sidebar').sidebar('toggle'); }
function change(){ callAjax("change") }
function clickThumb(src){ img_main.setAttribute("src",src); }
function clickNext(name) { alert(name); }

var HOME_PATH = window.HOME_PATH || '.';
var position = new naver.maps.LatLng(37.3849483, 127.1229117);

var mapOptions = {
    center: position,
    zoom: 10
};

var map = new naver.maps.Map('map', mapOptions);

var markerOptions = {
    position: position.destinationPoint(90, 15),
    map: map,
    icon: {
        url: HOME_PATH+'/images/'+img_name.getAttribute('value'),
        //size: new naver.maps.Size(50, 52),
        scaledSize: new naver.maps.Size(50, 52),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26)
    }
};

var marker = new naver.maps.Marker(markerOptions);