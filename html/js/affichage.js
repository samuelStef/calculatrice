function toNonScientificFormat(num) {
    this.num = num.toString().split("e");
    const power = Number(this.num[1]);
    var nonSci = "";
    if(typeof this.num[1] == "undefined") {
        return num;
    } else if(power < 0) {
        for(i = 0; i < Math.abs(power); i++) {
            nonSci += "0";
            if(i == 0) {
                nonSci += ".";
            }
        }
        nonSci += this.num[0].split(".")[0] + this.num[0].split(".")[1];
    } else {
        nonSci += this.num[0].split(".")[0] + this.num[0].split(".")[1];
        for(i = 0; i < Math.abs(power); i++) {
            nonSci += "0";
        }
    }
    return nonSci;
}
function round(num, dec=1) {
    if(Number.isInteger(num)) {
        return num;
    }
    if(num.toString().split(".")[1].length <= dec+1) {
        return num;
    }
    if(dec == 1) {
        return Number(num.toString().split(".")[0]);
    } else {
        this.num = toNonScientificFormat(num).toString().split(".");
        var rounded = this.num[0] + ".";
        for(var i = 0; i < dec-1; i++) {
            if(typeof this.num[1][i] == "undefined") {
                break;
            } else {
                rounded += this.num[1][i];
            }
        }
        return Number(rounded);
    }
}
function equal() {
    if(sentence != "") {
        try {
            ans = eval(sentence);
        } catch(e) {
            errorScreen("Malformed expression...");
            return false;
        }
        sentence += " = " + eval(sentence).toString();
        loadToEdit();
        p = document.createElement("p");
        p.textContent = sentence; p.setAttribute("onclick", "copyFromHistory(" + document.getElementsByClassName("history")[0].getElementsByTagName("p").length + ")");
        document.getElementsByClassName("history")[0].appendChild(p);
        document.getElementsByClassName("history")[0].appendChild(document.createElement("hr"));
        document.getElementsByClassName("history")[0].scroll(0, 1000000000000000000);
        sentence = ""; action = [];
    }
}
function loadToEdit() {
    sentence_mx = sentence;
    sentence_mx = sentence_mx.replace(/\*\*/g, "^");
    sentence_mx = sentence_mx.replace(/\*/g, "\\times");
    sentence_mx = sentence_mx.replace(/\//g, "\\over");
    sentence_mx = sentence_mx.replace(/root/g, "\\sqrt");
    sentence_mx = sentence_mx.replace(/Infinity/g, "\\infty");
    sentence_mx = sentence_mx.replace(/Math.PI/g, "\\pi");
    document.getElementsByTagName("h1")[0].textContent = "$$\\notag\\begin{align}" + sentence_mx + "\\end{align}$$";
    MathJax.typeset();
}
function delWord() {
    newSentence = "";
    if(sentence == "") {
        return false;
    }
    for(var i = 0; i < (sentence.length - action[action.length-1].length); i++) {
        newSentence += sentence[i];
    }
    sentence = newSentence; action.length -= 1;
    loadToEdit();
}
function delAll() {
    if(document.getElementsByTagName("h1")[0].textContent == "") {
        document.getElementsByClassName("history")[0].innerHTML = "";
    } else {
        sentence = ""; action = [];
        loadToEdit();
    }
}
for(var i = 0; i < document.getElementsByTagName("button").length; i++) {
    var btn = document.getElementsByTagName("button")[i];
    if(btn.textContent != "Opt" && btn.textContent != "=" && btn.textContent != "C" && btn.textContent != "Del" && btn.textContent != "More" && btn.textContent != "Binary" && btn.textContent != "Line" && btn.textContent != "Natural" && btn.textContent != "Copy" && btn.textContent != "Paste") {
        if(btn.id == "funcButton" || btn.id == "statButton" || btn.id == "convButton") {
            continue;
        }
        btn.setAttribute("onclick", "addInSentence('" + btn.textContent/*.split("(")[0]*/ + "')");
        btn.onmouseover = function(e) { e.stopPropagation(); }
        btn.onmouseleave = function(e) { e.stopPropagation(); }
    }
    if(btn.parentNode.className == "moreAction") {
        btn.setAttribute("onclick", "openSubMenu('" + btn.textContent + "', " + btn.offsetLeft + ")");
        btn.setAttribute("onmouseover", "openSubMenu('" + btn.textContent + "', " + btn.offsetLeft + ")");
        btn.setAttribute("onmouseleave", "closeSubMenu()");
    }
}

var areOptionsShowed = false;
function options() {
    if(areOptionsShowed == true) {
        areOptionsShowed = false;
        document.getElementsByClassName("optScreenParent")[0].style.left = "-100%";
        document.getElementsByClassName("optScreen")[0].style.left = "-60%";
    } else {
        areOptionsShowed = true;
        document.getElementsByClassName("optScreenParent")[0].style.left = "0%";
        document.getElementsByClassName("optScreen")[0].style.left = "0%";
    }
}

window.onkeypress = function(e) {
    if(e.keyCode == 13 || e.keyCode == 8) {
        return false;
    }
    const rs = addInSentence(e.key);
    if(rs == true) {
        for(var i = 0; i < document.getElementsByTagName("button").length; i++) {
            var thisButton = document.getElementsByTagName("button")[i]
            if(e.key == thisButton.textContent) {
                thisButton.style = "background: #eee; color: #111;";
                window.setTimeout(function() {
                    thisButton.style = "";
                }, 200);
                break;
            }
        }
    }
    if(e.keyCode == 32) {
        return false;
    }
}
window.onkeydown = function(e) {
    if(e.keyCode == 8) {
        if(sentence == "") {
            delAll();
        } else {
            delWord();
        }
    } else if(e.keyCode == 13) {
        equal();
    }
}

function errorScreen(msg) {
    document.getElementsByClassName("errorText")[0].textContent = msg;
    document.getElementsByClassName("errorScreen")[0].style.right = "7px";
    window.setTimeout(function() {
        document.getElementsByClassName("errorScreen")[0].style.right = "-300px";
    }, 3000);
}

document.getElementById("funcButton").addEventListener("click", function(evt) {
    try {
        pywebview.api.functionWin();
    } catch(e) { errorScreen("Unable To Open New Window"); }
});
document.getElementById("trueCalc").addEventListener("click", function(evt) {
    try {
        pywebview.api.moreOptions();
    } catch(e) { errorScreen("Unable To Open New Window"); }
});
document.getElementById("convButton").addEventListener("click", function(evt) {
    try {
        pywebview.api.convButton();
    } catch(e) { errorScreen("Unable To Open New Window"); }
});
document.getElementById("statButton").addEventListener("click", function(evt) {
    try {
        pywebview.api.statBtn();
    } catch(e) { errorScreen("Unable To Open New Window"); }
});
document.getElementById("probaButton").addEventListener("click", function(evt) {
    try {
        pywebview.api.probaBtn();
    } catch(e) { errorScreen("Unable To Open New Window"); }
});
window.setInterval(function() {
    if(document.getElementsByTagName("html")[0].offsetWidth >= 700) {
        document.getElementById("largeCalc").style.display = "block";
        document.getElementById("smallCalc").style.display = "none";
    } else {
        document.getElementById("largeCalc").style.display = "none";
        document.getElementById("smallCalc").style.display = "block";
    }
    if(sentence == "") {
        document.getElementsByClassName("cButton")[0].style = "background: rgb(202, 111, 26); width: 100%; height: 100%; border-radius: 0px;";
        document.getElementsByClassName("cButton")[1].style = "background: rgb(202, 111, 26); width: 100%; height: 100%; border-radius: 0px;";
    } else {
        document.getElementsByClassName("cButton")[0].style = "background: rgb(202, 111, 26); width: 45px; height: 45px; border-radius: 200px;";
        document.getElementsByClassName("cButton")[1].style = "background: rgb(202, 111, 26); width: 45px; height: 45px; border-radius: 200px;";
    }
    document.getElementsByTagName("mjx-container")[0].style = "text-align: right;";
}, 300);

var isActivatedMoreFunc = false;
function moreFunctions() {
    if(isActivatedMoreFunc) {
        isActivatedMoreFunc = false;
        document.getElementsByClassName("moreAction")[0].style.height = "0px";
    } else {
        isActivatedMoreFunc = true;
        document.getElementsByClassName("moreAction")[0].style.height = "60px";
    }
}
for(var i = 0; i < document.getElementsByClassName("submenu").length; i++) {
    document.getElementsByClassName("submenu")[i].className += " unover";
    document.getElementsByClassName("submenu")[i].onmouseover = function(e) {
        c = e.path[0].className.split(" ");
        e.path[0].className = c[0] + " " + c[1] + " " + "over";
        e.path[0].style.display = "flex";
    }
    document.getElementsByClassName("submenu")[i].onmouseleave = function(e) {
        c = e.path[0].className.split(" ");
        e.path[0].className = c[0] + " " + c[1] + " " + "unover";
        closeSubMenu();
    }
    for(var j = 0; j < document.getElementsByClassName("submenu")[i].getElementsByTagName("aside").length; j++) {
        document.getElementsByClassName("submenu")[i].getElementsByTagName("aside")[j].onmouseover = function(e) { e.stopPropagation(); }
        document.getElementsByClassName("submenu")[i].getElementsByTagName("aside")[j].onmouseleave = function(e) { e.stopPropagation(); }
    }
}
function openSubMenu(win, l) {
    document.getElementsByClassName(win)[0].style.display = "flex";
    if(win == "Arithmetic" || win == "Trigo") {
        document.getElementsByClassName(win)[0].style.left = "60%";
    } else {
        document.getElementsByClassName(win)[0].style.left = l + "px";
    }
}
function closeSubMenu() {
    for(var i = 0; i < document.getElementsByClassName("submenu").length; i++) {
        document.getElementsByClassName("submenu unover")[i].style.display = "none";
    }
}
