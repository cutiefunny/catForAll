const fs = require('fs');

exports.controller = function(req,res,next) {
    
    if(req.body.op=="change"){
        console.log("change Image");
        fs.readdir(__dirname+'/images/', function(err,filelist){
            res.send({result:req.body.op,filename:filelist[Math.floor(Math.random()*filelist.length)]});
        });
    }else if(req.body.op=="face1"){
        res.send({result:req.body.op,msg:"face1"});
    }
}
