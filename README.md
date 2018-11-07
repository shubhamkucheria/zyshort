# zyshort
zyshort is url shortner web app <br>
webapp to shorten the url to websites and use them.

## Getting started
zyshort for your Local Host as well as deployed to heroku <br>
check it out [zyshort](https://zyshort.herokuapp.com) <br>


### Including tests
```
Basic Functionality Tests
* able to generate uid (hash)
* able to generate uid object which include url and shorten url
* able to generate uid object which include url and shorten url for 10000 request
* able to generate uid object which include url and shorten url for 5000 request parallel

database Tests
* create db connection
* database connection establishment test
* New uid object saved to test database
* uid object get from test database
* Test to generate hash id and url insert in db for 10000 request
* Test to generate hash id and url insert in db for 5000 parallel request
```

output

```
********** Basic Functionality  && Load Tests ***********


test1: generate hash success NtzmginkW

test2: generate uid object success {"link":"https://jsonplaceholder.typicode.com/todos/1","id":"localhost:5000/qLVD2ZtkJe"}

test3: test success for 10000 sequential request
time taken:: 230ms


test4: test sucess for 5000 parallel request
time taken: async: 132ms


 ********** We are connected to test database! ***********

test5: New uid object saved to test database = {"link":"https://jsonplaceholder.typicode.com/todos/1","id":"localhost:5000/6mTafEvr4lHXa"} 

test6: retrieve data from test database = {"_id":"5be3552c27aac31496a2b78c","link":"https://jsonplaceholder.typicode.com/todos/1","id":"localhost:5000/QbH-t_e4iM3vV","__v":0} 

test7: generate and insert 10000 data to database
time taken:: 250ms


test8: generate and insert 5000 parallel data to database
timeTaken : : 646ms

```

## How to use?
Make sure you have *node*, *npm*, *mocha (for test)* installed.
  <br>
  * install all depedencies with npm install
    <pre> npm install </pre>
 
Finally:
  * run tests
      <pre> mocha </pre>
  * run mongodb
      <pre> mongod </pre>
  * run app.js
      <pre> node app.js</pre>
  * open the localhost
      <pre>localhost:5000/short<pre>
Or:
  * check it out here
      <pre> [zyshort](https://zyshort.herokuapp.com) </pre>

<br>      

## By
[Shubham Kucheria](https://github.com/shubhamkucheria)
