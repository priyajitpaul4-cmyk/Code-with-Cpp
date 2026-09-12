# Problem 07: Employee Salary Calculator

**Difficulty:** Intermediate

## Statement
Calculate net salary for multiple employees given basic pay, allowances and deductions.

## Sample Input
```
basic = 30000, allowance = 4000, deduction = 2500
```

## Sample Output
```
Net Salary: 31500
```

## Hint
Net = basic + allowances - deductions. Repeat for each employee using a loop.

<details>
<summary>Reveal Solution</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Number of employees: ";
    cin >> n;

    for (int i = 0; i < n; i++) {
        double basic, allowance, deduction;
        cout << "Basic, Allowance, Deduction: ";
        cin >> basic >> allowance >> deduction;
        double net = basic + allowance - deduction;
        cout << "Net Salary: " << net << endl;
    }
    return 0;
}
```

</details>
