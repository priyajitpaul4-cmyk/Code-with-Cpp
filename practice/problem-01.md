# Problem 01: Student Marks Analyzer

**Difficulty:** Intermediate

## Statement
Read marks of N students for one subject and print the highest, lowest and average mark.

## Sample Input
```
N = 5, marks = [78, 92, 55, 88, 67]
```

## Sample Output
```
Highest: 92
Lowest: 55
Average: 76
```

## Hint
Track a running max, min and sum in a single loop over the array.

<details>
<summary>Reveal Solution</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Number of students: ";
    cin >> n;
    int marks[100], highest = 0, lowest = 100, sum = 0;

    for (int i = 0; i < n; i++) {
        cin >> marks[i];
        sum += marks[i];
        if (marks[i] > highest) highest = marks[i];
        if (marks[i] < lowest) lowest = marks[i];
    }

    cout << "Highest: " << highest << endl;
    cout << "Lowest: " << lowest << endl;
    cout << "Average: " << (sum / n) << endl;
    return 0;
}
```

</details>
