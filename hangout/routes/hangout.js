var service = require("./hangoutService");
var broadcastCache = {};


module.exports.saveIds = function(req, res){
    //broadcastCache[req.params["ho_id"]] = req.params["fb_id"];
    service.hangoutServiceAdd(req.params["ho_id"],req.params["fb_id"], function(err, hangout){
        if(err){
            res.json({ "status": "ERROR" });
        }
        res.json({ "status": "OK" });
    })
    
}

module.exports.getIds = function(req,res){
    service.hangoutServiceGet(req.params["ho_id"],function(err, hangout){
        if(err||hangout===null){
            res.json({ "status": "ERROR" });
        }else{
            res.json({"result": hangout.fbid});        
        }
    })
    //res.send(broadcastCache[req.params["ho_id"]]);
    // res.json({
    //     "result":broadcastCache[req.params["ho_id"]]
    // });
}