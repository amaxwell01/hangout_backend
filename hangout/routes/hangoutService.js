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
        "fbid": String,
        "hoURL": String,
        "jvid": String
    });
    HangoutModel = mongoose.model('Hangout', hangoutSchema);
    return HangoutModel;
}

//find with the gid.
function find(gid, callback){
    getHangoutModel().find({ "gid": gid }, callback);
}

//find with the gid.
function findOneWithGID(gid, callback){
    getHangoutModel().findOne({ "gid": gid }, callback);
}

function findOneWithJVID(jvid,callback){
    getHangoutModel().findOne({ "jvid": jvid }, callback);
}

//save the data.
function save(gid,fbid,hoURL,jvid, callback){
    var hangout = new getHangoutModel()({
        "gid": gid,
        "fbid": fbid,
        "hoURL": hoURL,
        "jvid": jvid
    });
    hangout.save(callback);
}

//update the data.
function update(gid,fbid,hoURL,jvid,callback){
    getHangoutModel().update({"gid":gid},{"fbid":fbid, "hoURL":hoURL, "jvid":jvid},callback);
}


module.exports.hangoutServiceAdd = function(gid, fbid, hoURL, jvid, callback){
    findOneWithGID(gid,function(err, hangout){
        if(err||hangout===null){
            save(gid,fbid,hoURL, jvid, callback);
        }else{
            update(gid,fbid,hoURL, jvid,callback);
        }

    })
}

module.exports.hangoutServiceGetFbID = function(gid, callback){
    findOneWithGID(gid,callback);
}

module.exports.hangoutServiceGetHangoutURL = function(jvid,callback){
    findOneWithJVID(jvid,callback);
}