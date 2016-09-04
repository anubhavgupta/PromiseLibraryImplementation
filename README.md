# PromiseLibraryImplementation
Custom full implementation of Javascript Promises.

# Please refer ./Test.js for more examples and usecases.


## Quick tutorial:

Using resolve
```js
var p = $p(function(resolve,reject){
            resolve(100);
        });
        p.then(function(val){
            console.log(val); // 100
        });
```

Using Reject
```js
 var p = $p(function(resolve,reject){
            reject(100);
        });
        p.then(function(val){
            console.log("this part won't run");
        },function(val){
            console.log(val); // 100
        });
```
