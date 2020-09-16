//window.onload = draggable_resizable_init;
var dragresize_classarray = ["n_side", "s_side", "e_side", "w_side", "nw_corn", "ne_corn", "sw_corn", "se_corn"];
function draggable_resizable_init() {
    var objarray = document.querySelectorAll(".resizeable, .draggable");
    var i = 0;
    while (i < objarray.length) {
        if (objarray[i].parentElement.classList.contains("dragresize_container") != 1) {
            var j = 0;
            //create container
            var obj = document.createElement("div");
            obj.id = objarray[i].id + "_dragresizecontainer_" + document.getElementsByClassName("dragresize_container").length;
            obj.classList.add("dragresize_container");
            var val = [objarray[i].offsetTop, objarray[i].offsetLeft, objarray[i].offsetHeight, objarray[i].offsetWidth];
            while (j < val.length) {
                if (val[j] < 20) {
                    val[j] = 20;
                }
                j += 1;
            }
            obj.setAttribute("style", "position: absolute; border: 2px solid gray; top:" + val[0] + "px; left: " + val[1] + "px; height: " + val[2] + "px; width: " + val[3] + "px; z-index: 100;");
            objarray[i].setAttribute("style", "top: 0px; left: 0px; height: 100%; width: 100%; border: 0px; z-index: 90;")
            objarray[i].setAttribute("width", "100%");
            objarray[i].setAttribute("height", "100%");
            obj.classList.add("dragresize_enable");
            //place container + adding element to the container
            objarray[i].parentElement.insertBefore(obj, objarray[i]);
            obj.appendChild(objarray[i]);
        }
        if (objarray[i].classList.contains("resizeable") && objarray[i].parentElement.getElementsByClassName("dragresize_" + dragresize_classarray[0]).length < 1) {
            j = 0;
            while (j < dragresize_classarray.length) {
                var style = "position: absolute; cursor: " + dragresize_classarray[j].slice(0, dragresize_classarray[j].length - 5) + "-resize; z-index: 105; ";
                if (j == 0 || j == 4 || j == 5) {
                    style += "top: -4px; ";
                }
                if (j == 2 || j == 3) {
                    style += "top: 0px; ";
                }
                if (j == 1 || j == 6 || j == 7) {
                    style += "bottom: -4px; ";
                }
                if (j == 3 || j == 4 || j == 6) {
                    style += "left: -4px; ";
                }
                if (j == 2 || j == 5 || j == 7) {
                    style += "right: -4px; ";
                }
                if (dragresize_classarray[j].slice(-4) == "corn") {
                    style += "width: 6px; height: 6px; ";
                }
                else if (j == 2 || j == 3) {
                    style += "height: 100%; width: 5px; ";
                }
                else {
                    style += "width: 100%; height: 5px; ";
                }
                obj = document.createElement("div");
                obj.classList.add("dragresize_" + dragresize_classarray[j]);
                obj.setAttribute("style", style);
                obj.setAttribute("onmousedown", "resizemousedownfunction(event, this)");
                objarray[i].parentElement.appendChild(obj);
                j += 1;
            }
        }
        if (objarray[i].classList.contains("draggable") && objarray[i].parentElement.getElementsByClassName("dragresize_draggable").length < 1) {
            obj = document.createElement("div");
            obj.classList.add("dragresize_draggable");
            obj.setAttribute("style", "position: absolute; border: 2px solid gray; cursor: grab; z-index: 105; top: -15px; left: 50%; width: 10px; height: 10px; ");
            obj.setAttribute("onmousedown", "resizemousedownfunction(event, this)");
            objarray[i].parentElement.appendChild(obj);
    }
        i += 1;
    }
}
var dragresize_changingsettings;
var dragresize_changingobj;
function resizemousedownfunction(event, element) {
    if (element.parentElement.classList.contains("dragresize_enable")) {
        var obj = document.createElement("div");
        var str = element.getAttribute("style");
        if (element.classList.contains("dragresize_draggable")){
            str = "cursor: grabbing;";
        }
        else{
            str = str.slice(str.indexOf("cursor:"), str.indexOf(";", str.indexOf("cursor:")) + 1);
        }
        obj.setAttribute("style", "position:absolute; height: 100%; width: 100%; top: 0px; left: 0px; z-index: 1000; " + str)
        obj.setAttribute("onmousemove", "resizemousemovefunction(event)");
        obj.setAttribute("onmouseup", "resizemouseupfunction(this)");
        dragresize_changingobj = element.parentElement;
        document.getElementsByTagName("body")[0].appendChild(obj);
        dragresize_changingsettings = { "changestyle": element.classList, "sy": dragresize_changingobj.offsetTop, "sx": dragresize_changingobj.offsetLeft, "sw": dragresize_changingobj.clientWidth, "sh": dragresize_changingobj.clientHeight, "msx": event.clientX, "msy": event.clientY, "mnx": event.clientX, "mny": event.clientY };
    }
}
function resizemousemovefunction(event) {
    var v = dragresize_changingsettings.changestyle.toString();
    v = v.slice(v.indexOf("_") + 1, v.length)
    if (v == dragresize_classarray[0] || v == dragresize_classarray[4] || v == dragresize_classarray[5]) {
        if (dragresize_changingsettings.sh + (event.clientY - dragresize_changingsettings.msy) * - 1 > 10) {
            dragresize_changingsettings.sy += (event.clientY - dragresize_changingsettings.msy);
            dragresize_changingsettings.sh += (event.clientY - dragresize_changingsettings.msy) * - 1;
            dragresize_changingsettings.msy = event.clientY;
        }
    }
    if (v == dragresize_classarray[1] || v == dragresize_classarray[6] || v == dragresize_classarray[7]) {
        if (dragresize_changingsettings.sh + (event.clientY - dragresize_changingsettings.msy) > 10) {
            dragresize_changingsettings.sh += (event.clientY - dragresize_changingsettings.msy);
            dragresize_changingsettings.msy = event.clientY;
        }
    }
    if (v == dragresize_classarray[2] || v == dragresize_classarray[5] || v == dragresize_classarray[7]) {
        if (dragresize_changingsettings.sw + (event.clientX - dragresize_changingsettings.msx) > 10) {
            dragresize_changingsettings.sw += (event.clientX - dragresize_changingsettings.msx)
            dragresize_changingsettings.msx = event.clientX;
        }
    }
    if (v == dragresize_classarray[3] || v == dragresize_classarray[4] || v == dragresize_classarray[6]) {
        if (dragresize_changingsettings.sw + (event.clientX - dragresize_changingsettings.msx) * - 1 > 10) {
            dragresize_changingsettings.sw += (event.clientX - dragresize_changingsettings.msx) * - 1;
            dragresize_changingsettings.sx += (event.clientX - dragresize_changingsettings.msx);
            dragresize_changingsettings.msx = event.clientX;
        }
    }
    if (v == "draggable") {
            dragresize_changingsettings.sx += (event.clientX - dragresize_changingsettings.msx);
            dragresize_changingsettings.sy += (event.clientY - dragresize_changingsettings.msy);
            dragresize_changingsettings.msx = event.clientX;
            dragresize_changingsettings.msy = event.clientY;
    }
    dragresize_changingobj.setAttribute("style", "position: absolute; border: 2px solid gray; top: " + dragresize_changingsettings.sy + "px; left: " + dragresize_changingsettings.sx + "px; width:" + dragresize_changingsettings.sw + "px; height:" + dragresize_changingsettings.sh + "px; z-index: 500;");
}
function resizemouseupfunction(element) {
    var style = dragresize_changingobj.getAttribute("style");
        style = style.slice(0 ,style.indexOf("z-index:")) + style.slice(style.indexOf(";", style.indexOf("z-index:")) + 1, style.lastIndexOf(";") + 1)
        dragresize_changingobj.setAttribute("style", style + " z-index: 100;");
    element.remove();
}
