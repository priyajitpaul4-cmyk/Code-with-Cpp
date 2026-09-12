# 22. Library Management System

**Difficulty:** Intermediate
**Concepts:** Classes, Vectors, OOP

## Description
Issue and return books while tracking availability.

## Code
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Book {
public:
    string title;
    bool issued;
    Book(string t) : title(t), issued(false) {}
};

int main() {
    vector<Book> books = { Book("C++ Primer"), Book("Data Structures"), Book("Algorithms") };
    int choice, index;

    do {
        cout << "\nLibrary Books:\n";
        for (size_t i = 0; i < books.size(); i++)
            cout << i + 1 << ". " << books[i].title
                 << (books[i].issued ? " [Issued]" : " [Available]") << endl;

        cout << "1. Issue 2. Return 3. Exit\nChoice: ";
        cin >> choice;
        if (choice == 1 || choice == 2) {
            cout << "Book number: "; cin >> index;
            index--;
            if (index < 0 || index >= (int)books.size()) { cout << "Invalid book.\n"; continue; }
            if (choice == 1) {
                if (books[index].issued) cout << "Already issued!\n";
                else { books[index].issued = true; cout << "Book issued.\n"; }
            } else {
                books[index].issued = false;
                cout << "Book returned.\n";
            }
        }
    } while (choice != 3);

    return 0;
}
```

## Expected Output
```
Library Books:
1. C++ Primer [Available]
2. Data Structures [Available]
3. Algorithms [Available]
1. Issue 2. Return 3. Exit
Choice: 1
Book number: 1
Book issued.
```

## Explanation
Each Book object tracks its own issued flag. The menu loop lets the user toggle that flag for a chosen book by index.
