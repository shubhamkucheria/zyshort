var async = require('async');
var shortnerService = require('../shortner.service');
var ourDomainUrl = 'localhost:5000/';
var externalUrl = 'https://jsonplaceholder.typicode.com/todos/1';


describe('Basic Functionality Tests', function() {
  console.log(`\n ********** Basic Functionality  && Load Tests ***********\n`);
  it('able to generate hash (shortid)', function(done) {
    // it will generate random id (hash value)
    var uid = shortnerService.getUid();
    if (uid.length === 0) {
      throw new Error('test1: Not able to generate hash!\n');
    } else {
      console.log(`test1: generate hash success ${uid}\n`);
    }
    done();
  });

  it('able to generate uid object which include url and shorten url', function(done) {
    // it will generate random id (hash value)
    var uid = shortnerService.getUid();
    // it should generate uid object
    var uidObj = shortnerService.getUidObject(ourDomainUrl, externalUrl, uid);
    if (uidObj.link === externalUrl && uidObj.id === ourDomainUrl+uid) {
      console.log(`test2: generate uid object success ${JSON.stringify(uidObj)}\n`);
      done();
    } else {
      throw new Error('test2: Not able to generate hash!\n');
    }
  });
});

describe('able to generate uid object which include url and shorten url for 10000 request', function() {
  it('10000 sequential request', function(done) {
    console.time('time taken:');
    for (var i = 0; i <= 10000; i++) {
      // it will generate random id (hash value)
      var uid = shortnerService.getUid();
      var uidObj = shortnerService.getUidObject(ourDomainUrl, externalUrl, uid);
    }
    console.log(`test3: test success for 10000 sequential request`);
    console.timeEnd('time taken:');
    console.log('\n');
    done();
  });
});

  describe('async Test to generate uid object which include url and shorten url for 5000 request', function() {
    it('5000 parallel request', function(done) {
      var my_task = function(callback) {
        var uid = shortnerService.getUid();
        var uidObj = shortnerService.getUidObject(ourDomainUrl, externalUrl, uid);
       callback();
     };
      var when_done = function(err, results) {
        console.log('test4: test sucess for 5000 parallel request'); 
        console.timeEnd('time taken: async');
        console.log('\n');
        done();
      };

      // create an array of tasks
      // also it can use for more than 5000 but it will serve parallel 5000
      //i.e. var async_queue = Array(100000).fill(my_task); but at a time it will process 5000
      console.time('time taken: async');
      var async_queue = Array(5000).fill(my_task);

      async.parallelLimit(async_queue, 5000, when_done);
    });
  });