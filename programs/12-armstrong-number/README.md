# 12. Armstrong Number

**Difficulty:** Beginner
**Concepts:** Loops, Math

## Description
Check whether a number is an Armstrong number (sum of its own digits, each raised to the power of the digit count, equals the number).

## Code
```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n, original, sum = 0, digits = 0;
    cout << "Enter a number: ";
    cin >> n;
    original = n;

    int temp = n;
    while (temp != 0) { digits++; temp /= 10; }

    temp = n;
    while (temp != 0) {
        int digit = temp % 10;
        sum += (int)pow(digit, digits);
        temp /= 10;
    }

    if (sum == original)
        cout << original << " is an Armstrong number." << endl;
    else
        cout << original << " is not an Armstrong number." << endl;

    return 0;
}
```

## Expected Output
```
Enter a number: 153
153 is an Armstrong number.
```

## Explanation
First the digit count is found, then each digit is raised to that power and summed. If the sum equals the original number, it is an Armstrong number.
