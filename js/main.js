function uniqueNumList(length) 
{
    const listofNum = [];
    var num = 0;

    for (var i = 0; i < length; i++) 
    {
        while (true) 
        {
            num = parseInt(Math.floor(Math.random()*(length+1)));
            if (!listofNum.includes(num) && num != 0) {
                listofNum.push(num);
                break;
            }
        }
    }
    return listofNum;
}

function setUp(givenList, length) 
{
    var sortElements = [];
    for (var x = 0; x < length; x++)
    {
        sortElements[x] = document.createElement("div");
        sortElements[x].className = "sortElement";
        sortElements[x].id = givenList[x];
        sortElements[x].style.height = height * (givenList[x]/length) + "px";
        sortElements[x].style.width = width/length+"px";
        sortElements[x].style.left = (width/length)*x+"px";
        sortElements[x].style.top = height - (height * (givenList[x]/length)) + "px";

        document.getElementById("animation").appendChild(sortElements[x]);
    }
}

function getOrder(length) {
    var b = [];
    for (var x = 0; x < length; x++) {
        b.push(x);
    }
    return b;
}


function pause() {
    animate = false;
}

function play() {
    animate = true;
}

function reset() {
    numList = [...origList];
    document.getElementById("animation").innerText = "";
    setUp(origList, length);

    selectSorted = 0;
    selectSortedList = [];
    window.cancelAnimationFrame(frameId);
    
    for (var x = 0; x < sorts.length; x++) {
        document.getElementById(sorts[x]).disabled = false;
    }
}

function unlock() {
    for (var x = 0; x < sorts.length; x++) {
        document.getElementById(sorts[x]).disabled = false;
    }
}



function startSort(inpname) {
    animate = true;
    List = [...origList];

    for (var x = 0; x < sorts.length; x++) {
        document.getElementById(sorts[x]).disabled = true;
    }
    if (inpname === "bubbleSort") {
        frameId = window.requestAnimationFrame(bubbleSort);
    } else if (inpname === "selectionSort") {
        frameId = window.requestAnimationFrame(selectionSort);
    } else if (inpname === "insertionSort") {
        frameId = window.requestAnimationFrame(function() {
            insertionSort(1);
        });
    }

}


function bubbleSort() {
    if (animate === true) {
        var changes = 0;
        for (var x = 0; x < numList.length-1; x++) {        //sorting algorith
            if (numList[x+1] < numList[x]) {
                var list0 = numList[x];
                var list1 = numList[x+1];
                numList[x] = list1;
                numList[x+1] = list0;
                changes += 1;

                var xpos = window.getComputedStyle(document.getElementById(numList[x])).left;
                var x1pos = window.getComputedStyle(document.getElementById(numList[x+1])).left

                document.getElementById(numList[x]).style.left = x1pos;
                document.getElementById(numList[x+1]).style.left = xpos;

                //break;
            } 
        }
        if (changes === 0) {
            console.log("Bubble Sort Finsished");
            //unlock();
        } else {
            frameId = window.requestAnimationFrame(bubbleSort);
        }
    } else {
        frameId = window.requestAnimationFrame(bubbleSort);
    }   
}
function selectionSort() {
    if (animate === true) {
        var minValue = length+1;
        for (var x = 0; x < numList.length; x++) {
            if (numList[x] < minValue && x > selectSortedList.length-1) {
                minValue = numList[x];
                var minIndex = x;
            }
        }

        if (!(minValue === (length+1))) {

            selectSortedList.push(minValue);


            var value = numList[selectSortedList.length-1]

            numList[selectSortedList.length-1] = minValue;
            numList[minIndex] = value;

            var xpos = window.getComputedStyle(document.getElementById(numList[minIndex])).left;
            var x1pos = window.getComputedStyle(document.getElementById(selectSortedList[selectSortedList.length-1])).left;

            document.getElementById(numList[minIndex]).style.left = x1pos;
            document.getElementById(selectSortedList[selectSortedList.length-1]).style.left = xpos;


            frameId = window.requestAnimationFrame(selectionSort);
        } else {
            console.log("Selection Sort Done")
            //unlock();
        }
    } else {
        frameId = window.requestAnimationFrame(selectionSort);
    }   
}

function removeItemOnce(arr, value) { //removes specific item from array
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

function insertionSort(item) {
    if (animate === true) {
        if (!(item === length)) {
            if (item < numList.length) {
                var key = numList[item];
                for (var x = 0; x < item; x++) {
                    if (numList[x] > key) {
                        removeItemOnce(numList, key);
                        numList.splice(x, 0, key);
                        document.getElementById("animation").innerText = "";
                        setUp(numList, length);    
                        break;
                    }
                }
                item += 1;
                frameId = window.requestAnimationFrame(function() {
                    insertionSort(item)
                });   
            }
        } else {
            console.log("Insertion Sort Done")
        }
    } else {
        frameId = window.requestAnimationFrame(function() {
            insertionSort(item)
        });
    }
    
}


  

var frameId;
var animate = true;
const length = 750;
const width = document.getElementById("animation").clientWidth;
const height = document.getElementById("animation").clientHeight;

var numList = uniqueNumList(length);

const origList = [...numList];
var bars = setUp(numList, length);
const sorts = ["selectionSort","bubbleSort", "insertionSort"];

var selectSorted = 0;
var selectSortedList = [];




























function resizePage() {
    var widthlocal = document.getElementById("animation").clientWidth;
    var heightlocal = document.getElementById("animation").clientHeight;

    for (var x = 0; x < numList.length; x++) {
        document.getElementById(numList[x]).style.height = heightlocal * (numList[x]/length) + "px";
        document.getElementById(numList[x]).style.width = widthlocal/length+"px";
        document.getElementById(numList[x]).style.left = (widthlocal/length)*x+"px";
        document.getElementById(numList[x]).style.top = heightlocal - (heightlocal * (numList[x]/length)) + "px";
    }
}


window.addEventListener('resize', function() {
    resizePage();
});
