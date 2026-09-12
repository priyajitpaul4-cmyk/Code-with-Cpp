# 07. Factorial Calculator

**Difficulty:** Beginner
**Concepts:** Loops, Functions

## Description
Calculate the factorial of a number using a loop or recursion.

## Code
```cpp
#include <iostream>
using namespace std;

unsigned long long factorial(int n) {
    unsigned long long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

int main() {
    int n;
    cout << "Enter a non-negative integer: ";
    cin >> n;

    if (n < 0) {
        cout << "Factorial is not defined for negative numbers." << endl;
    } else {
        cout << n << "! = " << factorial(n) << endl;
    }
    return 0;
}
```

## Expected Output
```
Enter a non-negative integer: 6
6! = 720
```

## Explanation
The factorial function multiplies every integer from 2 up to n. unsigned long long is used so larger factorials do not overflow as quickly.
