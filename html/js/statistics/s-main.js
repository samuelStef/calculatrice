function infosProba() {
    valueFromTbl = [];
    for(var i = 1; i < document.getElementsByTagName("table")[2].getElementsByTagName("tr").length; i++) {
        valueFromTbl[valueFromTbl.length] = [Number(document.getElementsByTagName("table")[2].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].textContent), Number(document.getElementsByTagName("table")[2].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].querySelector("input").value)];
    }
    var ex = 0, vx = 0, sx = 0;
    for(var i = 0; i < valueFromTbl.length; i++) {
        ex += (valueFromTbl[i][0] * valueFromTbl[i][1]);
    }
    for(var i = 0; i < valueFromTbl.length; i++) {
        vx += (valueFromTbl[i][1] * ((valueFromTbl[i][0] - ex) ** 2));
    }
    sx = Math.sqrt(vx);
    value = [ex, vx, sx];
    for(var i = 0; i < value.length; i++) {
        document.getElementsByTagName("table")[3].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].textContent = value[i].toString();
    }
    document.getElementsByTagName("table")[3].style.height = "200px";
}
var isDisplayedExp = false;
function exp() {
    if(isDisplayedExp) {
        document.getElementsByTagName("article")[2].style.flex = "1";
        document.getElementsByTagName("article")[3].style.flex = "0";
        isDisplayedExp = false;
    } else {
        document.getElementsByTagName("article")[2].style.flex = "0";
        document.getElementsByTagName("article")[3].style.flex = "1";
        isDisplayedExp = true;
    }
}
function makeTheTest() {
    if(document.getElementById("iterCount").value == "" || Number(document.getElementById("iterCount").value).toString() == "NaN") {
        return false;
    }
    if(typeof tme != "undefined") {
        try {
            clearInterval(tmr);
        } catch(e) {
            console.warn("Trying to quit undefined timer !");
        }
    }
    document.getElementsByTagName("table")[4].innerHTML = "<tr><td>Value</td><td>Frequency</td></tr>";
    document.getElementsByTagName("table")[4].parentNode.style.flex = "1";
    var value = []; proba = [0];
    for(var i = 1; i < document.getElementsByTagName("table")[2].getElementsByTagName("tr").length; i++) {
        value[value.length] = [Number(document.getElementsByTagName("table")[2].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].textContent), 0];
        proba[proba.length] = proba[proba.length-1] + Number(document.getElementsByTagName("table")[2].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].querySelector("input").value);
    }
    for(var i = 0; i < value.length; i++) {
        var tr = document.createElement("tr");
        for(var j = 0; j < 2; j++) {
            var td = document.createElement("td");
            tr.appendChild(td);
            if(j == 0) {
                td.textContent = value[i][0];
            } else {
                td.textContent = "0";
            }
        }
        document.getElementsByTagName("table")[4].appendChild(tr);
        if(document.getElementsByTagName("table")[4].getElementsByTagName("tr").length % 2 == 0) {
            tr.style.background = "#222";
        } else {
            tr.style.background = "#333";
        }
    }
    for(var i = 0; i < proba.length; i++) {
        proba[i] = proba[i] * 10000;
    }
    var count = 1;
    tmr = window.setInterval(function() {
        var num = Math.floor(Math.random() * 10000);
        for(var j = 1; j < proba.length; j++) {
            if(num < proba[j]) {
                let elt = document.getElementsByTagName("table")[4].getElementsByTagName("tr")[j].getElementsByTagName("td")[1];
                elt.textContent = (value[j-1][1] + 1).toString();
                value[j-1][1] += 1;
                break;
            }
        }
        if(count >= Number(document.getElementById("iterCount").value)) {
            clearInterval(tmr);
            document.getElementsByClassName("probaIndic")[0].style.height = "55px";
        }
        count++;
    }, 1);
}
