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
var shortnerService = require('../shortner.service');
var ourDomainUrl = 'localhost:5000/';
var externalUrl = 'https://jsonplaceholder.typicode.com/todos/1';

//Create a new collection called 'uids'
const uids = mongoose.model('uids', testSchema);


describe('database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()

  before(function (done) {
    mongoose.connect('mongodb://localhost/testDb');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('\n ********** We are connected to test database! ***********\n');
      done();
    });
  });


  describe('Test Database', function() {
    //Save object with 'https://jsonplaceholder.typicode.com/todos/1' value of external url
    it('New uid object saved to test database', function(done) {

      var uid = shortnerService.getUid();
      // it should generate uid object
      var uidObj = shortnerService.getUidObject(ourDomainUrl, externalUrl, uid);
      var testName = uids(uidObj);
      
      testName.save(done);
      console.log(`test5: New uid object saved to test database = ${JSON.stringify(uidObj)} \n`);
    });
  });

  
  describe('Test Database', function() {
    it('Should retrieve data from test database', function(done) {
      //Look up the externalUrl object previously saved.
          uids.find({link: externalUrl}, (err, result) => {
          if(err) {throw err;}
          if(result.length === 0) {throw new Error('No data!');}
          console.log(`test6: retrieve data from test database = ${JSON.stringify(result[0])} \n`);
          done();
        });      
    });
  });

  describe('Test to generate hash id and url insert for 10000 request', function() {
    it('New data saved to database', function(done) {
      var multiArrayOfObj = [];
      console.time('time taken:');
      for (var i = 0; i <= 10000; i++) {
        // it will generate random id (hash value)
        var uid = shortnerService.getUid();
        // it should generate uid object
        var uidObj = shortnerService.getUidObject(ourDomainUrl, externalUrl+i, uid);
        multiArrayOfObj.push(uidObj);
    }
        try {
          uids.insertMany(multiArrayOfObj);              
        } catch (e) {
           console.log(e);
        }
        
        console.log(`test7: generate and insert 10000 data to database`);
        console.timeEnd('time taken:');
        console.log('\n');
        done();
    });
  });

    describe('async Test to generate hash id and url insert for 5000 parallel request', function() {
    it('New data saved to database', function(done) {
      var i = 1;
      console.time('timeTaken:');
      var my_task = function(callback) {
        var uid = shortnerService.getUid();
        // it should generate uid object
        var uidObj = shortnerService.getUidObject(ourDomainUrl, externalUrl+i, uid);
        var testName = uids(uidObj);
        testName.save();
        i++;
       callback();
     };
      var when_done = function(err, results) {
        console.log(`test8: generate and insert 5000 parallel data to database`);
        console.timeEnd('timeTaken:');
        console.log('\n');
         done();
       };

      // create an array of tasks
      // also it can use for more than 5000 but it will serve parallel 5000
      //i.e. var async_queue = Array(100000).fill(my_task); but at a time it will process 5000
      var async_queue = Array(5000).fill(my_task);

      async.parallelLimit(async_queue, 5000, when_done);
    });
  });

  //After all tests are finished drop database and close connection
  after(function(done){
    // mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });


