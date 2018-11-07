/*var async = require('async');
var shortnerService = require('../shortner.service');
var ourDomainUrl = 'localhost:5000/';
var externalUrl = 'https://jsonplaceholder.typicode.com/todos/1';
*/
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});


/*describe('Functionality Tests', function() {
    it('able to generate hash (shortid)', function(done) {
      // it will generate random id (hash value)
      let uid = shortnerService.getUid();
      if (uid.length === 0) {
        throw new Error('Not able to generate hash!');
      } else {
        console.log(`generate hash success ${uid}`);
      }
      done();
    });

    it('able to generate uid object which include url and shorten url', function(done) {
      // it will generate random id (hash value)
      let uid = shortnerService.getUid();
      // it should generate uid object
      let uidObj = shortnerService.getUidObject(ourDomainUrl, externalUrl, uid);
      if (uidObj.link === externalUrl && uidObj.id === ourDomainUrl+uid) {
        console.log(`generate uid object success ${JSON.stringify(uidObj)}`);
        done();
      } else {
        throw new Error('Not able to generate hash!');
      }
    });
  });
*/

// describe('Functionality Tests', function() {
//     it('New data saved to database', function(done) {
//       // it will generate random id (hash value)
//       var uid = 'localhost:5000/'+ shortnerService.getUid();
//       var url = 'https://jsonplaceholder.typicode.com/todos/1'
//       var testName = uids({
//         link: url,
//         id: uid
//       });
//       console.log(testName);
//       done();

//       // testName.save(done);
//     });

//     it('New data saved to database', function(done) {
//       // it will generate random id (hash value)
//       shortnerService.getUidObject();
//       done();

//       testName.save(done);
//     });
//   });

// describe('Functionality Tests', function() {
//   //Before starting the test, create a sandboxed database connection
//   //Once a connection is established invoke done()
//   before(function (done) {
//     mongoose.connect('mongodb://localhost:27017/database');
//     const db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error'));
//     db.once('open', function() {
//       console.log('We are connected to test database!');
//       done();
//     });
//   });



// describe('Functionality Tests', function() {
//   //Before starting the test, create a sandboxed database connection
//   //Once a connection is established invoke done()
//   before(function (done) {
//     mongoose.connect('mongodb://localhost:27017/database');
//     const db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error'));
//     db.once('open', function() {
//       console.log('We are connected to test database!');
//       done();
//     });
//   });


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


  /*describe('async Test to generate hash id and url insert for 5000 request', function() {
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
  */
  // after(function(done){
    // mongoose.connection.db.dropDatabase(function(){
      // mongoose.connection.close(done);
    // });
  // });
// });