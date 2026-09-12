# 23. ATM Simulation

**Difficulty:** Intermediate
**Concepts:** Classes, Loops, Conditions

## Description
Simulate a PIN-protected ATM with deposit, withdrawal and balance checks.

## Code
```cpp
#include <iostream>
using namespace std;

class ATM {
    int pin;
    double balance;
public:
    ATM(int p, double b) : pin(p), balance(b) {}

    bool authenticate(int enteredPin) { return enteredPin == pin; }

    void menu() {
        int choice;
        double amount;
        do {
            cout << "\n1. Balance 2. Deposit 3. Withdraw 4. Exit\nChoice: ";
            cin >> choice;
            switch (choice) {
                case 1: cout << "Balance: " << balance << endl; break;
                case 2: cout << "Amount: "; cin >> amount; balance += amount; cout << "Deposited.\n"; break;
                case 3:
                    cout << "Amount: "; cin >> amount;
                    if (amount > balance) cout << "Insufficient funds!\n";
                    else { balance -= amount; cout << "Please collect cash.\n"; }
                    break;
            }
        } while (choice != 4);
    }
};

int main() {
    ATM atm(1234, 10000);
    int pin, attempts = 0;

    while (attempts < 3) {
        cout << "Enter PIN: ";
        cin >> pin;
        if (atm.authenticate(pin)) { atm.menu(); break; }
        cout << "Incorrect PIN!\n";
        attempts++;
    }
    if (attempts == 3) cout << "Card blocked.\n";

    return 0;
}
```

## Expected Output
```
Enter PIN: 1234
1. Balance 2. Deposit 3. Withdraw 4. Exit
Choice: 1
Balance: 10000
```

## Explanation
The ATM class hides the PIN and balance as private members. authenticate() checks the PIN before menu() is allowed to run.
