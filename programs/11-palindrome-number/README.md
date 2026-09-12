# 11. Palindrome Number

**Difficulty:** Beginner
**Concepts:** Loops, Operators

## Description
Check whether a number reads the same forwards and backwards.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    int n, original, reversed = 0;
    cout << "Enter a number: ";
    cin >> n;
    original = n;

    while (n != 0) {
        int digit = n % 10;
        reversed = reversed * 10 + digit;
        n /= 10;
    }

    if (original == reversed)
        cout << original << " is a Palindrome." << endl;
    else
        cout << original << " is not a Palindrome." << endl;

    return 0;
}
```

## Expected Output
```
Enter a number: 12321
12321 is a Palindrome.
```

## Explanation
The digits of the number are peeled off one at a time with % 10 and rebuilt in reverse order, then compared to the original.
