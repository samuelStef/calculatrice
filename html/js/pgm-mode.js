/* This part is for the programmer mode */
var isProgrammer = false;
function enableProgrammerMode() {
    if(document.getElementsByTagName("html")[0].offsetWidth <= 700) {
        errorScreen("Must be in \"More options Mode\" !");
        return false;
    }
    if(isProgrammer) {
        isProgrammer = false;
        document.getElementById("moreBtn").setAttribute("onclick", "moreFunctions()");
    } else {
        isProgrammer = true;
        document.getElementById("moreBtn").setAttribute("onclick", "pgmModeFunc()");
        window.setTimeout(function() {
            pgmModeFunc();
        }, 300);
    }
    options();
}
var isPgmModeFunc = false;
function pgmModeFunc() {
    if(isPgmModeFunc) {
        isPgmModeFunc = false;
        document.getElementsByClassName("logicAction")[0].style.height = "0px";
    } else {
        isPgmModeFunc = true;
        if(document.getElementsByTagName("html")[0].offsetWidth >= 700) {
            document.getElementsByClassName("logicAction")[0].style.height = "60px";
        } else {
            errorScreen("Go in \"More options\" mode for using it");
        }
    }
}
var isActivatedBinaryBox = false;
function binaryBox() {
    if(isActivatedBinaryBox) {
        isActivatedBinaryBox = false;
        document.getElementsByClassName("history")[0].style.flex = "1";
        document.getElementsByClassName("binaryBox")[0].style.flex = "0";
    } else {
        isActivatedBinaryBox = true;
        document.getElementsByClassName("history")[0].style.flex = "0";
        document.getElementsByClassName("binaryBox")[0].style.flex = "1";
    }
}
function toBinary(n) {
    var inBinary = "";
    while(n > 1) {
        if(n % 2 == 0) {
            inBinary += "0";
        } else {
            inBinary += "1";
        }
        n = Math.floor(n / 2);
    }
    if(n == 1) {
        inBinary += "1";
    }
    var bin = ""
    for(var i = inBinary.length-1; i >= 0; i--) {
        bin += inBinary[i];
    }
    return bin;
}
function toHex(n) {
    if(n == 0) {
        return 0;
    }
    var inHex = "", alpha = "0123456789ABCDEF";
    while(n > 1) {
        var moduloResult = n % 16;
        inHex += alpha[moduloResult];
        n = Math.floor(n / 16);
    }
    if(n != 0) {
        inHex += alpha[n];
    }
    var hex = ""
    for(var i = inHex.length-1; i >= 0; i--) {
        hex += inHex[i];
    }
    return hex;
}
function toHeightBase(n) {
    if(n == 0) {
        return 0;
    }
    var inHeight = "", alpha = "01234567";
    while(n > 1) {
        var moduloResult = n % 8;
        inHeight += alpha[moduloResult];
        n = Math.floor(n / 8);
    }
    if(n != 0) {
        inHeight += alpha[n];
    }
    var height = ""
    for(var i = inHeight.length-1; i >= 0; i--) {
        height += inHeight[i];
    }
    return height;
}
function binToDec(x) {
    this.x = "";
    for(var i = x.length-1; i >= 0; i--) {
        this.x += x[i];
    }
    x = this.x;
    var rs = 0;
    for(var i = 0; i < x.length; i++) {
        if(x[i] == "1") {
            rs += Math.pow(2, i);
        }
    }
    return rs;
}
function changeBit(who) {
    var bin = document.getElementById("binaryP").textContent.split(" ").join('').split("");
    if(bin[who] == 0) {
        bin[who] = 1;
    } else {
        bin[who] = 0;
    }
    var dec = binToDec(bin.join('')).toString();
    delAll();
    for(var i = 0; i < dec.length; i++) {
        addInSentence(dec[i]);
    }
}
var lastRs = -1;
window.setInterval(function() {
    if(isActivatedBinaryBox) {
        var rs = document.getElementById("result").textContent;
        if(rs == lastRs) {
            return false;
        } else {
            lastRs = rs;
        }
        if(rs == "") {
            rs = "0";
        } else if(rs.indexOf("=") >= 0) {
            rs = rs.split("=")[1];
        }
        if(Number(rs).toString() == "NaN") {
            return false;
        } else {
            var inBin = toBinary(Number(rs)), inHex = toHex(Number(rs)), inHeight = toHeightBase(Number(rs));
            while(inBin.length < 128) {
                inBin = "0" + inBin;
            }
            if(!(inBin.length > 128)) {
                var inBinForP = "";
                for(var i = 0; i < inBin.length; i++) {
                    if(i % 64 == 0) {
                        inBinForP += "<br />"
                    }
                    else if(i % 8 == 0) {
                        inBinForP += " ";
                    }
                    inBinForP += "<span onclick=\"changeBit(" + i + ")\">" + inBin[i] + "</span>";
                }
                document.getElementById("binaryP").innerHTML = inBinForP;
            }
            document.getElementById("hexP").innerHTML = "base<sub>16</sub> = " + inHex;
            document.getElementById("heightP").innerHTML = "base<sub>8</sub> = " + inHeight;
        }
    } else {
        return false;
    }
}, 100);
function NOT(x) { if(x % 2 == 0) { return 0; } else { return 1; } }
function OR() {
    if(arguments.length > 0) {
        for(i = 0; i < arguments.length; i++) {
            if(arguments[i] % 2 == 1) {
                return 1;
            }
        }
        return 0;
    }
}
function AND() {
    if(arguments.length > 0) {
        for(i = 0; i < arguments.length; i++) {
            if(arguments[i] % 2 == 0) {
                return 0;
            }
        }
        return 1;
    }
}
function NOR() {
    if(arguments.length > 0) {
        for(i = 0; i < arguments.length; i++) {
            if(arguments[i] % 2 == 1) {
                return 0;
            }
        }
        return 1;
    }
}
function XOR() {
    if(arguments.length > 0) {
        var numberOf1 = 0, numberOf0 = 0;
        for(i = 0; i < arguments.length; i++) {
            if(arguments[i] % 2 == 1) {
                numberOf1 += 1;
            } else {
                numberOf0 += 1;
            }
        }
        if(numberOf0 > 0 && numberOf1 > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}
function NAND() {
    if(arguments.length > 0) {
        for(i = 0; i < arguments.length; i++) {
            if(arguments[i] % 2 == 0) {
                return 1;
            }
        }
        return 0;
    }
}
