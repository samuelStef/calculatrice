// This section manage the keyboard mode
var isEnabledKeyboadMode = false;
function keyboardMode() {
    if(document.getElementsByTagName("html")[0].offsetWidth <= 700) {
        errorScreen("Must be in \"More options Mode\" !");
        return false;
    }
    options();
    window.setTimeout(function() {
        if(isEnabledKeyboadMode) {
            isEnabledKeyboadMode = false;
            if(document.getElementsByTagName("html")[0].offsetWidth >= 700) {
                document.getElementById("largeCalc").style.maxHeight = "300px";
            }
            document.getElementsByClassName("keyboardAction")[0].style.height = "0px";
            document.getElementsByTagName("header")[0].style.maxHeight = "60%";
            document.getElementsByClassName("optMain")[0].childNodes[3].removeAttribute("style");
        } else {
            isEnabledKeyboadMode = true;
            if(document.getElementsByTagName("html")[0].offsetWidth >= 700) {
                document.getElementById("largeCalc").style.maxHeight = "0px";
            }
            document.getElementsByClassName("keyboardAction")[0].style.height = "60px";
            document.getElementsByTagName("header")[0].style.maxHeight = "100%";
            document.getElementsByClassName("optMain")[0].childNodes[3].style.background = "#777";
        }
    }, 300);
}
var writeMode = "line";
function modifyWriteMode(how) {
    if(how == "line") {
        document.getElementById("modeBox").getElementsByTagName("button")[0].style = "background: white; color: #111;";
        document.getElementById("modeBox").getElementsByTagName("button")[1].style = "background: #111; color: white;";
        writeMode = "line";
    } else {
        document.getElementById("modeBox").getElementsByTagName("button")[1].style = "background: white; color: #111;";
        document.getElementById("modeBox").getElementsByTagName("button")[0].style = "background: #111; color: white;";
        writeMode = "natural";
    }
}
/* Copy paste func */
const inputForCopy = document.createElement("input"); inputForCopy.value = ""; inputForCopy.type = "text"; inputForCopy.style.display = "none";
document.body.appendChild(inputForCopy);
const toast = document.getElementsByClassName("toast")[0];
document.getElementsByTagName("h1")[0].addEventListener("contextmenu", function(e) {
    document.getElementsByClassName("copyMenu")[0].style.display = "flex";
    document.getElementsByClassName("copyMenu")[0].style.left = e.clientX + "px"; document.getElementsByClassName("copyMenu")[0].style.top = e.clientY + "px";
    e.stopPropagation();
    return false;
});
document.body.addEventListener("click", function() {
    document.getElementsByClassName("copyMenu")[0].style.display = "none";
    return true;
});
window.oncontextmenu = function(e) {
    return false;
}
function copyResult() {
    inputForCopy.value = document.getElementsByTagName("h1")[0].textContent.split("=")[0];
    toastIt("Copied ! ");
    document.getElementsByClassName("copyMenu")[0].style.display = "none";
}
function pasteSentence() {
    if(inputForCopy.value != "") {
        document.getElementsByTagName("h1")[0].textContent = inputForCopy.value;
    }
    toastIt("Pasted ! ");
    document.getElementsByClassName("copyMenu")[0].style.display = "none";
}
function copyFromHistory(who) {
    inputForCopy.value = document.getElementsByClassName("history")[0].getElementsByTagName("p")[who].textContent;
    toastIt("Copied ! ");
}
function toastIt(msg) {
    toast.textContent = msg; toast.style.left = ((document.body.offsetWidth / 2) - toast.offsetWidth).toString() + "px";
    toast.transition = "300ms";
    window.setTimeout(function() {
        toast.style.bottom = "10px";
        window.setTimeout(function() {
            toast.style.bottom = "-100px";
            window.setTimeout(function() {
                toast.style.transition = "300ms";
            }, 300);
        }, 2000);
    }, 10);
}
