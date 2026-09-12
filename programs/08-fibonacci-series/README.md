# 08. Fibonacci Series

**Difficulty:** Beginner
**Concepts:** Loops, Arrays

## Description
Print the Fibonacci series up to n terms.

## Code
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter number of terms: ";
    cin >> n;

    long long a = 0, b = 1;
    cout << "Fibonacci Series: ";
    for (int i = 0; i < n; i++) {
        cout << a << " ";
        long long next = a + b;
        a = b;
        b = next;
    }
    cout << endl;
    return 0;
}
```

## Expected Output
```
Enter number of terms: 8
Fibonacci Series: 0 1 1 2 3 5 8 13
```

## Explanation
Each Fibonacci number is the sum of the two numbers before it. Two variables track the previous two terms as the loop advances.
