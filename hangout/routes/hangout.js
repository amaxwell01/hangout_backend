var broadcastCache = {};


module.exports.saveIds = function(req, res){
    broadcastCache[req.params["ho_id"]] = req.params["fb_id"];
    res.json({ "status": "OK" });
}

module.exports.getIds = function(req,res){
    //res.send(broadcastCache[req.params["ho_id"]]);
    res.json({
        "result":broadcastCache[req.params["ho_id"]]
    });
}