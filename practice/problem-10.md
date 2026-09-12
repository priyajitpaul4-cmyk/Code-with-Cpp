# Problem 10: Mini Library System

**Difficulty:** Advanced

## Statement
Track books with copies available; issuing reduces copies, returning increases them, and copies can never go negative or exceed the original stock.

## Sample Input
```
book = "C++ Basics", copies = 3, issue x2, return x1
```

## Sample Output
```
Available copies: 2
```

## Hint
Guard both directions: don't issue if copies == 0, and don't return above the original total.

<details>
<summary>Reveal Solution</summary>

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string title = "C++ Basics";
    int totalCopies = 3, available = 3;
    int choice;

    do {
        cout << "\nAvailable copies of \"" << title << "\": " << available << endl;
        cout << "1. Issue 2. Return 3. Exit\nChoice: ";
        cin >> choice;

        if (choice == 1) {
            if (available > 0) { available--; cout << "Issued.\n"; }
            else cout << "No copies available!\n";
        } else if (choice == 2) {
            if (available < totalCopies) { available++; cout << "Returned.\n"; }
            else cout << "All copies already in library!\n";
        }
    } while (choice != 3);

    return 0;
}
```

</details>
