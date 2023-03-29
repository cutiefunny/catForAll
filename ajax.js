const fs = require('fs');
const moment = require('moment');
const CRUD= require("./CRUD");

exports.controller = function(req,res,next) {
    
    if(req.body.op=="uploadImage"){
        var doc = { lat : req.body.lat, 
                    long : req.body.long , 
                    deviceID : req.body.deviceID , 
                    link : req.body.link , 
                    deletehash : req.body.deletehash, 
                    createTm : req.body.createTm, 
                    address : req.body.address };    
        CRUD.createData(req.body.op,"info",doc);
        res.send({result:req.body.op,link:req.body.link});
    }else if(req.body.op=="deleteImage"){
        var filter = { createTm : req.body.createTm };   
        CRUD.deleteData(req.body.op,"info",filter);
        res.send({result:req.body.op});
    }
}
