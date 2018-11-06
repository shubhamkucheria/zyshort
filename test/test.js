"use strict";
// NPM install mongoose and chai. Make sure mocha is globally
// installed
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
const testSchema = new Schema({ link: String, id: String });
var shortid = require('shortid');
var async = require('async');

//Create a new collection called 'uids'
const uids = mongoose.model('uids', testSchema);
describe('Functionality Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://localhost:27017/database');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });


  // describe('Test to generate hash id and url insert', function() {
  //   it('New data saved to database', function(done) {
  //     // it will generate random id (hash value)
  //     var uid = 'localhost:5000/'+shortid.generate();
  //     var url = 'https://jsonplaceholder.typicode.com/todos/1'
  //     var testName = uids({
  //       link: url,
  //       id: uid
  //     });

  //     testName.save(done);
  //   });
  // });


  // describe('Test Database Data retrieve', function() {
  //   it('Should retrieve data from test database', function(done) {
  //     uids.find({link: 'https://jsonplaceholder.typicode.com/todos/1'}, (err, uids) => {
  //       console.log(uids);
  //       if(err) {throw err;}
  //       if(uids.length === 0) {throw new Error('No data!');}
  //       done();
  //     });
  //   });
  // });

  // describe('Test to generate hash id and url insert for 10000 request', function() {
  //   it('New data saved to database', function(done) {
  //     for (var i = 0; i <= 10000; i++) {
  //       // it will generate random id (hash value)
  //       var uid = 'localhost:5000/'+shortid.generate();
  //       var url = 'https://jsonplaceholder.typicode.com/todos/1'
  //       var testName = uids({
  //         link: url,
  //         id: uid
  //       });
  //       testName.save();
  //     }
  //     done();
  //   });
  // });


  describe('async Test to generate hash id and url insert for 5000 request', function() {
    it('New data saved to database', function(done) {
      var i = 1;
      var my_task = function(callback) {
        var uid = 'localhost:5000/'+shortid.generate();
        var url = 'https://jsonplaceholder.typicode.com/todos/'+i;
        var testName = uids({
          link: url,
          id: uid
        });
        console.log(i);
        testName.save();
        i++;
       callback();
     };
      var when_done = function(err, results) {console.log('done 5000 request'); done();};

      // create an array of tasks
      // also it can use for more than 5000 but it will serve parallel 5000
      //i.e. var async_queue = Array(100000).fill(my_task); but at a time it will process 5000
      var async_queue = Array(5).fill(my_task);

      async.parallelLimit(async_queue, 5, when_done);
    });
  });



  // describe('Test Database Data retrieve', function() {
  //   it('Should retrieve data from test database', function(done) {
  //     uids.find({}, (err, uids) => {
  //       console.log(uids);
  //       if(err) {throw err;}
  //       if(uids.length === 0) {throw new Error('No data!');}
  //       done();
  //     });
  //   });
  // });


// for (var i = 0; i <= 5000; i++) {
//     var uid = shortid.generate();
//     console.log(uid);
//     uid = "localhost:5000/" + uid;
//     add_link(req.body.mainurl+i,uid);
//   }







  // });
  //After all tests are finished drop database and close connection
  after(function(done){
    // mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  // });
});