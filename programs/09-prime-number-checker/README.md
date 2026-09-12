# 09. Prime Number Checker

**Difficulty:** Beginner
**Concepts:** Loops, Conditions

## Description
Check whether a given number is prime.

## Code
```cpp
#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int n;
    cout << "Enter a number: ";
    cin >> n;

    if (isPrime(n))
        cout << n << " is a Prime Number." << endl;
    else
        cout << n << " is not a Prime Number." << endl;

    return 0;
}
```

## Expected Output
```
Enter a number: 29
29 is a Prime Number.
```

## Explanation
A number is prime if no integer from 2 up to its square root divides it evenly. Checking only up to sqrt(n) keeps the loop efficient.
