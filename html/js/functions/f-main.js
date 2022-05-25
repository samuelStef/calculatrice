alpha = "fghjkl";
functionListEdt = [], functionList = [];
document.getElementById("funcButton").addEventListener("click", function() {
    if(functionListEdt.length >= 6) {
        document.getElementsByClassName("alertBoxCalc")[0].style = "height: 21px; margin: 7px;";
        window.setTimeout(function() {
            document.getElementsByClassName("alertBoxCalc")[0].style = "height: 0px; margin: 0px;";
        }, 1000);
        return false;
    }
    edt = document.createElement("input"); edt.type = "text"; edt.value = alpha[functionListEdt.length] + "(x) = "; edt.id = "func" + functionListEdt.length.toString();
    edt.style.color = "rgb(" + (Math.floor(Math.random()*100) + 130) + ", " + (Math.floor(Math.random()*100) + 130) + ", " + (Math.floor(Math.random()*100) + 130) + ")";
    edt.style.height = "0px";
    functionListEdt[functionListEdt.length] = edt;
    document.getElementsByClassName("functionBox")[0].append(edt);
    window.setTimeout(function() {
        edt.style.height = "25px";
        edt.focus();
    }, 10);
});

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

function calculateTheFunc(forWho) {
    for(var i = 0; i < functionListEdt.length; i++) {
        functionList[i] = functionListEdt[i].value.split("=")[1].split(" "); newFunc = "";
        for(var j = 0; j < functionList[i].length; j++) {
            newFunc += functionList[i][j];
        }
        functionList[i] = newFunc.split("x");
    }
    if(forWho == "table") {
        param = { begin : Number(document.getElementById("funcBegin").value), end : Number(document.getElementById("funcEnd").value), set : Number(document.getElementById("funcSet").value) }
    } else {
        param = { begin : -15+canvasPlace.x/20, end : 15+canvasPlace.x/20, set : 0.1 };
    }
    var dt = [];
    for(var i = 0; i < functionList.length; i++) {
        var valueToTransform = createRange(param.begin, param.end, param.set);
        var tableCalculated = [];
        for(var j = 0; j < valueToTransform.length; j++) {
            strCalc = "";
            if(valueToTransform[j] < 0) {
                valueToTransform[j] = "(" + valueToTransform[j] + ")";
            }
            for(var k = 0; k < functionList[i].length; k++) {
                if(k < functionList[i].length - 1) {
                    strCalc += functionList[i][k] + valueToTransform[j];
                } else {
                    strCalc += functionList[i][k];
                }
            }
            valueToTransform[j] = eval(valueToTransform[j]);
            tableCalculated[tableCalculated.length] = eval(strCalc);
        }
        dt[dt.length] = [valueToTransform, tableCalculated];
    }
    return dt;
}

var isShowedGraph = false, canvasPlace = { x : 0, y : 0, zoom : 1 }, svgElt = document.getElementsByTagName("svg")[0], lastCanvas = { x : 0, y : 0, zoom : 0 };
function createLine(x1, y1, x2, y2, lineWidth=2, lineColor="black") {
    var l = document.createElement("line");
    l.setAttribute("x1", x1.toString()); l.setAttribute("y1", y1.toString()); l.setAttribute("x2", x2.toString()); l.setAttribute("y2", y2.toString());
    l.style = "stroke: " + lineColor + "; stroke-width: " + lineWidth.toString();
    svgElt.appendChild(l);
}
function createPlan(difX, difY) {
    for(i = 0; i < Number(svgElt.style.height.split("px")[0]); i += 20) {
        if((i + difX) != (Number(svgElt.style.height.split("px")[0]) / 2)) {
            createLine(0, i, Number(svgElt.style.width.split("px")[0]), i, 1, "#555");
        } else {
            createLine(0, i, Number(svgElt.style.width.split("px")[0]), i, 2, "#aaa");
        }
    }
    for(i = 0; i < Number(svgElt.style.width.split("px")[0]); i += 20) {
        if((i + difY) != (Number(svgElt.style.width.split("px")[0]) / 2)) {
            createLine(i, 0, i, Number(svgElt.style.height.split("px")[0]), 1, "#555");
        } else {
            createLine(i, 0, i, Number(svgElt.style.height.split("px")[0]), 2, "#aaa");
        }
    }
    svgElt.innerHTML = svgElt.innerHTML;
}
function checkIfObjectAreSame(obj1, obj2) {
    var keysObj1 = [], keysObj2 = [];
    for(var k in obj1) { keysObj1[keysObj1.length] = k; }
    for(var k in obj2) { keysObj2[keysObj2.length] = k; }
    for(var i = 0; i < keysObj1.length; i++) {
        if(keysObj1[i] in obj2) {
            if(!(obj1[keysObj1[i]] == obj2[keysObj1[i]])) {
                return false;
            }
        } else {
            return false;
        }
    }
    for(var i = 0; i < keysObj2.length; i++) {
        if(keysObj2[i] in obj1) {
            if(!(obj1[keysObj1[i]] == obj2[keysObj1[i]])) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}
var dt
window.setInterval(function() {
    if(!checkIfObjectAreSame(canvasPlace, lastCanvas) && isShowedGraph) {
        svgElt.innerHTML = "";
        createPlan(canvasPlace.y, canvasPlace.x);
        lastCanvas.x = canvasPlace.x; lastCanvas.y = canvasPlace.y; lastCanvas.zoom = canvasPlace.zoom;
        /*var*/ dt = calculateTheFunc("graph");
        for(i = 0; i < dt.length; i++) {
            for(j = 0; j < dt[i][0].length; j++) {
                var [x1, y1, x2, y2] = [(dt[i][0][j] * 20) + (Number(svgElt.style.width.split("px")[0]) / 2) - canvasPlace.x, (dt[i][1][j]*-20) + (Number(svgElt.style.height.split("px")[0]) / 2) - canvasPlace.y, (dt[i][0][j+1] * 20) + (Number(svgElt.style.width.split("px")[0]) / 2) - canvasPlace.x, (dt[i][1][j+1]*-20) + (Number(svgElt.style.height.split("px")[0]) / 2) - canvasPlace.y];
                if(x2.toString() == "NaN" || y2.toString() == "NaN") {
                    break;
                } else {
                    createLine(x1, y1, x2, y2, 2, functionListEdt[i].style.color);
                }
            }
        }
        svgElt.innerHTML = svgElt.innerHTML;
    } else {
        return false;
    }
}, 200);
window.onkeydown = function(e) {
    if(e.keyCode == 37) {
        canvasPlace.x -= 20;
    } else if(e.keyCode == 39) {
        canvasPlace.x += 20;
    } else if(e.keyCode == 38) {
        canvasPlace.y -= 20;
    } else if(e.keyCode == 40) {
        canvasPlace.y += 20;
    } else if(e.key == "+") {

    } else if(e.key == "-") {

    }
}
svgElt.addEventListener("click", function() {
    // TODO : Add menu for more actions with the functions window
});

document.getElementById("calculateTheTable").onclick = function() {
    document.getElementsByClassName("tableContent")[0].innerHTML = "";
    var dt = calculateTheFunc("table");
    for(var i = 0; i < dt.length; i++) {
        var tbl = document.createElement("table");
        var funcNameParent = document.createElement("tr");
        var funcNameElt = document.createElement("td"); funcNameElt.setAttribute("colspan", 2); funcNameElt.textContent = functionListEdt[i].value;
        funcNameElt.style = "font-weight: bold; color: " + functionListEdt[i].style.color + "; text-align: left;";
        tbl.appendChild(funcNameParent); funcNameParent.appendChild(funcNameElt);
        for(var j = 0; j < dt[i][1].length; j++) {
            var tblRow = document.createElement("tr");
            tbl.append(tblRow);
            var tblColumn1 = document.createElement("td"), tblColumn2 = document.createElement("td");
            tblColumn1.textContent = dt[i][0][j]; tblColumn2.textContent = dt[i][1][j];
            tblRow.append(tblColumn1); tblRow.append(tblColumn2);
        }
        document.getElementsByClassName("tableContent")[0].append(tbl);
        document.getElementsByClassName("tableContent")[0].style = "flex: 1; overflow: auto;";
    }
}
