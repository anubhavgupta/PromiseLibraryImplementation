// Test Runner
function TestRunner(){
    var $resultsContainer = document.getElementsByClassName("test-results")[0];
    function addResult(name,result){
        var $testName = document.createElement("p");
        var $status = document.createElement("span");
        $testName.innerText = name+" : ";
        $status.innerText = result? "PASS": "FAIL";
        $status.className = result? "PASS": "FAIL";
        $testName.appendChild($status);
        $resultsContainer.appendChild($testName);
    }


    function getExpect(name){
        return function(a,b){
            var result = (a === b);
            addResult(name,result);
        };
    }

    return function(name,fn){
        fn.apply(null,[getExpect(name)])
    };
}

var it = TestRunner();

it("Test Runner should run",function(expect){
    expect(true,true);
});
it("Test Runner should run after 1 sec",function(expect){
    setTimeout(function(){
        expect(true,true);
    },1000);
});



var res, rej;
var succ = function (val) {
    console.log("Pass", val);
    return (new $p(function(res){
        res(
            (new $p(function(res){
              res(9000);
            }))
        );
    }));
};

var fail = function (val) {
    console.log("fail", val);
    return val - 100;
};


var pr = $p(function (re, rj) {
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

//res(200);
 rej(100);
