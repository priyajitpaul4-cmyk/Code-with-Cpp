# 05. Leap Year Checker

**Difficulty:** Beginner
**Concepts:** Conditions, Operators

## Description
Determine whether a given year is a leap year.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    int year;
    cout << "Enter a year: ";
    cin >> year;

    bool isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);

    if (isLeap)
        cout << year << " is a Leap Year." << endl;
    else
        cout << year << " is not a Leap Year." << endl;

    return 0;
}
```

## Expected Output
```
Enter a year: 2028
2028 is a Leap Year.
```

## Explanation
A year is a leap year if it is divisible by 4 but not by 100, unless it is also divisible by 400 (e.g. 2000).
