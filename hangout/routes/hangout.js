var broadcastCache = {};

module.exports.saveIds = function(req, res){
    broadcastCache[req.params["ho_id"]] = req.params["fb_id"];
    res.send("OK");
}

module.exports.getIds = function(req,res){
    res.send(broadcastCache[req.params["ho_id"]]);
}