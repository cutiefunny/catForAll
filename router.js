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
            title: 'cat for all'
            , photos : photos
            , tags : "no tags"
            , deviceID : id
        });
    });

    // fs.readdir(__dirname+'/images/', function(err,fileList){
    //     var name = getCat(fileList);
    //     console.log(fileList);
    //         res.render('main', { 
    //             title: 'cat for all'
    //             , filelist : fileList
    //             , name : name
    //             , tags : "no tags"
    //             , deviceID : id
    //         });
    // });
}

function getCat(fileList){
    var index = Math.floor(Math.random()*fileList.length);
    return fileList[index];
}

exports.uploadImg = function(req,res) {
    uploader.open().then(files => alert(JSON.stringify(files)));
}