const CRUD= require("./CRUD");
const fs = require('fs');

exports.main = function(req,res) {

    fs.readdir(__dirname+'/images/', function(err,fileList){
        var name = getCat(fileList);
        console.log(name);
            res.render('main', { 
                title: 'cat for all'
                , name : name
                , tags : "no tags"
            });
    });
}

function getCat(fileList){
    var index = Math.floor(Math.random()*fileList.length);
    return fileList[index];
}