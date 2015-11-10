window.onload = init;

function init() {
    var button = document.getElementById("submit");
    button.onclick = compute;
}

function compute() {
  try {
    // Form validation
    // Operand 1 validation
    var operand1 = document.getElementById("operand1").value;
    if (operand1 == null || operand1 == "" || isNaN(operand1)) {
      throw new Error("Operand 1 is invalid.");
    }
    // Operand 2 validation
    var operand2 = document.getElementById("operand2").value;
    if (operand2 == null || operand2 == "" || isNaN(operand2)) {
      throw new Error("Operand 2 is invalid.");
    }
    // Operator validation
    var operator = document.getElementById("operator").value;
    if (operator == null || operator == "") {
      throw new Error("Operator " + operator + " is invalid.");
    }
    var validOperators = new RegExp("[-\/\+\*]{1}", "ig");
    var matchResults = operator.match(validOperators);
    if (matchResults == null || matchResults.length > 1) {
      throw new Error("Operator " + operator + " is invalid.");
    }
    // Operation execution
    var result = 0;
    switch(operator) {
      case "+":
          result = parseInt(operand1) + parseInt(operand2);
          break;
      case "-":
          result = parseInt(operand1) - parseInt(operand2);
          break;
      case "*":
          result = parseInt(operand1) * parseInt(operand2);
          break;
      case "/":
          if (parseInt(operand2) == 0) {
            throw new Error("Cannot divide by zero.");
          }
          result = parseInt(operand1) / parseInt(operand2);
          break;
      default:
          throw new Error("Operator " + operator + " not supported.");
    }
    var p = document.getElementById("result");
    p.innerHTML = operand1 + operator + operand2 + " = " + result;
  } catch (e) {
    alert(e.message);
  }
}
