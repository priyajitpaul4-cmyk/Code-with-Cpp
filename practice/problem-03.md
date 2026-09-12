# Problem 03: Array Statistics

**Difficulty:** Intermediate

## Statement
Compute the sum, average, maximum and minimum of an array without using STL algorithms.

## Sample Input
```
[12, 45, 3, 67, 21]
```

## Sample Output
```
Sum: 148
Average: 29.6
Max: 67
Min: 3
```

## Hint
Initialize max and min to the first element, then update them while scanning.

<details>
<summary>Reveal Solution</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Array size: ";
    cin >> n;
    double arr[100], sum = 0, mx, mn;

    cin >> arr[0];
    mx = mn = arr[0];
    sum = arr[0];

    for (int i = 1; i < n; i++) {
        cin >> arr[i];
        sum += arr[i];
        if (arr[i] > mx) mx = arr[i];
        if (arr[i] < mn) mn = arr[i];
    }

    cout << "Sum: " << sum << endl;
    cout << "Average: " << (sum / n) << endl;
    cout << "Max: " << mx << endl;
    cout << "Min: " << mn << endl;
    return 0;
}
```

</details>
