function ShortnerService () {
  var self = this;
  self.shortid = require('shortid');
  self.mongodb = require('mongodb');
  self.MongoClient = self.mongodb.MongoClient;
  self.url = 'mongodb://localhost:27017/database';

}

function getUidObject(ourDomainUrl, externalurl, id) {
  var self = this;
  return  {
    link: externalurl,
    id: ourDomainUrl + id
  };
}

function getUid () {
  var self = this;
  return self.shortid.generate();
}

function addToDb(ourDomainUrl, externalUrl, uid){
  var self = this;

  self.MongoClient.connect(self.url, function(err, db){
    if (err){
      console.log(err);
    }
    else {
      var collection = db.collection('uids');
      var obj = shortnerService.getUidObject(ourDomainUrl, externalUrl, uid);
      
      collection.insert(obj,function(err,res){

        if(err){
          console.log(err);
        }
        else{
          console.log('%d Links Entered!', res.insertedCount);
        }
        db.close();
      });

      }
  });
}

function getFromDb(uid, request, resp){
  var self = this;

  var id_db = uid;
  self.MongoClient.connect(self.url, function(err, db){
    if(err){
      console.log(err);
    }
    else{
      var collection = db.collection('uids');

      collection.find({id:id_db}).toArray(function(err,res){
        console.log('length---------------:', res.length);
        if(err){
          console.log(err);
        }
        else if(res.length == 1){
          link_db = res[0]['link'];
          // it checks if url doesn't have http or https
          link_db = link_db.match(/^http[s]*:\/\//) ? link_db : 'http://' + link_db;
          resp.writeHead(302, {
            'Location': link_db
            //add other headers here...
          });
          resp.end();
        }
        else{
          console.log('No such UID exists!');
          resp.writeHead(301,
          {Location: '/short/error404'}
          );
          link_db = 'NULL';
          resp.end();
        }
        db.close();
      });

    }

  });
}

ShortnerService.prototype = {
  getUidObject: getUidObject,
  getUid: getUid,
  addToDb: addToDb,
  getFromDb: getFromDb
};  

var shortnerService = new ShortnerService();

module.exports = shortnerService;
