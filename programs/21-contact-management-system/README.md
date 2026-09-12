# 21. Contact Management System

**Difficulty:** Intermediate
**Concepts:** Structs, Vectors, Search

## Description
Store contacts and search for one by name.

## Code
```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Contact { string name, phone; };

int main() {
    vector<Contact> contacts;
    int choice;

    do {
        cout << "\n1. Add 2. Search 3. List All 4. Exit\nChoice: ";
        cin >> choice;

        if (choice == 1) {
            Contact c;
            cout << "Name: "; cin >> c.name;
            cout << "Phone: "; cin >> c.phone;
            contacts.push_back(c);
        } else if (choice == 2) {
            string query;
            cout << "Search name: "; cin >> query;
            auto it = find_if(contacts.begin(), contacts.end(),
                [&](const Contact &c) { return c.name == query; });
            if (it != contacts.end())
                cout << it->name << " -> " << it->phone << endl;
            else
                cout << "Contact not found." << endl;
        } else if (choice == 3) {
            for (auto &c : contacts) cout << c.name << " -> " << c.phone << endl;
        }
    } while (choice != 4);

    return 0;
}
```

## Expected Output
```
1. Add 2. Search 3. List All 4. Exit
Choice: 2
Search name: Meera
Meera -> 9876543210
```

## Explanation
Contacts are stored as structs inside a vector. std::find_if scans the vector with a lambda predicate to locate a contact by name.
