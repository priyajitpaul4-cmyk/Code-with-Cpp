# Problem 08: Inventory Calculator

**Difficulty:** Intermediate

## Statement
Given item quantities and unit prices, calculate the total value of inventory.

## Sample Input
```
items = [(10, 25.5), (5, 100), (20, 8)]
```

## Sample Output
```
Total inventory value: 915
```

## Hint
Multiply quantity by price for each item and accumulate the total.

<details>
<summary>Reveal Solution</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Number of items: ";
    cin >> n;
    double total = 0;

    for (int i = 0; i < n; i++) {
        double qty, price;
        cout << "Quantity, Price: ";
        cin >> qty >> price;
        total += qty * price;
    }

    cout << "Total inventory value: " << total << endl;
    return 0;
}
```

</details>
