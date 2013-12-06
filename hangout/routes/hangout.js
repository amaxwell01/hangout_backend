var service = require("./hangoutService");
var broadcastCache = {};


module.exports.saveIds = function(req, res){
    //broadcastCache[req.params["ho_id"]] = req.params["fb_id"];
    service.hangoutServiceAdd(req.params["ho_id"],req.params["fb_id"], req.params["ho_url"],req.params["jv_id"], function(err, hangout){
        if(err){
            res.json({ "status": "ERROR" });
            return;
        }
        res.json({ "status": "OK" });
    })
    
}

module.exports.getfbIds = function(req,res){
    service.hangoutServiceGetFbID(req.params["ho_id"],function(err, hangout){
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


module.exports.getHangoutUrl = function(req, res){
    service.hangoutServiceGetHangoutURL(req.params["jv_id"], function(err, hangout){
        if(err||hangout===null){
            res.json({ "status": "ERROR" });
            return;
        }
        console.log(hangout)
        res.json({ "hangoutURL": hangout.hoURL });
    })
    
}