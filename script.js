function init() {
  var input = document.querySelector(".result");
  var operationDisplay = document.querySelector(".operation");
  var operation = "";

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
  }

  function clearEntryFn() {
    input.innerHTML = "0";
  }

  var backspace = document.querySelector("#backspace");

  backspace.addEventListener("click", backspaceFn);

  function backspaceFn() {
    if (input.innerHTML === "0") {
      input.innerHTML = "0";
    } else {
      if (input.innerHTML.length > 1) {
        input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
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
  //

  for (var i = 0; i < ops.length; i++) {
    ops[i].addEventListener("click", addOp);
  }

  function addOp(e) {
    var check = false;

    if (e.target.innerHTML === ",") {
      console.log("slip");
      check = true;
    }

    if (check) {
      if (input.innerHTML.length === 1) {
        input.innerHTML += ".";
      }
      if (input.innerHTML.length >= 1 && first === false) {
        input.innerHTML += ".";
        first = true;
      } else if (input.innerHTML.slice(-1) === "." || opsChar.includes(input.innerHTML.slice(-1))) {
        input.innerHTML = input.innerHTML;
      } else if (opsChar.some((op) => input.innerHTML.includes(op)) && checkOp === false) {
        console.log("test");
        input.innerHTML += ".";
        checkOp = true;
      }
    } else {
      if (input.innerHTML === "0") {
        input.innerHTML = input.innerHTML;
      } else if (opsChar.includes(input.innerHTML.slice(-1)) || input.innerHTML.slice(-1) === ".") {
        input.innerHTML = input.innerHTML;
      } else {
        input.innerHTML += e.target.innerHTML;
        checkOp = false;
      }
    }
  }

  function eval() {
    if (opsChar.includes(input.innerHTML.slice(-1))) {
      input.innerHTML = input.innerHTML;
    } else {
      operation = (" " + input.innerHTML).slice(1);
      var splitNum = saveNum(operation, opsChar);
      console.log(splitNum);

      var arrayOp = saveOp(operation, opsChar);
      console.log(arrayOp);

      splitNum = toNumber(splitNum);
      console.log(splitNum);

      operationDisplay.innerHTML = input.innerHTML + " =";
      operation = calculOp(splitNum, arrayOp);
      input.innerHTML = operation;
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

  function calculOp(array, arrayOp) {
    var result = 0;
    var temp = 0;
    var check = false;

    for (var i = 0; i < arrayOp.length; i++) {
      if (arrayOp[i] === "÷" || arrayOp[i] === "×") {
        check = true;
      }
    }

    if (check === true) {
      for (i = 0; i < array.length; i++) {
        if (arrayOp[i] === "×" || arrayOp[i] === "÷") {
          if (arrayOp[i] === "×") {
            temp = array[i] * array[i + 1];
          }
          if (arrayOp[i] === "÷") {
            temp = array[i] / array[i + 1];
          }
          array.splice(i, 1);
          array.splice(i, 1, temp);
          arrayOp.splice(i, 1);
          i--;
        }
        check = false;
      }
    }
    if (check === false) {
      result = array[0];
      for (i = 1; i < array.length; i++) {
        switch (arrayOp[i - 1]) {
          case "-":
            result -= array[i];
            break;
          case "+":
            result += array[i];
            break;
        }
      }
    }
    return (result = +result.toFixed(4));
  }

  var equal = document.querySelector("#equal");
  equal.addEventListener("click", eval);
}

document.addEventListener("DOMContentLoaded", init);
