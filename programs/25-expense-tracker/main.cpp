#include <iostream>
#include <vector>
#include <string>
#include <map>
using namespace std;

struct Expense { string category; double amount; };

int main() {
    vector<Expense> expenses;
    int choice;

    do {
        cout << "\n1. Add Expense 2. View Summary 3. Exit\nChoice: ";
        cin >> choice;

        if (choice == 1) {
            Expense e;
            cout << "Category: "; cin >> e.category;
            cout << "Amount: "; cin >> e.amount;
            expenses.push_back(e);
        } else if (choice == 2) {
            map<string, double> totals;
            for (auto &e : expenses) totals[e.category] += e.amount;
            double grandTotal = 0;
            for (auto &t : totals) {
                cout << t.first << ": " << t.second << endl;
                grandTotal += t.second;
            }
            cout << "Total spent: " << grandTotal << endl;
        }
    } while (choice != 3);

    return 0;
}
