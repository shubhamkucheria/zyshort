var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('view engine','ejs');

function add_link(link, id){
  console.log('add_link - add short url and actual url to db');
}

function get_link(uid){
 console.log('get_link - add short url and actual url to db'); 
}
app.get('/',function(){
  console.log('Shortner Redirector');
});

app.get('/short',function(){
  console.log('main page for shorten url');
});


app.post('/short/url',function(){
  // generates unique ID redirect to the url.
  console.log();
});


app.get('/:uid',function(req,res){
    console.log('get the given id');
});


app.get('/short/error404',function(req,res){
  console.log('Error Page!');
});


app.listen(5000);
