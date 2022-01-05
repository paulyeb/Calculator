const numberButtons = document.querySelectorAll('#numberButtons');
const operationButtons = document.querySelectorAll('#operationButtons');
const clearAllButton = document.querySelector('#clearAllButton');
const deleteButton = document.querySelector('#deleteButton');
const equalsButton = document.querySelector('#equalsButton');
const previousOperandTextElement = document.querySelector('#previousOperand');
const currentOperandTextElement = document.querySelector('#currentOperand');

class Calculator {
    constructor( previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = ''; 
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    } 

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand != '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand); 
        if(isNaN(previous) || isNaN(current)) return; 

        switch(this.operation) {
            case '+':
                computation = previous + current
                break 
            case '-':
                computation = previous - current
                break 
            case 'x':
                computation = previous * current
                break 
            case '÷':
                computation = previous / current
                break 
            default: 
            return
        }
        this.currentOperand = computation;
        this.operation =undefined;
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
});

clearAllButton.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})


