//window.onload = Rubik_Cube_init;

var White_Side = ["White", "White", "White", "White", "White", "White", "White", "White", "White"];
var Yellow_Side = ["Yellow", "Yellow", "Yellow", "Yellow", "Yellow", "Yellow", "Yellow", "Yellow", "Yellow"];
var Red_Side = ["Red", "Red", "Red", "Red", "Red", "Red", "Red", "Red", "Red"];
var Blue_Side = ["Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue"];
var Orange_Side = ["Orange", "Orange", "Orange", "Orange", "Orange", "Orange", "Orange", "Orange", "Orange"];
var Green_Side = ["Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green", "Green"];

function Rubik_Cube_init() {
    var cssstyle = document.createElement("style");
    cssstyle.innerHTML = ".Rubik_Cube_Sides{display: grid; grid-template-rows: auto auto auto; grid-template-columns: auto auto auto;} .Rubik_Cube_Cube{ padding: 10%; transform-style: preserve-3d; transition-duration: 1s;} .RubikCube{display: grid; grid-template-rows: auto 25px; grid-template-columns: auto 25px; } .Rubik_Cube_White{ background-color: #FFF; border: 2px solid black; } .Rubik_Cube_Yellow{ background-color: #ffff00; border: 2px solid black; } .Rubik_Cube_Red{ background-color: #ff0000; border: 2px solid black; } .Rubik_Cube_Blue{ background-color: #0000FF; border: 2px solid black; } .Rubik_Cube_Green{ background-color: #00ff00; border: 2px solid black; } .Rubik_Cube_Orange{ background-color: #ff7f00; border: 2px solid black; } .Rubik_Cube_Slider { -webkit-appearance: none; width: 100%; height: 25px; background: #d3d3d3; outline: none; opacity: 0.7; -webkit-transition: .2s; transition: opacity .2s; } .Rubik_Cube_Slider:hover { opacity: 1; } .Rubik_Cube_Slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 25px; height: 25px; background: #4CAF50; cursor: pointer; } .Rubik_Cube_Slider::-moz-range-thumb { width: 25px; height: 25px; background: #4CAF50; cursor: pointer; } .Rubik_Cube_Slider_V { -webkit-appearance: none; height: 25px; background: #d3d3d3; outline: none; opacity: 0.7; -webkit-transition: .2s; transition: opacity .2s; transform: rotate(90deg); } .Rubik_Cube_Slider_V:hover { opacity: 1; } .Rubik_Cube_Slider_V::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 25px; height: 25px; background: #4CAF50; cursor: pointer; } .Rubik_Cube_Slider_V::-moz-range-thumb { width: 25px; height: 25px; background: #4CAF50; cursor: pointer; }";
    if (document.getElementsByTagName("head").length > 0) {
        document.getElementsByTagName("html")[0].appendChild(document.createElement("head"));
    }
    document.getElementsByTagName("head")[0].appendChild(cssstyle);
    var objarray = document.getElementsByClassName("RubikCube");
    var i = 0;
    while (i < objarray.length) {
        objarray[i].setAttribute("onresize", "Rubik_Cube_Update_Size()");
        objarray[i].setAttribute("onchange", "Rubik_Cube_Update_Size()");
        var objectadd = document.createElement("div");
        objectadd.classList.add("Rubik_Cube_Cube");
        objarray[i].appendChild(objectadd);

        objectadd = document.createElement("div");
        objectadd.setAttribute("onresize", "Rubik_Cube_Update_Size()");
        objarray[i].appendChild(objectadd);

        objectadd = document.createElement("input");
        objectadd.classList.add("Rubik_Cube_Slider_V");
        objectadd.setAttribute("type", "range");
        objectadd.setAttribute("min", "1");
        objectadd.setAttribute("max", "100");
        objectadd.setAttribute("value", "50");
        objectadd.setAttribute("onchange", "Rubik_Cube_Rotate_Cube()");
        objarray[i].getElementsByTagName("div")[1].appendChild(objectadd);

        objectadd = document.createElement("input");
        objectadd.classList.add("Rubik_Cube_Slider");
        objectadd.setAttribute("type", "range");
        objectadd.setAttribute("min", "1");
        objectadd.setAttribute("max", "100");
        objectadd.setAttribute("value", "50");
        objectadd.setAttribute("onchange", "Rubik_Cube_Rotate_Cube()");
        objarray[i].appendChild(objectadd);



        i += 1;
    }
    Rubik_Cube_Build();
    Rubik_Cube_Update_Size();
    Rubik_Cube_Rotate_Cube();
}
function Rubik_Cube_Update_Size() {
    var object = document.getElementsByClassName("Rubik_Cube_Slider_V");
    var i = 0;
    while (i < object.length) {
        object[i].setAttribute("style", "position: relative; width: " + object[i].parentElement.offsetHeight + "px; bottom: -" + (object[i].parentElement.offsetHeight / 2 - 12.5) + "px; right: " + (object[i].parentElement.offsetHeight / 2 - 12.5) + "px; ");
        i += 1;
    }

}
function Rubik_Cube_Build() {
    var objarray = document.getElementsByClassName("Rubik_Cube_Cube");
    var i = 0;
    while (i < objarray.length) {
        objarray[i].setAttribute("onresize", "Rubik_Cube_Update_Size()");
        var colorarray = ["White", "Yellow", "Red", "Blue", "Green", "Orange"];
        var stylearray = ["rotateX(90deg)", "rotateX(-90deg)", "rotateY(90deg)", "rotateY(0deg)", "rotateY(180deg)", "rotateY(-90deg)"];
        var j = 0;
        while (j < colorarray.length) {
            var objectadd = document.createElement("div");
            objectadd.classList.add(colorarray[j] + "_Side");
            objectadd.classList.add("Rubik_Cube_Sides");
            objectadd.setAttribute("style", "position: fixed; transform: " + stylearray[j] + " translateX(0px) translateY(0px) translateZ(" + (400 / 2) + "px); width: " + 400 + "px; height: " + 400 + "px;")
            var e = 0;
            while (e < 9) {
                var colordiv = document.createElement("div")
                //colordiv.classList.add("Rubik_Cube_" + colorarray[j])
                objectadd.appendChild(colordiv);
                e += 1;
            }
            objarray[i].appendChild(objectadd);
            j += 1;
        }

        i += 1;
    }
    Rubik_Cube_Update_Color();
}
function Rubik_Cube_Update_Color() {
    var objarray = document.getElementsByClassName("White_Side")[0].children;
    var i = 0;
    while (i < objarray.length) {
        objarray[i].className = "Rubik_Cube_" + White_Side[i];
        i += 1;
    }
    objarray = document.getElementsByClassName("Yellow_Side")[0].children;
    i = 0;
    while (i < objarray.length) {
        objarray[i].className = "Rubik_Cube_" + Yellow_Side[i];
        i += 1;
    }
    objarray = document.getElementsByClassName("Red_Side")[0].children;
    i = 0;
    while (i < objarray.length) {
        objarray[i].className = "Rubik_Cube_" + Red_Side[i];
        i += 1;
    }
    objarray = document.getElementsByClassName("Blue_Side")[0].children;
    i = 0;
    while (i < objarray.length) {
        objarray[i].className = "Rubik_Cube_" + Blue_Side[i];
        i += 1;
    }
    objarray = document.getElementsByClassName("Orange_Side")[0].children;
    i = 0;
    while (i < objarray.length) {
        objarray[i].className = "Rubik_Cube_" + Orange_Side[i];
        i += 1;
    }
    objarray = document.getElementsByClassName("Green_Side")[0].children;
    i = 0;
    while (i < objarray.length) {
        objarray[i].className = "Rubik_Cube_" + Green_Side[i];
        i += 1;
    }

}
function Rubik_Cube_Rotate_Cube() {
    var obj = document.getElementsByClassName("Rubik_Cube_Cube")[0];
    var sliderX = document.getElementsByClassName("Rubik_Cube_Slider")[0];
    var sliderY = document.getElementsByClassName("Rubik_Cube_Slider_V")[0];
    obj.setAttribute("Style", "transform: rotateY(" + (360 / 100 * sliderX.value) + "deg) rotateX(" + (360 / 100 * sliderY.value) + "deg)")
}
function Rubik_Cube_Rotate_Side(side_way) {
    var colorholder = [8];
    var colorsideholder = [2];
    var i = 0;
    switch (side_way) {
        case "WC":
            while (i < White_Side.length) {
                colorholder[i] = White_Side[i];
                i += 1;
            }
            White_Side[0] = colorholder[6];
            White_Side[1] = colorholder[3];
            White_Side[2] = colorholder[0];
            White_Side[3] = colorholder[7];
            White_Side[5] = colorholder[1];
            White_Side[6] = colorholder[8];
            White_Side[7] = colorholder[5];
            White_Side[8] = colorholder[2];

            colorsideholder[0] = Red_Side[0];
            colorsideholder[1] = Red_Side[1];
            colorsideholder[2] = Red_Side[2];

            Red_Side[0] = Green_Side[0];
            Red_Side[1] = Green_Side[1];
            Red_Side[2] = Green_Side[2];

            Green_Side[0] = Orange_Side[0];
            Green_Side[1] = Orange_Side[1];
            Green_Side[2] = Orange_Side[2];

            Orange_Side[0] = Blue_Side[0];
            Orange_Side[1] = Blue_Side[1];
            Orange_Side[2] = Blue_Side[2];

            Blue_Side[0] = colorsideholder[0];
            Blue_Side[1] = colorsideholder[1];
            Blue_Side[2] = colorsideholder[2];

            break;
        case "WCC":
            while (i < White_Side.length) {
                colorholder[i] = White_Side[i];
                i += 1;
            }
            White_Side[6] = colorholder[0];
            White_Side[3] = colorholder[1];
            White_Side[0] = colorholder[2];
            White_Side[7] = colorholder[3];
            White_Side[1] = colorholder[5];
            White_Side[8] = colorholder[6];
            White_Side[5] = colorholder[7];
            White_Side[2] = colorholder[8];

            colorsideholder[0] = Red_Side[0];
            colorsideholder[1] = Red_Side[1];
            colorsideholder[2] = Red_Side[2];

            Red_Side[0] = Blue_Side[0];
            Red_Side[1] = Blue_Side[1];
            Red_Side[2] = Blue_Side[2];

            Blue_Side[0] = Orange_Side[0];
            Blue_Side[1] = Orange_Side[1];
            Blue_Side[2] = Orange_Side[2];

            Orange_Side[0] = Green_Side[0];
            Orange_Side[1] = Green_Side[1];
            Orange_Side[2] = Green_Side[2];

            Green_Side[0] = colorsideholder[0];
            Green_Side[1] = colorsideholder[1];
            Green_Side[2] = colorsideholder[2];
            break;
        case "YC":
            while (i < Yellow_Side.length) {
                colorholder[i] = Yellow_Side[i];
                i += 1;
            }
            Yellow_Side[0] = colorholder[6];
            Yellow_Side[1] = colorholder[3];
            Yellow_Side[2] = colorholder[0];
            Yellow_Side[3] = colorholder[7];
            Yellow_Side[5] = colorholder[1];
            Yellow_Side[6] = colorholder[8];
            Yellow_Side[7] = colorholder[5];
            Yellow_Side[8] = colorholder[2];

            colorsideholder[0] = Red_Side[6];
            colorsideholder[1] = Red_Side[7];
            colorsideholder[2] = Red_Side[8];

            Red_Side[6] = Blue_Side[6];
            Red_Side[7] = Blue_Side[7];
            Red_Side[8] = Blue_Side[8];

            Blue_Side[6] = Orange_Side[6];
            Blue_Side[7] = Orange_Side[7];
            Blue_Side[8] = Orange_Side[8];

            Orange_Side[6] = Green_Side[6];
            Orange_Side[7] = Green_Side[7];
            Orange_Side[8] = Green_Side[8];

            Green_Side[6] = colorsideholder[0];
            Green_Side[7] = colorsideholder[1];
            Green_Side[8] = colorsideholder[2];
            break;
        case "YCC":
            while (i < Yellow_Side.length) {
                colorholder[i] = Yellow_Side[i];
                i += 1;
            }
            Yellow_Side[6] = colorholder[0];
            Yellow_Side[3] = colorholder[1];
            Yellow_Side[0] = colorholder[2];
            Yellow_Side[7] = colorholder[3];
            Yellow_Side[1] = colorholder[5];
            Yellow_Side[8] = colorholder[6];
            Yellow_Side[5] = colorholder[7];
            Yellow_Side[2] = colorholder[8];

            colorsideholder[0] = Red_Side[6];
            colorsideholder[1] = Red_Side[7];
            colorsideholder[2] = Red_Side[8];

            Red_Side[6] = Green_Side[6];
            Red_Side[7] = Green_Side[7];
            Red_Side[8] = Green_Side[8];

            Green_Side[6] = Orange_Side[6];
            Green_Side[7] = Orange_Side[7];
            Green_Side[8] = Orange_Side[8];

            Orange_Side[6] = Blue_Side[6];
            Orange_Side[7] = Blue_Side[7];
            Orange_Side[8] = Blue_Side[8];

            Blue_Side[6] = colorsideholder[0];
            Blue_Side[7] = colorsideholder[1];
            Blue_Side[8] = colorsideholder[2];
            break;
        case "RC":
            while (i < Red_Side.length) {
                colorholder[i] = Red_Side[i];
                i += 1;
            }
            Red_Side[0] = colorholder[6];
            Red_Side[1] = colorholder[3];
            Red_Side[2] = colorholder[0];
            Red_Side[3] = colorholder[7];
            Red_Side[5] = colorholder[1];
            Red_Side[6] = colorholder[8];
            Red_Side[7] = colorholder[5];
            Red_Side[8] = colorholder[2];

            colorsideholder[0] = White_Side[2];
            colorsideholder[1] = White_Side[5];
            colorsideholder[2] = White_Side[8];

            White_Side[2] = Blue_Side[2];
            White_Side[5] = Blue_Side[5];
            White_Side[8] = Blue_Side[8];

            Blue_Side[2] = Yellow_Side[2];
            Blue_Side[5] = Yellow_Side[5];
            Blue_Side[8] = Yellow_Side[8];

            Yellow_Side[2] = Green_Side[6];
            Yellow_Side[5] = Green_Side[3];
            Yellow_Side[8] = Green_Side[0];

            Green_Side[6] = colorsideholder[0];
            Green_Side[3] = colorsideholder[1];
            Green_Side[0] = colorsideholder[2];
            break;
        case "RCC":
            while (i < Red_Side.length) {
                colorholder[i] = Red_Side[i];
                i += 1;
            }
            Red_Side[6] = colorholder[0];
            Red_Side[3] = colorholder[1];
            Red_Side[0] = colorholder[2];
            Red_Side[7] = colorholder[3];
            Red_Side[1] = colorholder[5];
            Red_Side[8] = colorholder[6];
            Red_Side[5] = colorholder[7];
            Red_Side[2] = colorholder[8];

            colorsideholder[0] = Yellow_Side[2];
            colorsideholder[1] = Yellow_Side[5];
            colorsideholder[2] = Yellow_Side[8];

            Yellow_Side[2] = Blue_Side[2];
            Yellow_Side[5] = Blue_Side[5];
            Yellow_Side[8] = Blue_Side[8];

            Blue_Side[2] = White_Side[2];
            Blue_Side[5] = White_Side[5];
            Blue_Side[8] = White_Side[8];

            White_Side[2] = Green_Side[6];
            White_Side[5] = Green_Side[3];
            White_Side[8] = Green_Side[0];

            Green_Side[6] = colorsideholder[0];
            Green_Side[3] = colorsideholder[1];
            Green_Side[0] = colorsideholder[2];
            break;
        case "BC":
            while (i < Blue_Side.length) {
                colorholder[i] = Blue_Side[i];
                i += 1;
            }
            Blue_Side[0] = colorholder[6];
            Blue_Side[1] = colorholder[3];
            Blue_Side[2] = colorholder[0];
            Blue_Side[3] = colorholder[7];
            Blue_Side[5] = colorholder[1];
            Blue_Side[6] = colorholder[8];
            Blue_Side[7] = colorholder[5];
            Blue_Side[8] = colorholder[2];

            colorsideholder[0] = White_Side[6];
            colorsideholder[1] = White_Side[7];
            colorsideholder[2] = White_Side[8];

            White_Side[6] = Orange_Side[8];
            White_Side[7] = Orange_Side[5];
            White_Side[8] = Orange_Side[2];

            Orange_Side[8] = Yellow_Side[2];
            Orange_Side[5] = Yellow_Side[1];
            Orange_Side[2] = Yellow_Side[0];

            Yellow_Side[2] = Red_Side[0];
            Yellow_Side[1] = Red_Side[3];
            Yellow_Side[0] = Red_Side[6];

            Red_Side[0] = colorsideholder[0];
            Red_Side[3] = colorsideholder[1];
            Red_Side[6] = colorsideholder[2];
            break;
        case "BCC":
            while (i < Blue_Side.length) {
                colorholder[i] = Blue_Side[i];
                i += 1;
            }
            Blue_Side[6] = colorholder[0];
            Blue_Side[3] = colorholder[1];
            Blue_Side[0] = colorholder[2];
            Blue_Side[7] = colorholder[3];
            Blue_Side[1] = colorholder[5];
            Blue_Side[8] = colorholder[6];
            Blue_Side[5] = colorholder[7];
            Blue_Side[2] = colorholder[8];

            colorsideholder[0] = White_Side[6];
            colorsideholder[1] = White_Side[7];
            colorsideholder[2] = White_Side[8];

            White_Side[6] = Red_Side[0];
            White_Side[7] = Red_Side[3];
            White_Side[8] = Red_Side[6];

            Red_Side[0] = Yellow_Side[2];
            Red_Side[3] = Yellow_Side[1];
            Red_Side[6] = Yellow_Side[0];

            Yellow_Side[2] = Orange_Side[8];
            Yellow_Side[1] = Orange_Side[5];
            Yellow_Side[0] = Orange_Side[2];

            Orange_Side[8] = colorsideholder[0];
            Orange_Side[5] = colorsideholder[1];
            Orange_Side[2] = colorsideholder[2];
            break;
        case "OC":
            while (i < Orange_Side.length) {
                colorholder[i] = Orange_Side[i];
                i += 1;
            }
            Orange_Side[0] = colorholder[6];
            Orange_Side[1] = colorholder[3];
            Orange_Side[2] = colorholder[0];
            Orange_Side[3] = colorholder[7];
            Orange_Side[5] = colorholder[1];
            Orange_Side[6] = colorholder[8];
            Orange_Side[7] = colorholder[5];
            Orange_Side[8] = colorholder[2];

            colorsideholder[0] = White_Side[6];
            colorsideholder[1] = White_Side[3];
            colorsideholder[2] = White_Side[0];

            White_Side[6] = Green_Side[2];
            White_Side[3] = Green_Side[5];
            White_Side[0] = Green_Side[8];

            Green_Side[2] = Yellow_Side[6];
            Green_Side[5] = Yellow_Side[3];
            Green_Side[8] = Yellow_Side[0];

            Yellow_Side[6] = Blue_Side[6];
            Yellow_Side[3] = Blue_Side[3];
            Yellow_Side[0] = Blue_Side[0];

            Blue_Side[6] = colorsideholder[0];
            Blue_Side[3] = colorsideholder[1];
            Blue_Side[0] = colorsideholder[2];
            break;
        case "OCC":
            while (i < Orange_Side.length) {
                colorholder[i] = Orange_Side[i];
                i += 1;
            }
            Orange_Side[6] = colorholder[0];
            Orange_Side[3] = colorholder[1];
            Orange_Side[0] = colorholder[2];
            Orange_Side[7] = colorholder[3];
            Orange_Side[1] = colorholder[5];
            Orange_Side[8] = colorholder[6];
            Orange_Side[5] = colorholder[7];
            Orange_Side[2] = colorholder[8];

            colorsideholder[0] = White_Side[6];
            colorsideholder[1] = White_Side[3];
            colorsideholder[2] = White_Side[0];

            White_Side[6] = Blue_Side[6];
            White_Side[3] = Blue_Side[3];
            White_Side[0] = Blue_Side[0];

            Blue_Side[6] = Yellow_Side[6];
            Blue_Side[3] = Yellow_Side[3];
            Blue_Side[0] = Yellow_Side[0];

            Yellow_Side[6] = Green_Side[2];
            Yellow_Side[3] = Green_Side[5];
            Yellow_Side[0] = Green_Side[8];

            Green_Side[2] = colorsideholder[0];
            Green_Side[5] = colorsideholder[1];
            Green_Side[8] = colorsideholder[2];
            break;
        case "GC":
            while (i < Green_Side.length) {
                colorholder[i] = Green_Side[i];
                i += 1;
            }
            Green_Side[0] = colorholder[6];
            Green_Side[1] = colorholder[3];
            Green_Side[2] = colorholder[0];
            Green_Side[3] = colorholder[7];
            Green_Side[5] = colorholder[1];
            Green_Side[6] = colorholder[8];
            Green_Side[7] = colorholder[5];
            Green_Side[8] = colorholder[2];

            colorsideholder[0] = White_Side[0];
            colorsideholder[1] = White_Side[1];
            colorsideholder[2] = White_Side[2];

            White_Side[0] = Red_Side[2];
            White_Side[1] = Red_Side[5];
            White_Side[2] = Red_Side[8];

            Red_Side[2] = Yellow_Side[8];
            Red_Side[5] = Yellow_Side[7];
            Red_Side[8] = Yellow_Side[6];

            Yellow_Side[8] = Orange_Side[6];
            Yellow_Side[7] = Orange_Side[3];
            Yellow_Side[6] = Orange_Side[0];

            Orange_Side[6] = colorsideholder[0];
            Orange_Side[3] = colorsideholder[1];
            Orange_Side[0] = colorsideholder[2];
            break;
        case "GCC":
            while (i < Green_Side.length) {
                colorholder[i] = Green_Side[i];
                i += 1;
            }
            Green_Side[6] = colorholder[0];
            Green_Side[3] = colorholder[1];
            Green_Side[0] = colorholder[2];
            Green_Side[7] = colorholder[3];
            Green_Side[1] = colorholder[5];
            Green_Side[8] = colorholder[6];
            Green_Side[5] = colorholder[7];
            Green_Side[2] = colorholder[8];

            colorsideholder[0] = White_Side[0];
            colorsideholder[1] = White_Side[1];
            colorsideholder[2] = White_Side[2];

            White_Side[0] = Orange_Side[6];
            White_Side[1] = Orange_Side[3];
            White_Side[2] = Orange_Side[0];

            Orange_Side[6] = Yellow_Side[8];
            Orange_Side[3] = Yellow_Side[7];
            Orange_Side[0] = Yellow_Side[6];

            Yellow_Side[8] = Red_Side[2];
            Yellow_Side[7] = Red_Side[5];
            Yellow_Side[6] = Red_Side[8];

            Red_Side[2] = colorsideholder[0];
            Red_Side[5] = colorsideholder[1];
            Red_Side[8] = colorsideholder[2];
            break;

    }
    Rubik_Cube_Update_Color();
}
