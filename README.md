# PromiseLibraryImplementation
Implementation of a simple version of Javascript Promise Library

# Please refer ./Test.js for more examples and usecases.


## Quick tutorial:

Using resolve
```
var p = $p(function(resolve,reject){
            resolve(100);
        });
        p.then(function(val){
            console.log(val); // 100
        });
```

Using Reject
```
 var p = $p(function(resolve,reject){
            reject(100);
        });
        p.then(function(val){
            console.log("this part won't run");
        },function(val){
            console.log(val); // 100
        });
```
