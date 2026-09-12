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
