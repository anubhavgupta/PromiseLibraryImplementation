var res, rej;
var succ = function (val) {
    console.log("Pass", val);
    return (new promise(function(res){
        res(
            (new promise(function(res){
              res(9000);
            }))
        );
    }));
};

var fail = function (val) {
    console.log("fail", val);
    return val - 100;
};


var pr = P(function (re, rj) {
    console.log("Testing...");
    res = re;
    rej = rj;
});

pr
    .then(succ,fail)
    .then(succ,fail)
    .then(function(res){
     console.log("Final result:",res);
    });

res(200);
// rej(100);
