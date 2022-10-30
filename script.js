function init() {
  //variables

  var input = document.querySelector(".result");
  var operationDisplay = document.querySelector(".operation");
  var numbers = document.querySelectorAll(".number");
  var clear = document.querySelector("#clear");
  var clearEntry = document.querySelector("#clearEntry");
  var backspace = document.querySelector("#backspace");
  var divide = document.querySelector("#divide");
  var multiply = document.querySelector("#multiply");
  var minus = document.querySelector("#minus");
  var plus = document.querySelector("#plus");
  var comma = document.querySelector(".comma");
  var sign = document.querySelector(".sign");
  var equal = document.querySelector("#equal");
  var ops = [divide, multiply, minus, plus, comma];
  var opsChar = ["÷", "×", "-", "+"];
  var opsCharPrior = [opsChar[0], opsChar[1]];
  var operationStr = "";
  var operation = 0;
  var previousOp = 0;
  var splitNum = [];
  var arrayOp = [];
  var checkOp = false;
  var checkComma = false;

  //event listeners

  for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", addNumber);
  }
  clear.addEventListener("click", clearFn);
  clearEntry.addEventListener("click", clearEntryFn);
  backspace.addEventListener("click", backspaceFn);
  for (var i = 0; i < ops.length; i++) {
    ops[i].addEventListener("click", addOp);
  }
  sign.addEventListener("click", addSign);
  equal.addEventListener("click", displayResult);

  //input functions

  function addNumber(e) {
    if (input.innerHTML === "0") {
      input.innerHTML = e.target.innerHTML;
    } else {
      input.innerHTML += e.target.innerHTML;
    }
  }

  function addOp(e) {
    var isInputComma = false;
    if (e.target.innerHTML === ",") {
      isInputComma = true;
    }

    if (isInputComma === true) {
      if (input.innerHTML.slice(-1) === ".") {
        input.innerHTML = input.innerHTML;
      } else if (opsChar.includes(input.innerHTML.slice(-1))) {
        input.innerHTML = input.innerHTML;
      } else if (checkComma === true) {
        input.innerHTML = input.innerHTML;
      } else if (checkComma === false) {
        input.innerHTML += ".";
        checkComma = true;
        console.log("isOp? " + checkOp);
        console.log("isCom? " + checkComma);
      }
    } else {
      if (input.innerHTML === "0") {
        input.innerHTML = input.innerHTML;
      } else if (input.innerHTML.slice(-1) === ".") {
        input.innerHTML = input.innerHTML;
      } else if (checkComma === true && input.innerHTML.slice(-1) === "0") {
        input.innerHTML = input.innerHTML;
      } else if (opsChar.includes(input.innerHTML.slice(-1))) {
        input.innerHTML = input.innerHTML.slice(0, -1) + e.target.innerHTML;
        checkOp = true;
        checkComma = false;
        console.log("isOp? " + checkOp);
        console.log("isCom? " + checkComma);
      } else {
        input.innerHTML += e.target.innerHTML;
        checkOp = true;
        checkComma = false;
        console.log("isOp? " + checkOp);
        console.log("isCom? " + checkComma);
      }
    }
  }

  function addSign(e) {
    if (parseFloat(input.innerHTML) > 0) {
      input.innerHTML = "-" + input.innerHTML;
    } else {
      input.innerHTML = -parseFloat(input.innerHTML);
    }
  }

  //clear functions

  function clearFn() {
    input.innerHTML = "0";
    operationDisplay.innerHTML = "";
    checkOp = false;
    checkComma = false;
  }

  function clearEntryFn() {
    input.innerHTML = "0";
    checkOp = false;
    checkComma = false;
  }

  function backspaceFn() {
    if (input.innerHTML === "0") {
      input.innerHTML = input.innerHTML;
    } else if (parseFloat(input.innerHTML) < 0 && input.innerHTML.length === 2) {
      input.innerHTML = "0";
    } else if (parseFloat(input.innerHTML) < 0 && input.innerHTML.length > 2) {
      input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
    } else {
      if (input.innerHTML.length > 1) {
        if (input.innerHTML.slice(-1) === ".") {
          input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
          checkComma = false;
        } else if (opsChar.includes(input.innerHTML.slice(-1))) {
          input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
          var reversed = input.innerHTML.split("").reverse().join("");
          console.log(reversed);
          var i = 0;
          while (opsChar.includes(reversed[i]) === false && i < reversed.length) {
            if (reversed[i] === ".") {
              checkComma = true;
              break;
            }
            i++;
          }

          checkOp = false;
          console.log(checkOp);
        } else {
          input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
        }
      } else {
        input.innerHTML = "0";
      }
    }
    console.log("isOp? " + checkOp);
    console.log("isCom? " + checkComma);
  }

  //processing functions

  function saveNum(str, separators) {
    var tempChar = separators[0];
    var first = 0;
    var array = [];

    if (str[0] === "-") {
      first = parseFloat(str);
      str = str.substring(1);
      for (var i = 1; i < separators.length; i++) {
        str = str.split(separators[i]).join(tempChar);
      }
      str = str.split(tempChar);
      str[0] = first.toString();
    } else {
      for (var i = 1; i < separators.length; i++) {
        str = str.split(separators[i]).join(tempChar);
      }
      str = str.split(tempChar);
    }

    for (var i = 0; i < str.length; i++) {
      array.push(parseFloat(str[i]));
    }
    return array;
  }

  function saveOp(str, ops) {
    var array = [];

    if (str[0] === "-") {
      str = str.substring(1);
    }

    for (var i = 0; i < str.length; i++) {
      if (ops.includes(str[i])) {
        switch (str[i]) {
          case "÷":
            array.push("÷");
            break;
          case "×":
            array.push("×");
            break;
          case "-":
            array.push("-");
            break;
          case "+":
            array.push("+");
            break;
          default:
            console.log("erreur");
        }
      }
    }
    return array;
  }

  function processOperation() {
    operationStr = input.innerHTML;
    console.log("user input: " + operationStr);
    splitNum = saveNum(operationStr, opsChar);
    console.log("splitted numbers :" + splitNum);

    arrayOp = saveOp(operationStr, opsChar);
    console.log("splitted ops :" + arrayOp);

    operationDisplay.innerHTML = input.innerHTML + " =";
    operation = calculOp(splitNum, arrayOp);
    previousOp = operation;
    input.innerHTML = operation;
  }

  function updateArray(array1, array2, index, value, count) {
    console.log("step " + count);
    console.log(array1);
    console.log(array2);
    array1.splice(index, 1);
    array1.splice(index, 1, value);
    array2.splice(index, 1);
  }

  function calculOp(array, arrayOp) {
    var result = 0;
    var temp = 0;
    var check = false;
    var count = 0;

    console.log("processing");

    if (opsCharPrior.some((elem) => input.innerHTML.includes(elem))) {
      check = true;
    }

    if (check === true) {
      for (i = 0; i < array.length - 1; i++) {
        switch (arrayOp[i]) {
          case "÷":
            count++;
            temp = array[i] / array[i + 1];
            updateArray(array, arrayOp, i, temp, count);
            i--;
            break;
          case "×":
            count++;
            temp = array[i] * array[i + 1];
            updateArray(array, arrayOp, i, temp, count);
            i--;
            break;
        }
      }
      check = false;
    }
    if (check === false) {
      for (i = 0; i < array.length - 1; i++) {
        switch (arrayOp[i]) {
          case "-":
            count++;
            temp = array[i] - array[i + 1];
            updateArray(array, arrayOp, i, temp, count);
            i--;
            break;
          case "+":
            count++;
            temp = array[i] + array[i + 1];
            updateArray(array, arrayOp, i, temp, count);
            i--;
            break;
        }
      }
    }
    if (Number.isInteger(array[0])) {
      result = array[0];
      checkOp = false;
      checkComma = false;
    } else {
      result = parseFloat(array[0].toFixed(12));
      checkOp = false;
      checkComma = true;
    }
    console.log("final result: " + result);

    return result;
  }

  function displayResult() {
    if (operationDisplay.innerHTML === "") {
      if (
        opsChar.some((elem) => input.innerHTML.includes(elem)) === false ||
        opsChar.includes(input.innerHTML.slice(-1)) ||
        input.innerHTML.slice(-1) === "."
      ) {
        input.innerHTML = input.innerHTML;
      } else {
        processOperation();
      }
    } else {
      if (input.innerHTML === "0") {
        input.innerHTML = previousOp;
      } else {
        if (
          opsChar.some((elem) => input.innerHTML.includes(elem)) === false ||
          opsChar.includes(input.innerHTML.slice(-1)) ||
          input.innerHTML.slice(-1) === "."
        ) {
          input.innerHTML = input.innerHTML;
        } else {
          processOperation();
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
