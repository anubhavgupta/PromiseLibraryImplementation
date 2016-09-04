// Test Runner
function TestRunner(){
    var $resultsContainer = document.getElementsByClassName("test-results")[0];
    var $status = document.getElementsByClassName("status")[0];
    var totalTests = 0,
        totalResults = 0;
    function addResult(name,result,expectedValue,actualValue){
        var $testName = document.createElement("p");
        var $status = document.createElement("span");
        $testName.innerText = name+" : ";
        $status.innerText = result? "PASS": "FAIL: expected value:("+ expectedValue+", actual value:"+actualValue+")";
        $status.className = result? "PASS": "FAIL";
        $testName.appendChild($status);
        $resultsContainer.appendChild($testName);
    }

    function updateStatus(){
     $status.innerText = totalResults+" / "+totalTests;
    }



    function getExpect(name){
        return function(a,b){
            totalResults++;
            var result = (a === b);
            addResult(name,result, b,a);
            updateStatus();
        };
    }

    return function(name,fn){
        totalTests++;
        updateStatus();
        fn.apply(null,[getExpect(name)])
    };
}

var it = TestRunner();


// Test runner specs;
it("Test Runner should run",function(expect){
    expect(true,true);
});
it("Test should run after 1 sec",function(expect){
    setTimeout(function(){
        expect(true,true);
    },1000);
});


// Specs for Promise Lib:
setTimeout(function(){


    it("Promise should be resolved immediately",function(ex){
        var p = $p(function(res){
            res(100);
        });
        p.then(function(val){
            ex(val,100);
        });
    });
    it("Promise should be rejected immediately",function(ex){
        var p = $p(function(res,rej){
            rej(100);
        });
        p.then(function(val){
            ex(val,200);
        },function(val){
            ex(val,100);
        });
    });

    it("Promise should be resolved after 500 ms",function(ex){
        var p = $p(function(res){
            setTimeout(function(){
                res(100);
            },500)

        });
        p.then(function(val){
            ex(val,100);
        });
    });

    it("Promise should be rejected after 500 ms",function(ex){
        var p = $p(function(res,rej){
            setTimeout(function(){
                rej(100);
            },500)

        });
        p.then(function(val){
            ex(val,200);
        },function(val){
            ex(val,100);

        });
    });
it("Promise should be resolved after 500 ms with chaining",function(ex){
        var p = $p(function(res){
            setTimeout(function(){
                res(100);
            },500)
        });
        p
        .then(function(val){
            return 200;
        })
        .then(function(val){
            ex(val,200);
        });
    });

    it("Promise should be rejected after 500 ms with chaining",function(ex){
        var p = $p(function(res,rej){
            setTimeout(function(){
                rej(100);
            },500)
        });
        p.then(function(val){
            ex(val,"Won't run");
        },function(val){
            return val+200;
        })
        .then(function(val){
            ex(val,300);
        },function(val){
            ex(val,"Won't run");
        });
    });
    it("Promise should be rejected after 500 ms with chaining including multiple rejection",function(ex){
        var p = $p(function(res,rej){
            setTimeout(function(){
                rej(100);
            },500)
        });
        p.then(function(val){
            ex(val,"Won't run");
        },function(val){
            return $p.reject(300);
        })
        .then(function(val){
            ex(val,"Won't run");
        },function(val){
            ex(val,300);
        });
    });

    it("Promises should work with nested promises:resolve",function(ex){

        var res, rej;
        var succ = function (val) {
            return (new $p(function(res){
                res(
                    (new $p(function(res){
                        res(9000);
                    }))
                );
            }));
        };

        var fail = function (val) {
            return val - 100;
        };


        var pr = $p(function (re, rj) {
            res = re;
            rej = rj;
        });

        pr
            .then(succ,fail)
            .then(succ,fail)
            .then(function(res){
                ex(res,9000);
            });

        res(200);
    });

    it("Promises should work with nested promises:reject",function(ex){

        var res, rej;
        var succ = function (val) {
            return (new $p(function(res){
                res(
                    (new $p(function(res){
                        res(9000);
                    }))
                );
            }));
        };

        var fail = function (val) {
            return val - 100;
        };


        var pr = $p(function (re, rj) {
            res = re;
            rej = rj;
        });

        pr
            .then(succ,fail)
            .then(succ,fail)
            .then(function(res){
                ex(res,9000);
            });

        rej(100);
    });

    it("Promises should work with nested promises:all reject case",function(ex){

        var res, rej;
        var succ = function (val) {
            return (new $p(function(res){
                res(
                    (new $p(function(res){
                        res(9000);
                    }))
                );
            }));
        };

        var fail = function (val) {
            console.log("asdasd");
            return $p.reject(val - 100);
        };


        var pr = $p(function (re, rj) {
            res = re;
            rej = rj;
        });

        pr
            .then(succ,fail)
            .then(succ,fail)
            .then(function(res){
                ex(res,"Won't run");
            },function(res){
                ex(res,-100);
            });

        rej(100);
    });

},1200);


