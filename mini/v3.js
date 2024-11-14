
// Helper function to check if a character is an operand (a variable or number)
function isOperand(c) {
    return ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'));
}

// Helper function to check if a character is an operator
function isOperator(c) {
    return ['+', '-', '*', '/', '^'].includes(c);
}

// Function to convert a prefix expression to an infix expression
function prefixToInfix(expression) {
    let stack = [];
    expression = expression.trim(); // Remove leading/trailing spaces

    // Loop through the expression from right to left
    for (let i = expression.length - 1; i >= 0; i--) {
        let char = expression[i];

        // Skip spaces
        if (char === ' ') {
            continue;
        }

        // If the character is an operand, push it to the stack
        if (isOperand(char)) {
            stack.push(char);
        }
        // If the character is an operator, pop two operands from the stack,
        // form the infix expression, and push it back to the stack
        else if (isOperator(char)) {
            if (stack.length < 2) {
                throw new Error("Invalid prefix expression: Not enough operands for operator.");
            }
            let operand1 = stack.pop();
            let operand2 = stack.pop();
            let infixExpr = '(' + operand1 + ' ' + char + ' ' + operand2 + ')';
            stack.push(infixExpr);
        } else {
            throw new Error("Invalid character in expression: " + char);
        }
    }

    // The result will be the only element left in the stack
    if (stack.length !== 1) {
        throw new Error("Invalid prefix expression: The expression is not valid.");
    }

    return stack.pop();
}

// Function to convert the input prefix expression to infix and display the result
function convertToInfixFromPrefix() {
    const prefixExpression = document.getElementById("prefix").value.trim(); // Trim to remove leading/trailing spaces
    document.getElementById("error-message").textContent = "";  // Reset error message

    try {
        const infixExpression = prefixToInfix(prefixExpression);
        document.getElementById("infix").value = infixExpression;
    } catch (error) {
        document.getElementById("error-message").textContent = "Invalid expression! " + error.message;
    }
}
