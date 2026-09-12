# Problem 05: Matrix Calculator

**Difficulty:** Advanced

## Statement
Read two 2x2 matrices and print their sum and product.

## Sample Input
```
A = [[1,2],[3,4]], B = [[5,6],[7,8]]
```

## Sample Output
```
Sum:
6 8
10 12
Product:
19 22
43 50
```

## Hint
Matrix multiplication: result[i][j] is the dot product of row i of A and column j of B.

<details>
<summary>Reveal Solution</summary>

```cpp
#include <iostream>
using namespace std;

int main() {
    int a[2][2], b[2][2], sum[2][2], prod[2][2] = {0};

    cout << "Enter matrix A (4 numbers): ";
    for (int i = 0; i < 2; i++) for (int j = 0; j < 2; j++) cin >> a[i][j];

    cout << "Enter matrix B (4 numbers): ";
    for (int i = 0; i < 2; i++) for (int j = 0; j < 2; j++) cin >> b[i][j];

    cout << "Sum:" << endl;
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            sum[i][j] = a[i][j] + b[i][j];
            cout << sum[i][j] << " ";
        }
        cout << endl;
    }

    cout << "Product:" << endl;
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                prod[i][j] += a[i][k] * b[k][j];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) cout << prod[i][j] << " ";
        cout << endl;
    }
    return 0;
}
```

</details>
