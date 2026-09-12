# 04. Largest of Three Numbers

**Difficulty:** Beginner
**Concepts:** Conditions, Variables

## Description
Find the largest number among three numbers entered by the user.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    double a, b, c;
    cout << "Enter three numbers: ";
    cin >> a >> b >> c;

    double largest = a;
    if (b > largest) largest = b;
    if (c > largest) largest = c;

    cout << "Largest number: " << largest << endl;
    return 0;
}
```

## Expected Output
```
Enter three numbers: 4 19 7
Largest number: 19
```

## Explanation
We start by assuming the first value is the largest, then compare it against the other two, updating whenever a bigger value is found.
