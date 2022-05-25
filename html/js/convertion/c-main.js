var api = {
    ping : function() {
        var xhrPing = new XMLHttpRequest();
        xhrPing.onreadystatechange = function() {
            if(xhrPing.readyState == 4) {
                if(JSON.parse(xhrPing.response).gecko_says == "(V3) To the Moon!") {
                    isConnected = true;
                } else {
                    isConnected = false;
                }
            }
        }
        xhrPing.open("GET", "https://api.coingecko.com/api/v3/ping");
        try {
            xhrPing.send();
        } catch(e) {
            isConnected = false;
        }
    },
    getCoinList : function() {
        var xhrCoin = new XMLHttpRequest();
        xhrCoin.onreadystatechange = function() {
            if(xhrCoin.readyState == 4) {
                coinList = JSON.parse(xhrCoin.response);
            }
        }
        xhrCoin.open("GET", "https://api.coingecko.com/api/v3/coins/list"); xhrCoin.send();
    },
    getVsCurrency : function() {
        var xhrVS = new XMLHttpRequest();
        xhrVS.onreadystatechange = function() {
            if(xhrVS.readyState == 4) {
                vsCurrency = JSON.parse(xhrVS.response);
            }
        }
        xhrVS.open("GET", "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"); xhrVS.send();
    },
    getPrice : function(cur1, cur2) {
        document.getElementsByClassName("buttonParent")[0].childNodes[1].disabled = true;
        var xhrPrice = new XMLHttpRequest();
        xhrPrice.onreadystatechange = function() {
            if(xhrPrice.readyState == 4) {
                var rs = JSON.parse(xhrPrice.response);
                rs = Number(document.getElementById("inCurrency").value) * rs[cur1][cur2];
                document.getElementById("outCurrency").value = rs.toString();
                document.getElementsByClassName("buttonParent")[0].childNodes[1].disabled = false;
            }
        }
        xhrPrice.open("GET", "https://api.coingecko.com/api/v3/simple/price?ids=" + cur1 + "&vs_currencies=" + cur2); xhrPrice.send();
    }
};
var isConnected = false, coinList = [], vsCurrency = [];
function changeWindow(who) {
    if(who == 1) {
        document.getElementsByTagName("article")[1].style.flex = "1";
        document.getElementsByTagName("article")[0].style.flex = "0";
        if(coinList.length > 0) {
            return true;
        }
        api.ping();
        window.setTimeout(function() {
            if(isConnected == false) {
                document.getElementById("err").style.height = "30px";
                window.setTimeout(function() {
                    document.getElementById("err").style.height = "0px";
                }, 5000);
            } else {
                api.getCoinList();
                api.getVsCurrency();
                verifyIfCoinGot = window.setInterval(function() {
                    if(coinList.length > 0 && document.getElementsByClassName("coinListDiv")[0].childNodes.length == 1) {
                        console.log("displayed")
                        var div = document.getElementsByClassName("coinListDiv")[0];
                        for(var i = 0; i < coinList.length; i++) {
                            p = document.createElement("p"); p.setAttribute("class", "unitTag");
                            p.textContent = coinList[i].symbol.toUpperCase();
                            p.setAttribute("onclick", "selectCoin(" + i + ")");
                            div.appendChild(p);
                            if(Math.floor(Math.random() * 1000) > 3) {
                                p.style.display = "none";
                            }
                        }
                    }
                    if(vsCurrency.length > 0 && document.getElementsByClassName("vsCurrencyListDiv")[0].childNodes.length == 1) {
                        var div = document.getElementsByClassName("vsCurrencyListDiv")[0];
                        for(var i = 0; i < vsCurrency.length; i++) {
                            p = document.createElement("p"); p.setAttribute("class", "unitTag");
                            p.textContent = vsCurrency[i].toUpperCase();
                            p.setAttribute("onclick", "selectVs(" + i + ")");
                            div.appendChild(p);
                        }
                    }
                    if(document.getElementsByClassName("vsCurrencyListDiv")[0].childNodes.length > 1 && document.getElementsByClassName("coinListDiv")[0].childNodes.length > 1) {
                        clearInterval(verifyIfCoinGot);
                    }
                }, 100);
            }
        }, 1000);
    } else {
        document.getElementsByTagName("article")[0].style.flex = "1";
        document.getElementsByTagName("article")[1].style.flex = "0";
    }
}
var isDisplayedCoinList = false;
document.getElementsByClassName("selectedCoin")[0].addEventListener("click", function() {
    if(isDisplayedCoinList == false) {
        document.getElementsByClassName("coinListDivParent")[0].style.height = "100px";
        document.getElementsByClassName("convertBox")[2].style.height = "180px";
        document.getElementsByClassName("coinListDivParent")[0].querySelector("input").focus();
        isDisplayedCoinList = true;
    } else {
        document.getElementsByClassName("coinListDivParent")[0].style.height = "0px";
        document.getElementsByClassName("convertBox")[2].style.height = "80px";
        isDisplayedCoinList = false;
    }
});
var isDisplayedVsList = false;
document.getElementsByClassName("selectedVs")[0].addEventListener("click", function() {
    if(isDisplayedVsList == false) {
        document.getElementsByClassName("vsCurrencyListDiv")[0].style.height = "100px";
        document.getElementsByClassName("convertBox")[3].style.height = "180px";
        isDisplayedVsList = true;
    } else {
        document.getElementsByClassName("vsCurrencyListDiv")[0].style.height = "0px";
        document.getElementsByClassName("convertBox")[3].style.height = "80px";
        isDisplayedVsList = false;
    }
});
function madeSearch(cnt) {
    cnt = cnt.toLowerCase();
    console.log(cnt)
    var count = 0;
    for(var i = 0; i < document.getElementsByClassName("coinListDiv")[0].childNodes.length; i++) {
        if(document.getElementsByClassName("coinListDiv")[0].childNodes[i].nodeType == 3) {
            // It's a text, then we don't treat him like other elements
            continue;
        }
        if(document.getElementsByClassName("coinListDiv")[0].childNodes[i].textContent.toLowerCase().indexOf(cnt) < 0) {
            document.getElementsByClassName("coinListDiv")[0].childNodes[i].style.display = "none";
        } else {
            if(Math.floor(Math.random() * 100) > count) {
                document.getElementsByClassName("coinListDiv")[0].childNodes[i].style.display = "block";
                count++;
            }
        }
    }
}
var selectedCoin = 835, selectedVs = "btc";
function selectCoin(who) {
    selectedCoin = who;
    document.getElementsByClassName("selectedCoin")[0].textContent = coinList[who].symbol.toUpperCase();
}
function selectVs(who) {
    selectedVs = vsCurrency[who];
    document.getElementsByClassName("selectedVs")[0].textContent = selectedVs.toUpperCase();
}
units = [
        {
            nom: "Kilomètre",
            symbole: "km",
            valeur: 1000,
            type:"Longueur"
        },
        {
            nom: "Hectomètre",
            symbole: "hm",
            valeur: 100,
            type: "Longueur"
        },
        {
            nom: "Décamètre",
            symbole: "dam",
            valeur: 10,
            type: "Longueur"
        },
        {
            nom: "Mètre",
            symbole: "m",
            valeur: 1,
            type: "Longueur"
        },
        {
            nom: "Décimètre",
            symbole: "dm",
            valeur: 0.1,
            type: "Longueur"
        },
        {
            nom: "Centimètre",
            symbole: "cm",
            valeur: 0.01,
            type: "Longueur"
        },
        {
            nom: "Milimètre",
            symbole: "mm",
            valeur: 0.001,
            type: "Longueur"
        },
        {
            nom: "Micromètre",
            symbole: "µm",
            valeur: 0.000001,
            type: "Longueur"
        },
        {
            nom: "Nanomètre",
            symbole: "nm",
            valeur: 0.000000001,
            type: "Longueur"
        },
        {
            nom: "Pouce",
            symbole: "inch",
            valeur: 0.0254,
            type: "Longueur"
        },
        {
            nom: "pied",
            symbole: "ft",
            valeur: 0.3048,
            type: "Longueur"
        },
        {
            nom: "Mile",
            symbole: "mile",
            valeur: 1609.344,
            type: "Longueur"
        },
        {
            nom: "Kilomètre carré",
            symbole: "Km**2",
            valeur: 1000000,
            type: "Surface"
        },
        {
            nom: "Hectomètre carré",
            symbole: "hm**2",
            valeur: 10000,
            type: "Surface"
        },
        {
            nom: "Décamètre carré",
            symbole: "dam**2",
            valeur: 100,
            type: "Surface"
        },
        {
            nom: "Mètre carré",
            symbole: "m**2",
            valeur: 1,
            type: "Surface"
        },
        {
            nom: "Décimètre carré",
            symbole: "dm**2",
            valeur: 0.01,
            type: "Surface"
        },
        {
            nom: "Centimètre carré",
            symbole: "cm**2",
            valeur: 0.0001,
            type: "Surface"
        },
        {
            nom: "Milimètre carré",
            symbole: "mm**2",
            valeur: 0.000001,
            type: "Surface"
        },
        {
            nom: "Micromètre carré",
            symbole: "µm**2",
            valeur: 0.00000000000001,
            type: "Surface"
        },
        {
            nom: "Nanomètre carré",
            symbole: "nm**2",
            valeur: 0.000000000000001,
            type: "Surface"
        },
        {
            nom: "Kilomètre cube",
            symbole: "km**3",
            valeur: 1000000000,
            type: "Volume"
        },
        {
            nom: "Hectomètre cube",
            symbole: "hm**3",
            valeur: 1000000,
            type: "Volume"
        },
        {
            nom: "Décamètre cube",
            symbole: "dam**3",
            valeur: 1000,
            type: "Volume"
        },
        {
            nom: "Mètre cube",
            symbole: "m**3",
            valeur: 1000,
            type: "Volume"
        },
        {
            nom: "Décimètre cube",
            symbole: "dm**3",
            valeur: 0.001,
            type: "Volume"
        },
        {
            nom: "Centimètre cube",
            symbole: "cm**3",
            valeur: 0.000001,
            type: "Volume"
        },
        {
            nom: "Milimètre cube",
            symbole: "mm**3",
            valeur: 0.000000001,
            type: "Volume"
        },
        {
            nom: "Micromètre cube",
            symbole: "µm**3",
            valeur: 0.000000000001,
            type: "Volume"
        },
        {
            nom: "Nanomètre cube",
            symbole: "nm**3",
            valeur: 0.000000000000001,
            type: "Volume"
        },
        {
            nom: "Mètre cube",
            symbole: "kL",
            valeur: 1,
            type: "Volume"
        },
        {
            nom: "Hectolitre",
            symbole: "hL",
            valeur: 0.1,
            type: "Volume"
        },
        {
            nom: "Décalitre",
            symbole: "daL",
            valeur: 0.01,
            type: "Volume"
        },
        {
            nom: "Litre",
            symbole: "L",
            valeur: 0.001,
            type: "Volume"
        },
        {
            nom: "Décilitre",
            symbole: "dcL",
            valeur: 0.0001,
            type: "Volume"
        },
        {
            nom: "Centilitre",
            symbole: "cL",
            valeur: 0.00001,
            type: "Volume"
        },
        {
            nom: "Mililitre",
            symbole: "mL",
            valeur: 0.000001,
            type: "Volume"
        },
        {
            nom: "Kilogramme",
            symbole: "kg",
            valeur: 1000,
            type: "Masse"
        },
        {
            nom: "Hectogramme",
            symbole: "hg",
            valeur: 100,
            type: "Masse"
        },
        {
            nom: "Décagramme",
            symbole: "dag",
            valeur: 10,
            type: "Masse"
        },
        {
            nom: "Gramme",
            symbole: "g",
            valeur: 1,
            type: "Masse"
        },
        {
            nom: "Décigramme",
            symbole: "dcg",
            valeur: 0.1,
            type: "Masse"
        },
        {
            nom: "Centigramme",
            symbole: "cg",
            valeur: 0.01,
            type: "Masse"
        },
        {
            nom: "Miligramme",
            symbole: "mg",
            valeur: 0.001,
            type: "Masse"
        },
        {
            nom: "Microgramme",
            symbole: "µg",
            valeur: 0.000001,
            type: "Masse"
        },
        {
            nom: "Nanogramme",
            symbole: "ng",
            valeur: 0.000000001,
            type: "Masse"
        },
        {
            nom: "Radian",
            symbole: "rad",
            valeur: Math.PI/180,
            type: "Angle"
        },
        {
            nom: "degré",
            symbole: "°",
            valeur: 1,
            type: "Angle"
        }
]
var mesure = [];
for(var i = 0; i < units.length; i++) {
    var canContinue = false;
    for(var j = 0; j < mesure.length; j++) {
        if(units[i].type == mesure[j].name) {
            mesure[j].list[mesure[j].list.length] = units[i];
            canContinue = true;
        }
    }
    if(canContinue == false) {
        mesure[mesure.length] = {
            name : units[i].type,
            list : []
        }
        i--;
        continue;
    }
}
for(var i = 0; i < units.length; i++) {
    var p = document.createElement("p");
    p.className = "unitTag"; p.setAttribute("onclick", "selectUnits(" + i + ")");
    p.textContent = units[i].symbole;
    document.getElementsByClassName("unitListDiv")[0].appendChild(p);
}
var isDisplayedUnitList = [false, false];
document.getElementsByClassName("selectedUnit")[0].addEventListener("click", function() {
    if(isDisplayedUnitList[0]) {
        document.getElementsByClassName("convertBox")[0].style.height = "80px";
        document.getElementsByClassName("unitListDivParent")[0].style.height = "0px";
        isDisplayedUnitList[0] = false;
    } else {
        document.getElementsByClassName("convertBox")[0].style.height = "180px";
        document.getElementsByClassName("unitListDivParent")[0].style.height = "100px";
        isDisplayedUnitList[0] = true;
    }
});
document.getElementsByClassName("unitListDiv")[0].removeChild(document.getElementsByClassName("unitListDiv")[0].childNodes[0]);
function listUnits(str) {
    for(var i = 0; i < units.length; i++) {
        if(units[i].symbole.toLowerCase().indexOf(str.toLowerCase()) >= 0) {
            document.getElementsByClassName("unitListDiv")[0].childNodes[i].style.display = "block";
        } else {
            document.getElementsByClassName("unitListDiv")[0].childNodes[i].style.display = "none";
        }
    }
}
var selectedUnit = "m", selectedType = "Longueur";
function selectUnits(who) {
    selectedUnit = units[who].symbole;
    var equal = true;
    if(selectedType != units[who].type) {
        equal = false
    }
    selectedType = units[who].type;
    if(equal == false) {
        changeOtherUnits();
        selectOutputUnit(0);
    }
    document.getElementsByClassName("selectedUnit")[0].textContent = units[who].symbole;
}
function changeOtherUnits() {
    document.getElementsByClassName("outputUnitList")[0].innerHTML = "";
    for(var i = 0; i < mesure.length; i++) {
        if(selectedType == mesure[i].name) {
            for(var j = 0; j < mesure[i].list.length; j++) {
                var p = document.createElement("p");
                p.textContent = mesure[i].list[j].symbole; p.className = "unitTag"; p.setAttribute("onclick", "selectOutputUnit(" + j + ")");
                document.getElementsByClassName("outputUnitList")[0].appendChild(p);
            }
            break;
        }
    }
}
changeOtherUnits();
document.getElementsByClassName("outputUnit")[0].addEventListener("click", function() {
    console.log("ent")
    if(isDisplayedUnitList[1]) {
        document.getElementsByClassName("convertBox")[1].style.height = "80px";
        document.getElementsByClassName("outputUnitList")[0].style.height = "0px";
        isDisplayedUnitList[1] = false;
    } else {
        document.getElementsByClassName("convertBox")[1].style.height = "180px";
        document.getElementsByClassName("outputUnitList")[0].style.height = "100px";
        isDisplayedUnitList[1] = true;
    }
});
var outputUnit = "m";
function selectOutputUnit(who) {
    for(var i = 0; i < mesure.length; i++) {
        if(mesure[i].name == selectedType) {
            outputUnit = mesure[i].list[who].symbole;
            break;
        }
    }
    document.getElementsByClassName("outputUnit")[0].textContent = outputUnit;
    calculateConv();
}
document.getElementById("inTxt").addEventListener("input", function() {
    calculateConv();
});
function calculateConv() {
    for(var i = 0; i < mesure.length; i++) {
        if(mesure[i].name == selectedType) {
            for(var j = 0; j < mesure[i].list.length; j++) {
                if(mesure[i].list[j].symbole == selectedUnit) {
                    break;
                }
            }
            for(var k = 0; k < mesure[i].list.length; k++) {
                if(mesure[i].list[k].symbole == outputUnit) {
                    break;
                }
            }
            rs = Number(document.getElementById("inTxt").value) * mesure[i].list[j].valeur;
            rs = rs / mesure[i].list[k].valeur;
            document.getElementById("outTxt").value = rs.toString();
            break;
        }
    }
}
