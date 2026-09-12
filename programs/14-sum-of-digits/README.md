# 14. Sum of Digits

**Difficulty:** Beginner
**Concepts:** Loops

## Description
Calculate the sum of the digits of a number.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    long long n;
    cout << "Enter a number: ";
    cin >> n;
    if (n < 0) n = -n;

    int sum = 0;
    while (n != 0) {
        sum += n % 10;
        n /= 10;
    }

    cout << "Sum of digits: " << sum << endl;
    return 0;
}
```

## Expected Output
```
Enter a number: 4829
Sum of digits: 23
```

## Explanation
Each digit is extracted with % 10 and added to a running total, while / 10 removes that digit before the next iteration.
