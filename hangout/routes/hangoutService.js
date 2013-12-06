var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://hangoutuser:hangoutuser123@ds053648.mongolab.com:53648/hangout');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connection created");
});

var HangoutModel;

//Creation of the Model.
function getHangoutModel(){
    if(HangoutModel!==undefined){
        return HangoutModel;
    }
    var hangoutSchema = Schema({
        "gid": String,
        "fbid": String
    });
    HangoutModel = mongoose.model('Hangout', hangoutSchema);
    return HangoutModel;
}

//find with the gid.
function find(gid, callback){
    getHangoutModel().find({ "gid": gid }, callback);
}

//find with the gid.
function findOne(gid, callback){
    getHangoutModel().findOne({ "gid": gid }, callback);
}

//save the data.
function save(gid,fbid,callback){
    var hangout = new getHangoutModel()({
        "gid": gid,
        "fbid": fbid
    });
    hangout.save(callback);
}

//update the data.
function update(gid,fbid,callback){
    getHangoutModel().update({"gid":gid},{"fbid":fbid},callback);
}


module.exports.hangoutServiceAdd = function(gid, fbid, callback){
    findOne(gid,function(err, hangout){
        debugger;
        if(err||hangout===null){
            save(gid,fbid,callback)
        }else{
            update(gid,fbid,callback)
        }

    })
}


module.exports.hangoutServiceGet = function(gid, callback){
    findOne(gid,callback);
}
