// Redifining Math functions
function inRadian(deg) {
    return ((deg * Math.PI) / 180);
}
var sin   = function(v) { return Math.sin(inRadian(v)); }
var cos   = function(v) { return round(Math.cos(inRadian(v)), 10); }
var tan   = function(v) { return Math.tan(inRadian(v)); }
var log   = function(v) { return Math.log10(v); }
var ln    = function(v) { return Math.log(v); }
var abs   = function(v) { return Math.abs(v); }
var ceil  = function(v) { return Math.ceil(v); }
var floor = function(v) { return Math.floor(v); }

var ans = 0;
var sentence = "", action = [];
function addInSentence(what) {
    var added; // Must be String
    try {
        whatTesting = Number(what);
        if(whatTesting.toString() == "NaN" || what == "(") {
            console.log(thisIsAnUndefinedVariable);
        }
        added = what.toString();
    } catch(e) {
        if(what == "+" || what == "-" || what == "*" || what == "/" || what == "%" ||  what == ")" || what == ".") {
            added = what;
        } else {
            if(what == "10x") {
                added = "**";
            } else if(what == "sin()") {
                added = "sin\(";
            } else if(what == "cos()") {
                added = "cos\(";
            } else if(what == "tan()") {
                added = "tan\(";
            } else if(what == "(") {
                added = "\(";
            } else if(what == "log()") {
                added = "log\(";
            } else if(what == "sinh()") {
                added = "Math.sinh\(";
            } else if(what == "cosh()") {
                added = "Math.cosh\(";
            } else if(what == "tanh()") {
                added = "Math.tanh\(";
            } else if(what == "ln()") {
                added = "ln\(";
            } else if(what == "π") {
                added = "Math.PI";
            } else if(what == "sqrt()") {
                added = "Math.sqrt\(";
            } else if(what == "abs()") {
                added = "Math.abs\(";
            } else if(what == "root()") {
                added = "root\(";
            } else if(what == "factor()") {
                added = "factor\(";
            } else if(what == "gcd()") {
                added = "gcd\(";
            } else if(what == "lcm()") {
                added = "lcm\(";
            } else if(what == "sum()") {
                added = "sum\(";
            } else if(what == "prod()") {
                added = "prod\(";
            } else if(what == "dot()") {
                added = "dot\(";
            } else if(what == "range()") {
                added = "createRange\(";
            }
        }
    }
    if(typeof added != "undefined") {
        sentence += added; action[action.length] = added;
        loadToEdit();
        return true;
    } else {
        sentence += what; action[action.length] = what;
        loadToEdit();
        return false;
    }
}
