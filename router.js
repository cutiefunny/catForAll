const CRUD = require("./CRUD");
const fs = require('fs');
const deviceID = require('node-machine-id')
const { Uploader } = require("uploader");
const uploader = new Uploader({
  apiKey: "free"
});

exports.main = function(req,res) {

    let id = deviceID.machineIdSync();
    console.log(id);

    CRUD.searchData("getPhotos","info").then(photos=>{
        console.log(photos);
            res.render('main', { 
            title: '고양이 탐정단'
            , photos : photos
            , deviceID : id
        });
    });
}

function getCat(fileList){
    var index = Math.floor(Math.random()*fileList.length);
    return fileList[index];
}

exports.uploadImg = function(req,res) {
    uploader.open().then(files => alert(JSON.stringify(files)));
}