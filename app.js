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
// this link refer to shubham kucheria's mlab online mongodb service provider
// var url ='mongodb://myinapp:myinapp@ds119449.mlab.com:19449/myinapp'
var link_db;

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
  res.render('uid',{uniqueid: ourDomainUrl + uid});
  res.end(ourDomainUrl + uid);
});


app.get('/:uid',function(req,res){
  shortnerService.getFromDb("localhost:5000/" + req.params.uid,req,res);
  console.log('Redirector');
});


app.get('/short/error404',function(req,res){
  console.log('Error Page!');
  res.writeHead(200,{'Content-Type':'text/html'});
  var myInputStream = fs.createReadStream(__dirname + "/error.html");
  myInputStream.pipe(res);
});


app.listen(5000);
