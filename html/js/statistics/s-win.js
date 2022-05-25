const tbl = document.getElementsByTagName("table")[0];
for(var i = tbl.childNodes[1].childNodes.length-1; i >= 0; i--) {
    if(tbl.childNodes[1].childNodes[i].nodeType == 3) {
        tbl.childNodes[1].removeChild(tbl.childNodes[1].childNodes[i]);
    }
}
window.setInterval(function() {
    if(tbl.childNodes[1].childNodes[tbl.childNodes[1].childNodes.length-1].getElementsByTagName("td")[0].querySelector("input").value.length > 0) {
        var tr = document.createElement("tr");
        for(var i = 0; i < 2; i++) {
            let td = document.createElement("td");
            let input = document.createElement("input");
            input.type = "text"; input.value = "";
            td.appendChild(input);
            tr.appendChild(td);
        }
        tbl.childNodes[1].appendChild(tr);
        if(tbl.childNodes[1].childNodes.length % 2 == 1) {
            tr.style.background = "#333";
        } else {
            tr.style.background = "#191919";
        }
    }
}, 200);
var whereAmI = [0, 1];
window.onkeydown = function(e) {
    if(e.target.selectionStart > 0 && e.target.selectionStart < e.target.value.length) {
        return true;
    } else if(e.keyCode == 37) {
        whereAmI[0] -= 1;
        if(whereAmI[0] < 0) {
            whereAmI[0] = 0;
        }
    } else if(e.keyCode == 39) {
        whereAmI[0] += 1;
        if(whereAmI[0] > 1) {
            whereAmI[0] = 1;
        }
    } else if(e.keyCode == 38) {
        whereAmI[1] -= 1;
        if(whereAmI[1] < 1) {
            whereAmI[1] = 1;
        }
    } else if(e.keyCode == 40) {
        whereAmI[1] += 1;
        if(whereAmI[1] > tbl.childNodes[1].childNodes.length-1) {
            whereAmI[1] = tbl.childNodes[1].childNodes.length-1;
        }
    } else {
        return true;
    }
    if(!isDisplayedCalc) {
        tbl.childNodes[1].childNodes[whereAmI[1]].getElementsByTagName("td")[whereAmI[0]].querySelector("input").focus();
        if(whereAmI[0] == 1 && tbl.childNodes[1].childNodes[whereAmI[1]].getElementsByTagName("td")[whereAmI[0]].querySelector("input").value.length > 1) {
            tbl.childNodes[1].childNodes[whereAmI[1]].getElementsByTagName("td")[whereAmI[0]].querySelector("input").selectionStart = 0; tbl.childNodes[1].childNodes[whereAmI[1]].getElementsByTagName("td")[whereAmI[0]].querySelector("input").selectionEnd = 0;
        }
    } else if(document.getElementsByTagName("table")[2].getElementsByTagName("tr").length > 1) {
        document.getElementsByTagName("table")[2].getElementsByTagName("tr")[whereAmI[1]].getElementsByTagName("td")[1].querySelector("input").focus();
    }
}
var isDisplayedCalc = false;
document.getElementById("btnCalc").addEventListener("click", function() {
    if(isDisplayedExp) {
        exp();
        return true;
    } else if(isDisplayedCalc) {
        document.getElementsByTagName("article")[0].style.flex = "1";
        document.getElementsByTagName("article")[1].style.flex = "0";
        document.getElementsByTagName("article")[2].style.flex = "0";
        isDisplayedCalc = false;
        whereAmI = [0, 1];
    } else {
        removeEmptyTd();
        goToCalculated();
    }
});
function goToCalculated(how) {
    for(var i = 0; i < document.getElementsByTagName("article").length; i++) {
        if(i == 1) {
            continue;
        }
        document.getElementsByTagName("article")[i].style.flex = "0";
    }
    document.getElementsByTagName("article")[1].style.flex = "1";
    document.querySelector("footer").getElementsByTagName("button")[1].style.height = "0px";
    document.querySelector("footer").querySelector("div").style.bottom = "0px";
    isDisplayedCalc = true;
    // Let's calculate the stats !
    var valueFromTbl = [];
    for(var i = 2; i < document.getElementsByTagName("table")[0].getElementsByTagName("td").length-2; i+=2) {
        valueFromTbl[valueFromTbl.length] = [Number(document.getElementsByTagName("table")[0].getElementsByTagName("td")[i].querySelector("input").value), Number(document.getElementsByTagName("table")[0].getElementsByTagName("td")[i+1].querySelector("input").value)]
    }
    var minVal, maxVal, mean = 0, sum, value = [];
    for(var i = 0; i < valueFromTbl.length; i++) {
        if(i == 0) {
            minVal = valueFromTbl[i][0];
            maxVal = minVal;
        } else {
            if(valueFromTbl[i][0] < minVal) {
                minVal = valueFromTbl[i][0];
            } else if(valueFromTbl[i][0] > maxVal) {
                maxVal = valueFromTbl[i][0];
            }
        }
        for(var j = 0; j < valueFromTbl[i][1]; j++) {
            value[value.length] = valueFromTbl[i][0];
            mean += valueFromTbl[i][0];
        }
    }
    if(typeof how != "undefined") {
        value = how;
    }
    sum = mean;
    mean /= value.length;
    var mediane, firstQ, thirdQ;
    if(value.length % 2 == 0) {
        mediane = (value[value.length / 2] + value[(value.length / 2) + 1]) / 2;
    } else {
        mediane = value[(value.length / 2) + 0.5]
    }
    if(((value.length + 3) / 4).toString().indexOf(".") >= 0) {
        firstQ = (value[Math.floor((value.length + 3) / 4)] + value[Math.ceil((3 * value.length + 3) / 4)]) / 2;
    } else {
        firstQ = value[(value.length + 3) / 4];
    }
    if(((3* value.length + 3) / 4).toString().indexOf(".") >= 0) {
        thirdQ = (value[Math.floor((3 * value.length + 3) / 4)] + value[Math.ceil((3 * value.length + 3) / 4)]) / 2;
    } else {
        thirdQ = value[(3 * value.length + 3) / 4];
    }
    var standardDerivation = 0;
    for(var i = 0; i < value.length; i++) {
        standardDerivation += Math.pow(value[i]-mean, 2);
    }
    standardDerivation /= value.length;
    standardDerivation = Math.sqrt(standardDerivation);
    const allValue = [minVal, maxVal, maxVal-minVal, mean, mediane, firstQ, thirdQ, standardDerivation, sum];
    for(var i = 0; i < allValue.length; i++) {
        document.getElementsByTagName("article")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].textContent = allValue[i].toString();
    }
}
document.getElementsByTagName("footer")[0].addEventListener("mouseover", function() {
    if(isDisplayedCalc == false) {
        document.querySelector("footer").getElementsByTagName("button")[1].style.display = "block";
        window.setTimeout(function() {
            document.querySelector("footer").getElementsByTagName("button")[1].style.height = "40px"; document.querySelector("footer").getElementsByTagName("button")[1].style.top = "0px";
            document.querySelector("footer").querySelector("div").style.bottom = "40px";
        }, 10);
    }
});
document.getElementsByTagName("footer")[0].addEventListener("mouseleave", function() {
    document.querySelector("footer").getElementsByTagName("button")[1].style.height = "0px"; document.querySelector("footer").getElementsByTagName("button")[1].style.top = "2px";
    document.querySelector("footer").querySelector("div").style.bottom = "0px";
    window.setTimeout(function() {
        document.querySelector("footer").getElementsByTagName("button")[1].style.display = "none";
    }, 300);
});
document.querySelector("footer").getElementsByTagName("button")[1].addEventListener("click", function() {
    removeEmptyTd();
    isDisplayedCalc = true;
    document.getElementsByTagName("article")[0].style.flex = "0";
    document.getElementsByTagName("article")[2].style.flex = "1";
    document.querySelector("footer").getElementsByTagName("button")[1].style.height = "0px";
    document.querySelector("footer").querySelector("div").style.bottom = "0px";
    document.getElementsByTagName("table")[2].innerHTML = "<tr><td>x</td><td>p(X=x)</td></tr>";
    for(var i = 1; i < document.getElementsByTagName("article")[0].getElementsByTagName("tr").length-1; i++) {
        var tr = document.createElement("tr");
        for(var j = 0; j < 2; j++) {
            var td = document.createElement("td");
            if(j == 0) {
                td.textContent = document.getElementsByTagName("article")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].querySelector("input").value;
            } else {
                let input = document.createElement("input");
                input.type = "text"; input.value = "";
                td.appendChild(input);
            }
            tr.appendChild(td);
        }
        document.getElementsByTagName("table")[2].appendChild(tr);
        if(document.getElementsByTagName("article")[2].getElementsByTagName("tr").length % 2 == 0) {
            tr.style.background = "#222";
        } else {
            tr.style.background = "#333";
        }
    }
    whereAmI = [0, 1];
});
function fillResult() {
    document.getElementsByClassName("probaIndic")[0].style.height = "0px";
    for(var i = 1; i < document.getElementsByTagName("table")[0].getElementsByTagName("tr").length-1; i++) {
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].querySelector("input").value = document.getElementsByTagName("table")[4].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].textContent;
    }
    document.getElementsByTagName("article")[0].style.flex = "1";
    document.getElementsByTagName("article")[3].style.flex = "0";
    isDisplayedCalc = false, isDisplayedExp = false;
    whereAmI = [0, 1];
}
function removeEmptyTd() {
    for(var i = document.getElementsByTagName("table")[0].getElementsByTagName("tr").length-2; i >= 1; i--) {
        if(document.getElementsByTagName("table")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].querySelector("input").value == "") {
            console.log(i);
            document.getElementsByTagName("table")[0].querySelector("tbody").removeChild(document.getElementsByTagName("table")[0].getElementsByTagName("tr")[i]);
        } else if(document.getElementsByTagName("table")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].querySelector("input").value == "") {
            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].querySelector("input").value = "0";
        }
    }
    for(var i = 1; i < document.getElementsByTagName("table")[0].getElementsByTagName("tr").length; i++) {
        if(i % 2 == 1) {
            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[i].style.background = "#222";
        } else {
            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[i].style.background = "#333";
        }
    }
}
