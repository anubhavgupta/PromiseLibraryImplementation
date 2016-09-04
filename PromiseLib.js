function promise(fn, res, rej) {
    this.isComplete = false;
    this.isResolved = null;
    this.value = null;
    this.stack = [];
    var self = this;

    var complete = function (val, rfn) {
        if (rfn) {
            self.value = rfn.apply(null, [val]);
        }
        else {
            self.value = val;
        }

        if (self.value instanceof promise) {
            self.value.then(function (value) {
                self.isComplete = true;
                self.isResolved = true;
                self.value = value;
                while (self.stack.length) {
                    var top = self.stack.shift();
                    top[0](self.value);
                }
                return self.value;
            }, function (value) {
                self.isComplete = true;
                self.isResolved = false;
                self.value = value;
                while (self.stack.length) {
                    var top = self.stack.shift();
                    top[1](value);
                }
                return self.value;
            });
        }
        else {
            self.isComplete = true;
            self.isResolved = true;
            while (self.stack.length) {
                var top = self.stack.shift();
                top[0](self.value);
            }
        }
    };

    //hooks
    var fRes = function (val) {
        complete(val, res);
    };
    var fRej = function (val) {
        complete(val, rej);
    };
    fn.apply(this, [fRes, fRej]);
};

promise.prototype = {
    then: function (s, f) {
        var self = this;
        return (new promise(function (sc, fa) {
            if (self.isComplete) {
                if (self.isResolved) {
                    sc(self.value);
                }
                else {
                    fa(self.value);
                }
            }
            else {
                self.stack.push([sc, fa]);
            }
        }, s, f));
    }
};

var resolve = function (val) {
    var p = new P(function (res) {
        res(val);
    });
    return p;
};

var reject = function (val) {
    var p = new promise(function(){});
    p.isComplete = true;
    p.isResolved = false;
    p.value = val;
    return p;
};


function P(fn) {
    return (new promise(fn,function(i){return i;},reject));
};
P.reject = reject;
P.resolve = resolve;

