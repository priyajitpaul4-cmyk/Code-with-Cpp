# 06. Multiplication Table

**Difficulty:** Beginner
**Concepts:** Loops

## Description
Print the multiplication table of a number using a loop.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;

    for (int i = 1; i <= 10; i++) {
        cout << n << " x " << i << " = " << (n * i) << endl;
    }
    return 0;
}
```

## Expected Output
```
Enter a number: 7
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70
```

## Explanation
A for loop counts from 1 to 10, multiplying the chosen number by the counter each iteration.
