//----DOM---
const numbersDIV = document.querySelector("#numbers");
const operationsDIV = document.querySelector("#operations");
const displayScreen = document.querySelector('#display');
const zeroEqualDIV = document.createElement("div");



const zero = document.createElement('button');
zero.innerText = 0;

const equal = document.createElement("button");
equal.innerText = "=";


const clear = document.createElement("button");
clear.innerText = "Clear";

zeroEqualDIV.setAttribute("id", "zeroEqual");
zeroEqualDIV.append(zero, equal, clear);

const operands = ["+", "-", "*", "/"];

//--------variables
var firstOperand = null;
var operation = null;
var secondOperand = null;
var numberAfterOperation = false;

var opIndex = null;

//displayValue = `${firstOperand}  ${operation}  ${secondOperand}`;

displayScreen.innerText = "";

clear.addEventListener('click', () => {
    displayScreen.innerText = "";
    firstOperand = operation = secondOperand = opIndex = null;
    numberAfterOperation = false;
    console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
});

zero.addEventListener("click", () => {
    displayScreen.innerText += zero.textContent;
    numberAfterOperation = true;
});

equal.addEventListener("click", ()=>{
    if (!displayScreen.innerText == "" && !numberAfterOperation == false && opIndex == null) {
        firstOperand = displayScreen.innerText;
        displayScreen.innerText = firstOperand;
        console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
    } else if (!displayScreen.innerText == "" && !numberAfterOperation == false) {
        numberAfterOperation = false;
        secondOperand = displayScreen.innerText.substring(opIndex + 1);
        displayScreen.innerText = operate(Number(firstOperand), operation, Number(secondOperand));
        if(!displayScreen.innerText==""){
            firstOperand = displayScreen.innerText;
            secondOperand = null;
            operation = null;
            console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
        }
        
        console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
    }
    
});



function operate(st, op, nd) {

    if (op === "+") {
        return st + nd;
    }
    if (op === "-") {
        return st - (nd);
    }
    if (op === "*") {
        return st * nd;
    }
    if (op === "/") {
        if (nd == 0) {
            alert("Cant do that");
            firstOperand = operation = secondOperand = opIndex = null;
            numberAfterOperation = false;
            displayScreen.innerText="";
            return "";

        } else {
            return st / nd;
        }

    }
    else
        console.log("Something went wrong with calculating");
}

function display() {

}


function operandIndex() {
    var index;
    if (displayScreen.innerText.includes("+")) {
        index = displayScreen.innerText.indexOf("+");
    }
    else if (displayScreen.innerText.includes("-")) {
        index = displayScreen.innerText.indexOf("-");

    } else if (displayScreen.innerText.includes("*")) {
        index = displayScreen.innerText.indexOf("*");

    } else if (displayScreen.innerText.includes("/")) {
        index = displayScreen.innerText.indexOf("/");
    }
    return index;
}


function createCalc() {
    for (let i = 1; i <= 9; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        numbersDIV.appendChild(button);
        button.addEventListener("click", () => {
            displayScreen.innerText += button.textContent;
            numberAfterOperation = true;
        });
    }

    numbersDIV.appendChild(zeroEqualDIV);

    for (let i = 0; i < 4; i++) {
        const button = document.createElement("button");
        button.innerText = operands[i];
        operationsDIV.appendChild(button);
        button.addEventListener("click", () => {
            if (!displayScreen.innerText == "" && !numberAfterOperation == false && opIndex == null) {
                numberAfterOperation = false;
                firstOperand = displayScreen.innerText;
                operation = button.textContent;
                displayScreen.innerText += button.textContent;
                opIndex = operandIndex();
                console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
            } else if (!displayScreen.innerText == "" && !numberAfterOperation == false) {
                numberAfterOperation = false;
                secondOperand = displayScreen.innerText.substring(opIndex + 1);
                displayScreen.innerText = operate(Number(firstOperand), operation, Number(secondOperand));
                if(!displayScreen.innerText==""){
                    firstOperand = displayScreen.innerText;
                    secondOperand = null;
                    operation = button.textContent;
                    displayScreen.innerText += button.textContent;
                    opIndex = operandIndex();
                }
                
                console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
            }
            operation=button.textContent;
            displayScreen.innerText = firstOperand + operation;

        });
    }
}

createCalc();

