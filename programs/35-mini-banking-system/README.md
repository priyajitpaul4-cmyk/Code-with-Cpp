# 35. Mini Banking System

**Difficulty:** Advanced
**Concepts:** OOP, Vectors, Classes

## Description
A multi-account banking system supporting account creation, deposits, withdrawals and transfers.

## Code
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Account {
public:
    int id;
    string owner;
    double balance;
    Account(int i, string o, double b) : id(i), owner(o), balance(b) {}
};

vector<Account> accounts;
int nextId = 1001;

Account* findAccount(int id) {
    for (auto &a : accounts) if (a.id == id) return &a;
    return nullptr;
}

int main() {
    int choice;
    do {
        cout << "\n1. Open Account 2. Deposit 3. Withdraw 4. Transfer 5. View All 6. Exit\nChoice: ";
        cin >> choice;

        if (choice == 1) {
            string name; double initial;
            cout << "Owner name: "; cin >> name;
            cout << "Initial deposit: "; cin >> initial;
            accounts.push_back(Account(nextId, name, initial));
            cout << "Account created with ID " << nextId++ << endl;
        } else if (choice == 2 || choice == 3) {
            int id; double amt;
            cout << "Account ID: "; cin >> id;
            cout << "Amount: "; cin >> amt;
            Account* a = findAccount(id);
            if (!a) { cout << "Account not found.\n"; continue; }
            if (choice == 2) { a->balance += amt; cout << "Deposited.\n"; }
            else {
                if (amt > a->balance) cout << "Insufficient funds!\n";
                else { a->balance -= amt; cout << "Withdrawn.\n"; }
            }
        } else if (choice == 4) {
            int fromId, toId; double amt;
            cout << "From ID: "; cin >> fromId;
            cout << "To ID: "; cin >> toId;
            cout << "Amount: "; cin >> amt;
            Account* from = findAccount(fromId);
            Account* to = findAccount(toId);
            if (!from || !to) cout << "Invalid account(s).\n";
            else if (amt > from->balance) cout << "Insufficient funds!\n";
            else { from->balance -= amt; to->balance += amt; cout << "Transfer complete.\n"; }
        } else if (choice == 5) {
            for (auto &a : accounts)
                cout << a.id << " | " << a.owner << " | Balance: " << a.balance << endl;
        }
    } while (choice != 6);

    return 0;
}
```

## Expected Output
```
1. Open Account 2. Deposit 3. Withdraw 4. Transfer 5. View All 6. Exit
Choice: 1
Owner name: Kabir
Initial deposit: 2000
Account created with ID 1001
```

## Explanation
Accounts live in a vector and are looked up by ID with a pointer-returning helper, which lets deposit, withdraw and transfer all share the same lookup logic.
