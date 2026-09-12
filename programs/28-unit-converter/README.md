# 28. Unit Converter

**Difficulty:** Beginner
**Concepts:** Functions, Conditions

## Description
Convert between common units such as kilometers/miles and kilograms/pounds.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    int choice;
    double value;

    cout << "1. KM to Miles\n2. Miles to KM\n3. KG to Pounds\n4. Pounds to KG\nChoice: ";
    cin >> choice;
    cout << "Enter value: ";
    cin >> value;

    double result;
    switch (choice) {
        case 1: result = value * 0.621371; cout << result << " miles" << endl; break;
        case 2: result = value / 0.621371; cout << result << " km" << endl; break;
        case 3: result = value * 2.20462; cout << result << " lb" << endl; break;
        case 4: result = value / 2.20462; cout << result << " kg" << endl; break;
        default: cout << "Invalid choice." << endl;
    }
    return 0;
}
```

## Expected Output
```
1. KM to Miles
2. Miles to KM
3. KG to Pounds
4. Pounds to KG
Choice: 1
Enter value: 10
6.21371 miles
```

## Explanation
Each conversion is a fixed multiplication or division factor selected through a switch statement based on the user's menu choice.
