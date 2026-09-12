# 29. Temperature Converter

**Difficulty:** Beginner
**Concepts:** Functions, Conditions

## Description
Convert temperatures between Celsius, Fahrenheit and Kelvin.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    double c, f, k;
    cout << "Enter temperature in Celsius: ";
    cin >> c;

    f = (c * 9.0 / 5.0) + 32;
    k = c + 273.15;

    cout << c << " C = " << f << " F" << endl;
    cout << c << " C = " << k << " K" << endl;
    return 0;
}
```

## Expected Output
```
Enter temperature in Celsius: 25
25 C = 77 F
25 C = 298.15 K
```

## Explanation
Fahrenheit and Kelvin are both computed directly from the standard conversion formulas relative to Celsius.
