# Problem 06: Bank Transaction Analyzer

**Difficulty:** Advanced

## Statement
Given a list of deposits (positive) and withdrawals (negative), compute the final balance and the largest single transaction.

## Sample Input
```
start = 1000, transactions = [500, -200, -800, 300]
```

## Sample Output
```
Final balance: 800
Largest transaction: 500
```

## Hint
Track balance by adding each transaction, and largest by comparing absolute values.

<details>
<summary>Reveal Solution</summary>

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double balance;
    int n;
    cout << "Starting balance: ";
    cin >> balance;
    cout << "Number of transactions: ";
    cin >> n;

    double largest = 0;
    for (int i = 0; i < n; i++) {
        double t;
        cin >> t;
        balance += t;
        if (fabs(t) > fabs(largest)) largest = t;
    }

    cout << "Final balance: " << balance << endl;
    cout << "Largest transaction: " << largest << endl;
    return 0;
}
```

</details>
