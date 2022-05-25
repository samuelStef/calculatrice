/* Scripts for styling the windows and animate them ! */
document.getElementById("funcButton").addEventListener("mouseover", function() {
    document.getElementsByClassName("funcButtonParent")[0].style.height = "30px";
});
document.getElementById("funcButton").addEventListener("mouseleave", function() {
    document.getElementsByClassName("funcButtonParent")[0].style.height = "0px";
});
function changeWindow(who) {
    for(var i = 0; i < document.getElementsByTagName("article").length; i++) {
        document.getElementsByTagName("article")[i].style.flex = "0";
    }
    document.getElementsByTagName("article")[who].style.flex = "1";
    if(who == 0) {
        document.getElementById("funcButton").style.left = "0%";
    } else {
        document.getElementById("funcButton").style.left = "-100%";
    }
    if(who == 1) {
        isShowedGraph = true;
    } else {
        isShowedGraph = false;
        lastCanvas.zoom = -1
    }
}
