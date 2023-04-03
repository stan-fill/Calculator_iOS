const result = document.querySelector(".result span");
const numbers = document.querySelectorAll(".numbers");
const signs = document.querySelectorAll(".sign");
const ac = document.querySelector(".ac");
const negative = document.querySelector(".negative");
const percent = document.querySelector(".percent");
const equal = document.querySelector(".equal");
const dot = document.querySelector(".dot");
let firstValue = "";
let secondValue = "";
let isFirstValue = false;
let resultValue = 0;
let signValue = "";
let dotClicks = 0;
// Getting numbers from html
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        var numberValue = number.getAttribute("value");
        if (isFirstValue === false && firstValue.length < 9) {
            getFirstValue(numberValue);
        }
        if (secondValue.length < 9) {
            getSecondValue(numberValue);
        }
        switchFontSize();
        ac.innerHTML = "C";
    });
});
// Set a dot and checking if it's only one
dot.addEventListener("click", () => {
    if (firstValue != "" && dotClicks == 1) {
        let dotValue = dot.getAttribute("value");
        if (isFirstValue === false) {
            getFirstValue(dotValue);
        }
        getSecondValue(dotValue);
    }
});
// Set of numbers in firstValue
function getFirstValue(el) {
    firstValue += el;
    result.innerHTML = firstValue;
}
// Set of numbers in secondValue
function getSecondValue(el) {
    if (firstValue != "" && signValue != "") {
        result.style.fontSize = 90 + "px";
        secondValue += el;
        result.innerHTML = secondValue;
    }
}
// Checking current <span> length and switching font-size
function switchFontSize() {
    switch (result.innerHTML.length) {
        case 8:
            result.style.fontSize = 80 + "px";
            break;
        case 9:
            result.style.fontSize = 70 + "px";
            break;
        case 10:
            result.style.fontSize = 63 + "px";
            break;
        case 11:
            result.style.fontSize = 58 + "px";
            break;
        case 12:
            result.style.fontSize = 53 + "px";
            break;
        case 13:
            result.style.fontSize = 49 + "px";
            break;
        case 14:
            result.style.fontSize = 46 + "px";
            break;
        case 15:
            result.style.fontSize = 43 + "px";
            break;
        case 16:
            result.style.fontSize = 40 + "px";
            break;
        case 17:
            result.style.fontSize = 37 + "px";
            break;
    }
}
let i = true;
// Getting a sign for operations
function getSign() {
    signs.forEach((sign) => {
        sign.addEventListener("click", () => {
            if (firstValue != "") {
                if (secondValue != "") {
                    if (i == false) {
                        secondValue = "";
                    } else {
                        operations();
                        secondValue = "";
                    }
                }
                i = true;
                signValue = sign.getAttribute("value");
                isFirstValue = true;
                dotClicks = 0;
            }
        });
    });
}
getSign();
// Operations with values
function operations() {
    if (firstValue != "") {
        firstValue = +firstValue;
        secondValue = +secondValue;
        switch (signValue) {
            case "+":
                resultValue = firstValue + secondValue;
                firstValue = resultValue;
                break;
            case "-":
                resultValue = firstValue - secondValue;
                firstValue = resultValue;
                break;
            case "/":
                resultValue = firstValue / secondValue;
                firstValue = resultValue;
                break;
            case "*":
                resultValue = firstValue * secondValue;
                firstValue = resultValue;
                break;
        }
    }
    result.innerHTML = resultValue;
    checkResultLength();
    switchFontSize();
}
// Click on equal
equal.addEventListener("click", function () {
    operations();
    i = false;
    switchFontSize();
});
// Clear values
if (result.innerHTML != "") {
    ac.addEventListener("click", () => {
        firstValue = "";
        secondValue = "";
        isFirstValue = false;
        signValue = "";
        result.innerHTML = "0";
        dotClicks = 0;
        result.style.fontSize = 90 + "px";
        ac.innerHTML = "AC";
    });
}
// Checking too big values in result
function checkResultLength() {
    resultValue = String(resultValue);
    if (result.innerHTML.length > 20 && result.innerHTML.includes(".")) {
        firstValue = "";
        secondValue = "";
        result.innerHTML = "Ошибка";
        result.style.fontSize = 90 + "px";
    }
    if (result.innerHTML.length > 16 && !result.innerHTML.includes(".")) {
        resultValue = +resultValue;
        result.innerHTML = resultValue.toExponential(5);
    }
    if (result.innerHTML.length >= 18 && result.innerHTML.includes(".")) {
        resultValue = +resultValue;
        result.innerHTML = resultValue.toFixed(1);
    }
}
// Switching value to negative
negative.addEventListener("click", () => {
    if (firstValue != "" && secondValue == "") {
        firstValue = -firstValue;
        result.innerHTML = firstValue;
    } else if (secondValue != "" && i == true) {
        secondValue = -secondValue;
        result.innerHTML = secondValue;
    } else if (firstValue != "" && secondValue != "") {
        resultValue = -resultValue;
        firstValue = resultValue;
        result.innerHTML = resultValue;
    }
});
// Switching value to percent
percent.addEventListener("click", () => {
    if (firstValue != "" && secondValue == "") {
        firstValue = firstValue / 100;
        result.innerHTML = firstValue;
    } else if (firstValue != "" && i == true) {
        secondValue = secondValue / 100;
        result.innerHTML = secondValue;
    } else if (firstValue != "" && secondValue != "") {
        resultValue = resultValue / 100;
        firstValue = resultValue;
        result.innerHTML = resultValue;
    }
    checkResultLength();
    switchFontSize();
});
