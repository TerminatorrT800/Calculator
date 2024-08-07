//----DOM---
const numbersDIV = document.querySelector("#numbers");
const operationsDIV = document.querySelector("#operations");
const displayScreen = document.querySelector('#display');
const zeroEqualDIV = document.createElement("div");
const deleteBTN = document.querySelector("#delete");
const clear = document.querySelector('#clear');




const zero = document.createElement('button');
zero.innerText = 0;

const equal = document.createElement("button");
equal.innerText = "=";


const dot = document.createElement("button");
dot.innerText = ".";

zeroEqualDIV.setAttribute("id", "zeroEqual");
zeroEqualDIV.append(zero, equal, dot);

const operands = ["+", "-", "*", "/"];

//--------variables
var firstOperand = null;
var operation = null;
var secondOperand = null;
var numberAfterOperation = false;
var isDot = false;
var opIndex = null;
var trash;

//displayValue = `${firstOperand}  ${operation}  ${secondOperand}`;

displayScreen.innerText = "";

createCalc();

clear.addEventListener('click', () => {
    displayScreen.innerText = "";
    firstOperand = operation = secondOperand = opIndex = null;
    numberAfterOperation = false;
    isDot = false;
    //console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
});

deleteBTN.addEventListener("click", () => {
    if (displayScreen.innerText !== "") {
        if(firstOperand !== null && operation !== null){
            trash = displayScreen.innerText.substring(displayScreen.innerText.length-1);
            displayScreen.innerText = displayScreen.innerText.substring(0, displayScreen.innerText.length-1);
           // console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand} \n${isDot} 1`);
            if(trash=="."){
                isDot=false;
                //console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand} \n${isDot} 1.1`);
            }else if(trash=="+" || trash=="-" || trash=="*" || trash=="/"){
                opIndex= null;
                operation =null;
                numberAfterOperation = true;
                //console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand} \n${isDot} 1.2`);
                if(!firstOperand.includes(".")){
                    isDot =false;
                    console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand} \n${isDot} 1.2.1`);
                }else{
                    isDot = true;
                }

            }else if(displayScreen.innerText.endsWith("+") || displayScreen.innerText.endsWith("-") || displayScreen.innerText.endsWith("*") || displayScreen.innerText.endsWith("/")){
                isDot = true;
                //console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand} \n${isDot} 1.3`);
            }
        }else{
            trash = displayScreen.innerText.substring(displayScreen.innerText.length-1);
            displayScreen.innerText = displayScreen.innerText.substring(0, displayScreen.innerText.length-1);
            //console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand} \n${isDot} 2`);
        }
        if(!firstOperand.includes(".")){
            isDot =false;
            //console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand} \n${isDot} 1.2.1`);
        }else{
            isDot = true;
        }
        
    }

})

zero.addEventListener("click", () => {
    displayScreen.innerText += zero.textContent;
    numberAfterOperation = true;
});

equal.addEventListener("click", () => {
    if (displayScreen.innerText !== "" && numberAfterOperation == true && opIndex == null) {
        firstOperand = displayScreen.innerText;
        displayScreen.innerText = firstOperand;
        opIndex = operandIndex();
       // console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
    } else if (displayScreen.innerText !== "" && numberAfterOperation == true) {
        numberAfterOperation = true;
        secondOperand = displayScreen.innerText.substring(opIndex + 1);
        opIndex = null;
        displayScreen.innerText = operate(Number(firstOperand), operation, Number(secondOperand));
        if (displayScreen.innerText !== "") {
            firstOperand = displayScreen.innerText;
            if (firstOperand.includes(".")) {
                isDot = true;
            }
            secondOperand = null;
            operation = null;
            //console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
        }

        //console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
    }

});

dot.addEventListener("click", () => {
    if (displayScreen.innerText !== "" && !displayScreen.innerText.endsWith("+") && !displayScreen.innerText.endsWith("-") && !displayScreen.innerText.endsWith("/") && !displayScreen.innerText.endsWith("*") && isDot == false) {
        displayScreen.innerText += dot.textContent;
        isDot = true;
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
            displayScreen.innerText = "";
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
            if (displayScreen.innerText !== "" && numberAfterOperation == true && opIndex == null) {
                if (displayScreen.innerText.endsWith(".")) {
                    displayScreen.innerText += "0";
                }
                numberAfterOperation = false;
                firstOperand = displayScreen.innerText;
                operation = button.textContent;
                displayScreen.innerText += button.textContent;
                opIndex = operandIndex();
                isDot = false;
                //console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand} \n${opIndex}`);
            } else if (displayScreen.innerText !== "" && numberAfterOperation == true) {
                numberAfterOperation = false;
                secondOperand = displayScreen.innerText.substring(opIndex + 1);
                displayScreen.innerText = operate(Number(firstOperand), operation, Number(secondOperand));
                if (displayScreen.innerText !== "") {
                    firstOperand = displayScreen.innerText;
                    if (!displayScreen.innerText.includes(".")) {
                        isDot = false;
                    }
                    secondOperand = null;
                    operation = button.textContent;
                    displayScreen.innerText += button.textContent;
                    opIndex = operandIndex();                

                //console.log(`First: ${firstOperand}\nOperation: ${operation}\nSecond: ${secondOperand}`);
            }
        }else if(displayScreen.innerText !== "" && numberAfterOperation == false){
            displayScreen.innerText = displayScreen.innerText.substring(0, displayScreen.innerText.length-1);
            displayScreen.innerText+=button.textContent;
            operation = button.textContent;
        }

        });
    }
}



