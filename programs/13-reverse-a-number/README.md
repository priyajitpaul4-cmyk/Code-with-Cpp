# 13. Reverse a Number

**Difficulty:** Beginner
**Concepts:** Loops, Operators

## Description
Reverse the digits of an integer.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    long long n, reversed = 0;
    cout << "Enter a number: ";
    cin >> n;

    bool negative = n < 0;
    if (negative) n = -n;

    while (n != 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }

    if (negative) reversed = -reversed;
    cout << "Reversed number: " << reversed << endl;
    return 0;
}
```

## Expected Output
```
Enter a number: 48293
Reversed number: 39284
```

## Explanation
This is the same digit-extraction technique used in the palindrome checker, applied here purely to build and display the reversed value.
