const fs = require('fs');
const moment = require('moment');
const CRUD= require("./CRUD");

exports.controller = function(req,res,next) {
    
    if(req.body.op=="upload"){
        console.log("upload Image");
        var doc = { latitude : req.body.latitude, longitude : req.body.longitude , deviceID : req.body.deviceID , fileUrl : req.body.fileUrl , fileId : req.body.fileId, time : moment().format('YYYYMMDDHHmm') };    
        CRUD.createData(req.body.op,"info",doc);
        res.send({result:req.body.op,fileUrl:req.body.fileUrl});
    }else if(req.body.op=="face1"){
        res.send({result:req.body.op,msg:"face1"});
    }
}
