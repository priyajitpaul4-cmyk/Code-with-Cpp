# 03. Even or Odd Checker

**Difficulty:** Beginner
**Concepts:** Conditions, Input/Output

## Description
Check whether a number is even or odd using conditions.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter an integer: ";
    cin >> n;

    if (n % 2 == 0)
        cout << n << " is Even." << endl;
    else
        cout << n << " is Odd." << endl;

    return 0;
}
```

## Expected Output
```
Enter an integer: 17
17 is Odd.
```

## Explanation
The modulus operator % gives the remainder of division by 2. A remainder of 0 means the number is even.
