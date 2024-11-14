function isOperand(char) {
    // Check if the character is a digit or a letter (for variable names)
    return /\d/.test(char) || /[a-zA-Z]/.test(char);
}

function isOperator(char) {
    // Check if the character is one of the common operators
    return ['+', '-', '*', '/'].includes(char);
}

function prefixToPostfix(expression) {
    let stack = [];

    // Loop through the expression from right to left
    for (let i = expression.length - 1; i >= 0; i--) {
        let char = expression[i];

        // If the character is an operand, push it to the stack
        if (isOperand(char)) {
            stack.push(char);
        }
        // If the character is an operator, pop two operands from the stack,
        // form the postfix expression, and push it back to the stack
        else if (isOperator(char)) {
            if (stack.length < 2) {
                throw new Error("Invalid expression: not enough operands.");
            }

            let operand1 = stack.pop();
            let operand2 = stack.pop();
            let postfixExpr = operand1 + ' ' + operand2 + ' ' + char;
            stack.push(postfixExpr);
        } else {
            // Handle invalid characters in the expression
            throw new Error("Invalid character in expression.");
        }
    }

    // The result will be the only element left in the stack
    if (stack.length !== 1) {
        throw new Error("Invalid expression: too many operands.");
    }

    return stack.pop();
}

function convertToPostfixFromPrefix() {
    const prefixExpression = document.getElementById("prefix").value.trim();
    document.getElementById("error-message").textContent = "";  // Reset error message

    try {
        const postfixExpression = prefixToPostfix(prefixExpression);
        document.getElementById("postfix").value = postfixExpression;
    } catch (error) {
        document.getElementById("error-message").textContent = "Invalid expression!";
    }
}

