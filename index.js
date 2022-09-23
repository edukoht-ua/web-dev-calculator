document.addEventListener("DOMContentLoaded", () => {
  const defaultActionFunction = (_prevValue, curValue) => curValue;

  let currentActionFunction = defaultActionFunction;
  let currentActionName = "";
  let previousValue = 0;
  let displayedCalculatorValue = 0;

  const calculatorValueEl = document.getElementById("calculatorData");
  const calculatorActionNameEl = document.getElementById("calculatorActionName");
  const calculatorPreviousValueEl = document.getElementById("calculatorPreviousValue");

  function updateDisplayedCalculatorValue() {
    calculatorValueEl.innerHTML = displayedCalculatorValue;
  };

  function updateCurrentActionName() {
    calculatorActionNameEl.innerHTML = currentActionName;
  }

  function updatePreviousValue() {
    calculatorPreviousValueEl.innerHTML = previousValue;
  }

  function addNumberToValue(number) {
    displayedCalculatorValue *= 10;
    displayedCalculatorValue += number;

    updateDisplayedCalculatorValue();
  };

  function finishCurrentAction() {
    previousValue = currentActionFunction(previousValue, displayedCalculatorValue);
    displayedCalculatorValue = 0;

    updatePreviousValue();
    updateDisplayedCalculatorValue();
  }

  function updateAction(actionName, actionFunction) {
    if(!actionFunction)
      actionFunction = defaultActionFunction;

    if(!actionName) actionName = "";

    finishCurrentAction();

    currentActionFunction = actionFunction;
    currentActionName = actionName;

    updateCurrentActionName();
  }

  function registerActionButton(buttonElement, actionFunction) {
    buttonElement.addEventListener("click", () => {
      updateAction(buttonElement.innerHTML, actionFunction);
    });
  }

  const numberButtons = document.getElementsByClassName("button-number");

  for(const numberButton of numberButtons) {
    const value = parseInt(numberButton.innerHTML);

    if(value === NaN)
      continue;
    
    numberButton.addEventListener("click", () => {
      addNumberToValue(value);
    });
  }

  const buttonAc = document.getElementById("buttonAc");

  buttonAc.addEventListener("click", () => {
    displayedCalculatorValue = 0;
    updateDisplayedCalculatorValue();
    updateAction("", (prevValue, curValue) => curValue);
  });

  const buttonPlusMinus = document.getElementById("buttonPlusMinus");

  buttonPlusMinus.addEventListener("click", () => {
    displayedCalculatorValue *= -1;
    updateDisplayedCalculatorValue();
  });

  const buttonDivide = document.getElementById("buttonDivide");
  const buttonMultiply = document.getElementById("buttonMultiply");
  const buttonPlus = document.getElementById("buttonPlus");
  const buttonMinus = document.getElementById("buttonMinus");
  const buttonPercent = document.getElementById("buttonPercent")

  registerActionButton(buttonDivide, (prevValue, curValue) => {
    return prevValue / curValue;
  });

  registerActionButton(buttonMultiply, (prevValue, curValue) => {
    return prevValue * curValue;
  });

  registerActionButton(buttonPlus, (prevValue, curValue) => {
    return prevValue + curValue;
  });

  registerActionButton(buttonMinus, (prevValue, curValue) => {
    return prevValue - curValue;
  });

  registerActionButton(buttonPercent, (prevValue, curValue) => {
    return (prevValue / 100) * curValue;
  });

  const buttonResult = document.getElementById("buttonResult");

  buttonResult.addEventListener("click", () => {
    updateAction();

    displayedCalculatorValue = previousValue;
    previousValue = 0;

    updateDisplayedCalculatorValue();
    updatePreviousValue();
  });
});