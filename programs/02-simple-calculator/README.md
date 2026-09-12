# 02. Simple Calculator

**Difficulty:** Beginner
**Concepts:** Functions, Operators

## Description
Perform basic arithmetic operations (add, subtract, multiply, divide) with user input.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    double a, b;
    char op;

    cout << "Enter first number: ";
    cin >> a;
    cout << "Enter operator (+, -, *, /): ";
    cin >> op;
    cout << "Enter second number: ";
    cin >> b;

    double result = 0;
    bool valid = true;

    switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/':
            if (b == 0) {
                cout << "Error: Division by zero!" << endl;
                valid = false;
            } else {
                result = a / b;
            }
            break;
        default:
            cout << "Invalid operator!" << endl;
            valid = false;
    }

    if (valid) {
        cout << "Result: " << result << endl;
    }
    return 0;
}
```

## Expected Output
```
Enter first number: 12
Enter operator (+, -, *, /): *
Enter second number: 4
Result: 48
```

## Explanation
A switch statement selects the operation based on the operator character. Division by zero is guarded explicitly to avoid undefined behaviour.
