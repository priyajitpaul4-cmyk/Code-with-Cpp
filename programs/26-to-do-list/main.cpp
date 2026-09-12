#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Task { string description; bool done; };

int main() {
    vector<Task> tasks;
    int choice, index;

    do {
        cout << "\n--- To-Do List ---\n";
        for (size_t i = 0; i < tasks.size(); i++)
            cout << i + 1 << ". [" << (tasks[i].done ? "x" : " ") << "] " << tasks[i].description << endl;

        cout << "\n1. Add 2. Mark Done 3. Remove 4. Exit\nChoice: ";
        cin >> choice;

        if (choice == 1) {
            cin.ignore();
            Task t; t.done = false;
            cout << "Task: "; getline(cin, t.description);
            tasks.push_back(t);
        } else if (choice == 2) {
            cout << "Task number: "; cin >> index;
            if (index >= 1 && index <= (int)tasks.size()) tasks[index - 1].done = true;
        } else if (choice == 3) {
            cout << "Task number: "; cin >> index;
            if (index >= 1 && index <= (int)tasks.size()) tasks.erase(tasks.begin() + index - 1);
        }
    } while (choice != 4);

    return 0;
}
