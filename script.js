document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    let displayValue = '';

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const buttonValue = this.textContent;
            if (buttonValue === '=') {
                calculate();
            } else if (buttonValue === 'C') {
                clearDisplay();
            } else {
                appendToDisplay(buttonValue);
            }
        });
    });

    function appendToDisplay(value) {
        displayValue += value;
        display.value = displayValue;
    }

    function clearDisplay() {
        displayValue = '';
        display.value = '';
    }

    function calculate() {
        try {
            const operators = ['+', '-', '*', '/'];
            let currentOperator = '';
            let numbers = [];
            let currentNumber = '';

            for (let i = 0; i < displayValue.length; i++) {
                const char = displayValue[i];
                if (operators.includes(char)) {
                    if (currentNumber !== '') {
                        numbers.push(parseFloat(currentNumber));
                        currentNumber = '';
                    }
                    currentOperator = char;
                } else {
                    currentNumber += char;
                }
            }
            if (currentNumber !== '') {
                numbers.push(parseFloat(currentNumber));
            }

            let result = numbers[0];
            for (let i = 1; i < numbers.length; i++) {
                if (currentOperator === '+') {
                    result += numbers[i];
                } else if (currentOperator === '-') {
                    result -= numbers[i];
                } else if (currentOperator === '*') {
                    result *= numbers[i];
                } else if (currentOperator === '/') {
                    result /= numbers[i];
                }
            }

            display.value = result;
            displayValue = result.toString();
        } catch (error) {
            display.value = 'Error';
        }
    }
});
