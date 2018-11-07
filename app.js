var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
var shortnerService = require('./shortner.service');
var ourDomainUrl = 'localhost:5000/';


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('view engine','ejs');



console.log('Working now!');
var url = 'mongodb://localhost:27017/database';
// var url ='mongodb://myinapp:myinapp@ds119449.mlab.com:19449/myinapp'

var link_db;


/*get_link : function to get the link 
  from the database.
  
params:
  uid - unique id for every link 
  that was generated before.
  request - request object
  resp - response object
  
*/
function get_link(uid,request,resp){

  var id_db = uid;
  MongoClient.connect(url,function(err,db){
    if(err){
      console.log(err);
    }
    else{
      var collection = db.collection('uids');

      collection.find({id:id_db}).toArray(function(err,res){
        if(err){
          console.log(err);
        }
        else if(res.length == 1){
          link_db = res[0]['link'];
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
app.get('/',function(req,res){
  console.log('Shortner Redirector');
  res.writeHead(301,
  {Location: 'http://localhost:5000/short'}
  );
  res.end();
});

app.get('/short',function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  var myInputStream = fs.createReadStream(__dirname + "/shortner.html");
  myInputStream.pipe(res);
});


app.post('/short/url',function(req,res){
  var uid = shortnerService.getUid();
  shortnerService.addToDb(ourDomainUrl, req.body.mainurl, uid);
  console.log('/short/url----------------',uid)
  res.render('uid',{uniqueid: ourDomainUrl + uid});
  res.end(ourDomainUrl + uid);
});


app.get('/:uid',function(req,res){
  get_link("localhost:5000/" + req.params.uid,req,res);
  console.log('Redirector');
});


app.get('/short/error404',function(req,res){
  console.log('Error Page!');
  res.writeHead(200,{'Content-Type':'text/html'});
  var myInputStream = fs.createReadStream(__dirname + "/error.html");
  myInputStream.pipe(res);
});


app.listen(5000);
