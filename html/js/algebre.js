// Return the n root of x
function root(x, n=2) {
    var rs = 0;
    for(var i = 0; i < x; i++) {
        var clc = 1;
        for(var j = 0; j < n; j++) {
            clc *= i;
        }
        if(clc > x) {
            rs = (i-1).toString() + ".";
            break;
        } else if(clc == x) {
            return i;
        }
    }
    while(rs.toString().length < 10) {
        for(var i = 0; i < 10; i++) {
            var rs2 = Number(rs.toString() + i.toString()), clc = 1;
            for(var j = 0; j < n; j++) {
                clc *= rs2;
            }
            if(clc > x || i == 9) {
                rs += (i-1).toString();
                break;
            } else if(clc == x) {
                return rs+(i-1).toString();
            }
        }
    }
    return Number(rs);
}
// Return the gcd of two numbers
function gcd(n1, n2) {
    var dv1 = [1], dv2 = [1];
    for(var i = 2; i <= n1; i++) {
        if(n1 % i == 0) {
            dv1[dv1.length] = i;
        }
    }
    for(var i = 2; i <= n2; i++) {
        if(n2 % i == 0) {
            dv2[dv2.length] = i;
        }
    }
    var gcdResult1 = 1, gcdResult2 = 1;
    for(var i = 0; i < dv1.length; i++) {
        for(var j = 0; j < dv2.length; j++) {
            if(dv1[i] == dv2[j]) {
                gcdResult1 = dv1[i];
            }
        }
    }
    for(var i = 0; i < dv2.length; i++) {
        for(var j = 0; j < dv1.length; j++) {
            if(dv2[i] == dv1[j]) {
                gcdResult2 = dv2[i];
            }
        }
    }
    if(gcdResult1 == gcdResult2) {
        return gcdResult1;
    } else if(gcdResult1 > gcdResult2) {
        return gcdResult1;
    } else {
        return gcdResult2;
    }
}
// Return the lcm of two numbers
function lcm(n1, n2) {
    // n1 will be the lowest int, n2, the greatest
    var ml1 = [], ml2 = [];
    if(n1 > n2) {
        [n1, n2] = [n2, n1];
    } else if(n1 == n2) {
        return n1;
    }
    for(var i = 1; i <= n2; i++) {
        ml1[ml1.length] = n1 * i;
    }
    for(var i = 1; i <= n1; i++) {
        ml2[ml2.length] = n2 * i;
    }
    var lcmResult = n1 * n2;
    for(var i = 0; i < ml1.length; i++) {
        for(var j = 0; j < ml2.length; j++) {
            if(ml1[i] == ml2[j]) {
                lcmResult = ml1[i];
                break;
            }
        }
        if(lcmResult != (n1 * n2)) {
            break;
        }
    }
    return lcmResult;
}
// Return the number as a product of prime factor (thanks Google translate...)
function factor(n) {
    var listPrimeNum = [];
    for(var i = 2; i <= n; i++) {
        var dv = [];
        for(var j = 1; j <= i; j++) {
            if(i % j == 0) {
                dv[dv.length] = j;
            }
        }
        if(dv.length == 2) {
            listPrimeNum[listPrimeNum.length] = i;
        }
    }
    var mltpl = [n], canContinue = false;
    do {
        var mltpl2 = [], canContinue = true;
        for(var i = 0; i < mltpl.length; i++) {
            for(var j = listPrimeNum.length; j >= 0; j--) {
                if(mltpl[i] == listPrimeNum[j]) {
                    mltpl2[mltpl2.length] = listPrimeNum[j];
                    break;
                }
                if(mltpl[i] % listPrimeNum[j] == 0) {
                    mltpl2[mltpl2.length] = mltpl[i] / listPrimeNum[j];
                    mltpl2[mltpl2.length] = listPrimeNum[j];
                    canContinue = false;
                    break;
                }
            }
        }
        mltpl = mltpl2;
    } while(!canContinue)
    if(mltpl.length == 1) {
        return mltpl;
    } else {
        var sntc = "";
        for(var i = 0; i < mltpl.length; i++) {
            sntc += mltpl[i].toString();
            if(i != mltpl.length-1) {
                sntc += "*";
            }
        }
        return sntc;
    }
}
// Return the sum using a function f. It can accept three var : x, y and z inside f.
function sum(f, xval=[], yval=[], zval=[]) {
    var expr = [""], whereInExpr = 0;
    for(i = 0; i < f.length; i++) {
        if(f[i] != "x" && f[i] != "y" && f[i] != "z") {
            expr[whereInExpr] += f[i];
        } else {
            expr[expr.length] = f[i];
            whereInExpr += 2;
            expr[whereInExpr] = "";
        }
    }
    var rs = 0;
    if(yval.length > 0 && zval.length == 0) {
        if(yval.length != xval.length) {
            errorScreen("y list must have the same length than x list");
            return false;
        } else {
            for(var i = 0; i < xval.length; i++) {
                var x = xval[i], y = yval[i], clc = "";
                for(var j = 0; j < expr.length; j++) {
                    if(expr[j] != "x" && expr[j] != "y" && expr[j] != "z") {
                        clc += expr[j];
                    } else {
                        if(expr[j] == "x") {
                            clc += x.toString();
                        } else {
                            clc += y.toString();
                        }
                    }
                }
                rs += eval(clc);
            }
        }
    } else if(yval.length > 0 && zval.length > 0) {
        if(yval.length != xval.length) {
            errorScreen("y list must have the same length than x list");
            return false;
        } else if(zval.length != xval.length) {
            errorScreen("z list must have the same length than x list");
            return false;
        } else {
            for(var i = 0; i < xval.length; i++) {
                var x = xval[i], y = yval[i], z = zval[i], clc = "";
                for(var j = 0; j < expr.length; j++) {
                    if(expr[j] != "x" && expr[j] != "y" && expr[j] != "z") {
                        clc += expr[j];
                    } else {
                        if(expr[j] == "x") {
                            clc += x.toString();
                        } else if(expr[j] == "y") {
                            clc += y.toString();
                        } else {
                            clc += z.toString();
                        }
                    }
                }
                rs += eval(clc);
            }
        }
    } else {
        for(var i = 0; i < xval.length; i++) {
            var x = xval[i], clc = "";
            for(var j = 0; j < expr.length; j++) {
                if(expr[j] != "x" && expr[j] != "y" && expr[j] != "z") {
                    clc += expr[j];
                } else {
                    clc += x.toString();
                }
            }
            rs += eval(clc);
        }
    }
    return rs;
}
// Like sum, but it's the product... I enjoyed copy + past all text above.
function prod(f, xval=[], yval=[], zval=[]) {
    var expr = [""], whereInExpr = 0;
    for(i = 0; i < f.length; i++) {
        if(f[i] != "x" && f[i] != "y" && f[i] != "z") {
            expr[whereInExpr] += f[i];
        } else {
            expr[expr.length] = f[i];
            whereInExpr += 2;
            expr[whereInExpr] = "";
        }
    }
    var rs = 1;
    if(yval.length > 0 && zval.length == 0) {
        if(yval.length != xval.length) {
            errorScreen("y list must have the same length than x list");
            return false;
        } else {
            for(var i = 0; i < xval.length; i++) {
                var x = xval[i], y = yval[i], clc = "";
                for(var j = 0; j < expr.length; j++) {
                    if(expr[j] != "x" && expr[j] != "y" && expr[j] != "z") {
                        clc += expr[j];
                    } else {
                        if(expr[j] == "x") {
                            clc += x.toString();
                        } else {
                            clc += y.toString();
                        }
                    }
                }
                rs *= eval(clc);
            }
        }
    } else if(yval.length > 0 && zval.length > 0) {
        if(yval.length != xval.length) {
            errorScreen("y list must have the same length than x list");
            return false;
        } else if(zval.length != xval.length) {
            errorScreen("z list must have the same length than x list");
            return false;
        } else {
            for(var i = 0; i < xval.length; i++) {
                var x = xval[i], y = yval[i], z = zval[i], clc = "";
                for(var j = 0; j < expr.length; j++) {
                    if(expr[j] != "x" && expr[j] != "y" && expr[j] != "z") {
                        clc += expr[j];
                    } else {
                        if(expr[j] == "x") {
                            clc += x.toString();
                        } else if(expr[j] == "y") {
                            clc += y.toString();
                        } else {
                            clc += z.toString();
                        }
                    }
                }
                rs *= eval(clc);
            }
        }
    } else {
        for(var i = 0; i < xval.length; i++) {
            var x = xval[i], clc = "";
            for(var j = 0; j < expr.length; j++) {
                if(expr[j] != "x" && expr[j] != "y" && expr[j] != "z") {
                    clc += expr[j];
                } else {
                    clc += x.toString();
                }
            }
            rs *= eval(clc);
        }
    }
    return rs;
}
// Return a list of numbers
function createRange(n1, n2, pas) {
    var L = [];
    if(typeof pas != "undefined") {
        var multiple = 1;
        while(pas < 1) {
            multiple *= 10; pas *= 10; n1 *= 10; n2 *= 10;
        }
        for(var i = n1; i < n2; i += pas) {
            L[L.length] = i / multiple;
        }
    } else {
        for(var i = n1; i <= n2; i++) {
            L[L.length] = i;
        }
    }
    return L;
}
