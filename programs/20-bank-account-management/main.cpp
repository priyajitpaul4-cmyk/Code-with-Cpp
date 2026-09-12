#include <iostream>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;

public:
    BankAccount(string name, double initial) : owner(name), balance(initial) {}

    void deposit(double amount) {
        balance += amount;
        cout << "Deposited " << amount << ". New balance: " << balance << endl;
    }

    void withdraw(double amount) {
        if (amount > balance) {
            cout << "Insufficient funds!" << endl;
        } else {
            balance -= amount;
            cout << "Withdrew " << amount << ". New balance: " << balance << endl;
        }
    }

    void showBalance() const {
        cout << owner << "'s balance: " << balance << endl;
    }
};

int main() {
    BankAccount acc("Arjun", 5000);
    int choice;
    double amount;

    do {
        cout << "\n1. Deposit 2. Withdraw 3. Balance 4. Exit\nChoice: ";
        cin >> choice;
        switch (choice) {
            case 1: cout << "Amount: "; cin >> amount; acc.deposit(amount); break;
            case 2: cout << "Amount: "; cin >> amount; acc.withdraw(amount); break;
            case 3: acc.showBalance(); break;
        }
    } while (choice != 4);

    return 0;
}
