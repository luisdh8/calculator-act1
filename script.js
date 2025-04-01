let fullOperation = "";
let history = [];
let resetOnNextInput = false;

function addNumber(number) {
    let op = fullOperation.split("");

    // Si el último resultado debe resetearse y el usuario ingresa un número, limpiamos la operación
    if (
        resetOnNextInput &&
        !["+", "-", "*", "/", "^"].includes(number.toString())
    ) {
        fullOperation = "";
    }
    resetOnNextInput = false; // Limpiar la pantalla en caso de que el usuario ingrese un número después del resultado

    // Evitar operadores consecutivos
    if (
        ["+", "-", "*", "/", "^"].includes(op[op.length - 1]) &&
        ["+", "-", "*", "/", "^"].includes(number.toString())
    )
        return;

    if (number === "=") {
        calculate();
        return;
    }

    fullOperation += number.toString();
    showNumber();
}

function calculate() {
    try {
        let expression = fullOperation.replace("^", "**"); // Convertir ^ a **
        let result = eval(expression);

        // Redondear a 2 decimales si el resultado no es un número entero
        if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(2));
        }

        history.push(fullOperation + " = " + result);
        updateHistory();

        fullOperation = result.toString();
        resetOnNextInput = true; 
        showNumber();
    } catch (error) {
        console.error("Operación inválida");
        fullOperation = "Error";
        showNumber();
    }
}

function showNumber() {
    document.getElementById("operation").innerHTML = fullOperation;
}

function clearOperation() {
    fullOperation = "";
    resetOnNextInput = false;
    showNumber();
}

function updateHistory() {
    let historyContainer = document.getElementById("history");
    historyContainer.innerHTML = "";
    // Limitar el historial a los últimos 5 elementos para no llenar la pantalla
    history.slice(-5).forEach((op) => {
        let p = document.createElement("p");
        p.innerText = op;
        p.classList.add("history-item");
        historyContainer.appendChild(p);
    });
}

function clearHistory() {
    history = [];
    updateHistory();
}
