// Helper function to check if a character is an operand (a variable or number)
function isOperand(c) {
    return ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'));
}

// Helper function to check if a character is an operator
function isOperator(c) {
    return ['+', '-', '*', '/', '^'].includes(c);
}

// Function to convert a postfix expression to an infix expression
function postfixToInfix(expression) {
    let stack = [];

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        // Skip spaces in the postfix expression
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
                throw new Error("Insufficient operands for operator");
            }
            let operand2 = stack.pop();
            let operand1 = stack.pop();
            let infixExpr = '(' + operand1 + ' ' + char + ' ' + operand2 + ')';
            stack.push(infixExpr);
        } else {
            throw new Error("Invalid character in expression");
        }
    }

    // The result will be the only element left in the stack
    if (stack.length !== 1) {
        throw new Error("Invalid postfix expression");
    }

    return stack.pop();
}

// Function to convert the input postfix expression to infix and display the result
function convertToInfix() {
    const postfixExpression = document.getElementById("postfix").value.trim(); // Trim to remove leading/trailing spaces
    document.getElementById("error-message").textContent = "";  // Reset error message

    try {
        const infixExpression = postfixToInfix(postfixExpression);
        document.getElementById("infix").value = infixExpression;
    } catch (error) {
        document.getElementById("error-message").textContent = "Invalid expression! " + error.message;
    }
}
