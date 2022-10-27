function init() {
  var input = document.querySelector(".result");
  var operationDisplay = document.querySelector(".operation");

  var numbers = document.querySelectorAll(".number");

  for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", addNumber);
  }
  function addNumber(e) {
    if (input.innerHTML === "0") {
      input.innerHTML = e.target.innerHTML;
    } else {
      input.innerHTML += e.target.innerHTML;
    }
  }

  var clear = document.querySelector("#clear");
  var clearEntry = document.querySelector("#clearEntry");

  clear.addEventListener("click", clearFn);
  clearEntry.addEventListener("click", clearEntryFn);

  function clearFn() {
    input.innerHTML = "0";
    operationDisplay.innerHTML = "";
    checkOp = false;
    first = false;
  }

  function clearEntryFn() {
    input.innerHTML = "0";
    checkOp = false;
    first = false;
  }

  var backspace = document.querySelector("#backspace");

  backspace.addEventListener("click", backspaceFn);

  function backspaceFn() {
    if (input.innerHTML === "0") {
      input.innerHTML = "0";
    } else {
      if (input.innerHTML.length > 1) {
        input.innerHTML = input.innerHTML.substring(
          0,
          input.innerHTML.length - 1
        );
      } else {
        input.innerHTML = "0";
      }
    }
  }
  var divide = document.querySelector("#divide");
  var multiply = document.querySelector("#multiply");
  var minus = document.querySelector("#minus");
  var plus = document.querySelector("#plus");
  var comma = document.querySelector(".comma");
  var sign = document.querySelector(".sign");

  var ops = [divide, multiply, minus, plus, comma, sign];
  var opsChar = ["÷", "×", "-", "+"];
  var checkOp = false;
  var first = false;

  for (var i = 0; i < ops.length; i++) {
    ops[i].addEventListener("click", addOp);
  }

  function addOp(e) {
    var checkComma = false;

    if (e.target.innerHTML === ",") {
      checkComma = true;
    }

    if (checkComma === true) {
      if (input.innerHTML.slice(-1) === ".") {
        input.innerHTML += "";
      } else if (opsChar.includes(input.innerHTML.slice(-1))) {
        input.innerHTML = input.innerHTML;
      } else if (checkOp === false && first === true) {
        input.innerHTML = input.innerHTML;
      } else if (checkOp === true) {
        input.innerHTML += ".";
        checkOp = false;
      } else if (first === false && checkOp === false) {
        input.innerHTML += ".";
        first = true;
      }
    } else {
      if (input.innerHTML === "0") {
        input.innerHTML = input.innerHTML;
      } else if (
        opsChar.includes(input.innerHTML.slice(-1)) ||
        input.innerHTML.slice(-1) === "."
      ) {
        input.innerHTML = input.innerHTML;
      } else {
        input.innerHTML += e.target.innerHTML;
        checkOp = true;
      }
    }
  }

  function eval() {
    if (
      opsChar.includes(input.innerHTML.slice(-1)) ||
      input.innerHTML.slice(-1) === "."
    ) {
      input.innerHTML = input.innerHTML;
    } else {
      var operation = (" " + input.innerHTML).slice(1);
      var splitNum = saveNum(operation, opsChar);
      console.log(splitNum);

      var arrayOp = saveOp(operation, opsChar);
      console.log(arrayOp);

      splitNum = toNumber(splitNum);
      console.log(splitNum);

      operationDisplay.innerHTML = input.innerHTML + " =";
      operation = calculOp(splitNum, arrayOp);
      input.innerHTML = operation;
      checkOp = false;
    }
  }

  function saveNum(str, separators) {
    var tempChar = separators[0];
    for (var i = 1; i < separators.length; i++) {
      str = str.split(separators[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
  }

  function saveOp(str, ops) {
    var array = [];

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

  function toNumber(array1) {
    var array2 = [];

    for (var i = 0; i < array1.length; i++) {
      array2.push(+array1[i]);
    }
    return array2;
  }

  function updateArray(array1, array2, index, value) {
    array1.splice(index, 1);
    array1.splice(index, 1, value);
    array2.splice(index, 1);
  }

  function calculOp(array, arrayOp) {
    var result = 0;
    var temp = 0;
    var check = false;

    console.log("processing");

    for (var i = 0; i < arrayOp.length; i++) {
      if (arrayOp[i] === "÷" || arrayOp[i] === "×") {
        check = true;
        break;
      }
    }

    if (check === true) {
      for (i = 0; i < array.length - 1; i++) {
        switch (arrayOp[i]) {
          case "÷":
            temp = array[i] / array[i + 1];
            updateArray(array, arrayOp, i, temp);
            i--;
            console.log(array);
            console.log(arrayOp);
            break;
          case "×":
            temp = array[i] * array[i + 1];
            updateArray(array, arrayOp, i, temp);
            i--;
            console.log(array);
            console.log(arrayOp);
            break;
        }
      }
      check = false;
    }
    if (check === false) {
      for (i = 0; i < array.length - 1; i++) {
        switch (arrayOp[i]) {
          case "-":
            temp = array[i] - array[i + 1];
            updateArray(array, arrayOp, i, temp);
            i--;
            console.log(array);
            console.log(arrayOp);
            break;
          case "+":
            temp = array[i] + array[i + 1];
            updateArray(array, arrayOp, i, temp);
            i--;
            console.log(array);
            console.log(arrayOp);
            break;
        }
      }
    }
    console.log(array[0]);
    if (Number.isInteger(array[0])) {
      result = array[0];
    } else {
      result = array[0].toFixed(12);
    }
    console.log(result);
    return result;
  }

  var equal = document.querySelector("#equal");
  equal.addEventListener("click", eval);
}

document.addEventListener("DOMContentLoaded", init);
