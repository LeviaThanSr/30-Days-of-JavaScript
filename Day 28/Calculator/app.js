const input = document.querySelector(".input");
const outputOperation = document.querySelector(".operation .value");
const outputResult = document.querySelector(".result .value");
const maxOutputLength = 10;
const outputPrecision = 5;
let data = {
  operation: [],
  result: [],
};

let calculatorButtons = [
  {
    name: "clear",
    symbol: "AC",
    formula: false,
    type: "key",
  },
  {
    name: "delete",
    symbol: `<i class="fas fa-backspace"></i>`,
    formula: false,
    type: "key",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
  ,
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
];

function createCalculatorButtons() {
  const buttonsPerRow = 4;
  let buttons = 0;

  calculatorButtons.forEach((button) => {
    if (buttons % buttonsPerRow == 0) {
      input.innerHTML += `<div class="row"></div>`;
    }

    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;
    buttons++;
  });
}
createCalculatorButtons();

function handlePadClick(e) {
  const clickedButtons = event.target;

  calculatorButtons.forEach((button) => {
    if (button.name == clickedButtons.id) {
      calculator(button);
    }
  });
}

function calculator(button) {
  if (button.type == "operator") {
    data.operation.push(button.symbol);
    data.result.push(button.formula);
  } else if (button.type == "number") {
    data.operation.push(button.symbol);
    data.result.push(button.formula);
  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.operation = [];
      data.result = [];
      updateOutputResult(0);
    } else if (button.name == "delete") {
      data.result.pop();
      data.operation.pop();
    }
  } else if (button.type == "calculate") {
    let result_joined = data.result.join("");
    data.operation = [];
    data.result = [];
    let result_final;

    try {
      result_final = eval(result_joined);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result_final = "Syntax Error!";
        updateOutputResult(result_final);
        return;
      }
    }

    result_final = formatResult(result_final);
    data.operation.push(result_final);
    data.result.push(result_final);
    updateOutputResult(result_final);

    return;
  }
  updateOutputOperation(data.operation.join(""));
}

function updateOutputOperation(operation) {
  outputOperation.innerHTML = operation;
}

function updateOutputResult(result) {
  outputResult.innerHTML = result;
}

function digitCounter(number) {
  return number.toString().length;
}

function isFloat(number) {
  return number % 1 != 0;
}

function formatResult(result) {
  if (digitCounter(result) > maxOutputLength) {
    if (isFloat(result)) {
      const resultInt = parseInt(result);
      const resultIntLength = digitCounter(resultInt);

      if (resultIntLength > maxOutputLength) {
        return result.toPrecision(outputPrecision);
      } else {
        const digitsAfterPoint = maxOutputLength - resultIntLength;
        return result.toFixed(digitsAfterPoint);
      }
    } else {
      return result.toPrecision(outputPrecision);
    }
  } else {
    return result;
  }
}

input.addEventListener("click", handlePadClick);
