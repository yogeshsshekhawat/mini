function precedence(op) {
    if (op == '+' || op == '-')
        return 1;
    if (op == '*' || op == '/')
        return 2;
    return 0;
}

function isOperator(c) {
    return ['+', '-', '*', '/'].includes(c);
}

function infixToPostfix(expression) {
    let result = '';
    let stack = [];

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9')) {
            result += char + ' ';
        }

        // If the scanned character is an ‘(‘, push it to the stack.
        else if (char == '(') {
            stack.push(char);
        }

        // If the scanned character is an ‘)’, pop and output from the stack
        // until an ‘(‘ is encountered.
        else if (char == ')') {
            while (stack.length && stack[stack.length - 1] != '(') {
                result += stack.pop() + ' ';
            }
            stack.pop();
        }

        // An operator is encountered
        else if (isOperator(char)) {
            while (stack.length && precedence(stack[stack.length - 1]) >= precedence(char)) {
                result += stack.pop() + ' ';
            }
            stack.push(char);
        }
    }

    // Pop all the operators from the stack
    while (stack.length) {
        result += stack.pop() + ' ';
    }

    return result.trim();
}

function convertToPostfix() {
    const infixExpression = document.getElementById("infix").value;
    document.getElementById("error-message").textContent = "";  // Reset error message

    try {
        const postfixExpression = infixToPostfix(infixExpression);
        document.getElementById("postfix").value = postfixExpression;
    } catch (error) {
        document.getElementById("error-message").textContent = "Invalid expression!";
    }
}
