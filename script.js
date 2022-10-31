//variables

let input = {};
let operationDisplay = {};
let numbers = [];
let clear = {};
let clearEntry = {};
let backspace = {};
let sign = {};
let equal = {};
let ops = [];
const opsChar = ["÷", "×", "-", "+"];
const opsCharPrior = [opsChar[0], opsChar[1]];
let operationStr = "";
let operation = 0;
let previousOp = 0;
let splitNum = [];
let arrayOp = [];
let checkOp = false;
let checkComma = false;
let checkSign = false;

//input functions

function addNumber(e) {
  if (input.innerText === "0") {
    input.innerText = e.target.innerText;
  } else {
    input.innerText += e.target.innerText;
  }
}

function addOp(e) {
  let isInputComma = false;
  if (e.target.innerText === ",") {
    isInputComma = true;
  }

  if (isInputComma === true) {
    if (input.innerText.slice(-1) === ".") {
      input.innerText += "";
    } else if (opsChar.includes(input.innerText.slice(-1))) {
      input.innerText += "";
    } else if (checkComma === true) {
      input.innerText += "";
    } else if (checkComma === false) {
      input.innerText += ".";
      checkComma = true;
      console.log("isOp? " + checkOp);
      console.log("isCom? " + checkComma);
    }
  } else {
    if (input.innerText === "0") {
      input.innerText += "";
    } else if (input.innerText.slice(-1) === ".") {
      input.innerText += "";
    } else if (checkComma === true && input.innerText.slice(-1) === "0") {
      input.innerText += "";
    } else if (opsChar.includes(input.innerText.slice(-1))) {
      input.innerText = input.innerText.slice(0, -1) + e.target.innerText;

      checkOp = true;
      checkComma = false;
      console.log("isOp? " + checkOp);
      console.log("isCom? " + checkComma);
    } else {
      input.innerText += e.target.innerText;
      checkOp = true;
      checkComma = false;
      console.log("isOp? " + checkOp);
      console.log("isCom? " + checkComma);
    }
  }
}

function addSign() {
  if (opsChar.some((elem) => input.innerText.includes(elem)) && input.innerText[0] !== "-") {
    input.innerText += "";
  } else {
    if (parseFloat(input.innerText) > 0) {
      input.innerText = "-" + input.innerText;
      checkSign = true;
    } else {
      input.innerText = -parseFloat(input.innerText);
      checkSign = false;
    }
  }
  console.log(checkOp);
}

//clear functions

function clearFn() {
  input.innerText = "0";
  operationDisplay.innerText = "";
  checkOp = false;
  checkComma = false;
}

function clearEntryFn() {
  input.innerText = "0";
  checkOp = false;
  checkComma = false;
}

function backspaceFn() {
  if (input.innerText === "0") {
    input.innerText = input.innerText += "";
  } else if ((parseFloat(input.innerText) < 0 && input.innerText.length === 2) || input.innerText.length <= 1) {
    input.innerText = "0";
  } else if ((parseFloat(input.innerText) < 0 && input.innerText.length > 2) || input.innerText.length > 1) {
    if (input.innerText.slice(-1) === ".") {
      input.innerText = input.innerText.substring(0, input.innerText.length - 1);
      checkComma = false;
    } else if (opsChar.includes(input.innerText.slice(-1))) {
      console.log("ouga");
      input.innerText = input.innerText.substring(0, input.innerText.length - 1);
      let reversed = input.innerText.split("").reverse().join("");
      console.log(reversed);
      let i = 0;
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
      input.innerText = input.innerText.substring(0, input.innerText.length - 1);
    }
  } else {
    input.innerText = input.innerText.substring(0, input.innerText.length - 1);
  }

  console.log("isOp? " + checkOp);
  console.log("isCom? " + checkComma);
}

//processing functions

function saveNum(str, separators) {
  let tempChar = separators[0];
  let first = 0;
  let array = [];

  if (str[0] === "-") {
    first = parseFloat(str);
    str = str.substring(1);
    for (let i = 1; i < separators.length; i++) {
      str = str.split(separators[i]).join(tempChar);
    }
    str = str.split(tempChar);
    str[0] = first.toString();
  } else {
    for (let i = 1; i < separators.length; i++) {
      str = str.split(separators[i]).join(tempChar);
    }
    str = str.split(tempChar);
  }

  for (let num of str) {
    array.push(parseFloat(num));
  }
  return array;
}

function saveOp(str, ops) {
  let array = [];

  if (str[0] === "-") {
    str = str.substring(1);
  }

  for (let op of str) {
    if (ops.includes(op)) {
      switch (op) {
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
  operationStr = input.innerText;
  console.log("user input: " + operationStr);
  splitNum = saveNum(operationStr, opsChar);
  console.log("splitted numbers :" + splitNum);

  arrayOp = saveOp(operationStr, opsChar);
  console.log("splitted ops :" + arrayOp);

  operationDisplay.innerText = input.innerText + " =";
  operation = calculOp(splitNum, arrayOp);
  previousOp = operation;
  input.innerText = operation;
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
  let result = 0;
  let temp = 0;
  let check = false;
  let count = 0;

  console.log("processing");

  if (opsCharPrior.some((elem) => input.innerText.includes(elem))) {
    check = true;
  }

  if (check === true) {
    for (let i = 0; i < array.length - 1; i++) {
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
    for (let i = 0; i < array.length - 1; i++) {
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
  if (operationDisplay.innerText === "") {
    if (
      opsChar.some((elem) => input.innerText.includes(elem)) === false ||
      opsChar.includes(input.innerText.slice(-1)) ||
      input.innerText.slice(-1) === "."
    ) {
      input.innerText += "";
    } else {
      processOperation();
    }
  } else {
    if (input.innerText === "0") {
      input.innerText = previousOp;
    } else {
      if (
        opsChar.some((elem) => input.innerText.includes(elem)) === false ||
        opsChar.includes(input.innerText.slice(-1)) ||
        input.innerText.slice(-1) === "."
      ) {
        input.innerText += "";
      } else {
        processOperation();
      }
    }
  }
}

function init() {
  input = document.querySelector(".result");
  operationDisplay = document.querySelector(".operation");
  numbers = document.querySelectorAll(".number");
  clear = document.querySelector("#clear");
  clearEntry = document.querySelector("#clearEntry");
  backspace = document.querySelector("#backspace");
  sign = document.querySelector(".sign");
  equal = document.querySelector("#equal");
  ops = [
    document.querySelector("#divide"),
    document.querySelector("#multiply"),
    document.querySelector("#minus"),
    document.querySelector("#plus"),
    document.querySelector(".comma"),
  ];

  //event listeners

  for (let number of numbers) {
    number.addEventListener("click", addNumber);
  }
  clear.addEventListener("click", clearFn);
  clearEntry.addEventListener("click", clearEntryFn);
  backspace.addEventListener("click", backspaceFn);
  for (let op of ops) {
    op.addEventListener("click", addOp);
  }
  sign.addEventListener("click", addSign);
  equal.addEventListener("click", displayResult);
}

document.addEventListener("DOMContentLoaded", init);
