# Problem 02: Number Frequency Counter

**Difficulty:** Intermediate

## Statement
Given an array of integers, count how many times each distinct number appears.

## Sample Input
```
[4, 2, 4, 5, 2, 4]
```

## Sample Output
```
4 -> 3
2 -> 2
5 -> 1
```

## Hint
A std::map<int,int> can accumulate counts keyed by the number itself.

<details>
<summary>Reveal Solution</summary>

```cpp
#include <iostream>
#include <map>
using namespace std;

int main() {
    int n;
    cout << "Array size: ";
    cin >> n;
    map<int, int> freq;

    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        freq[x]++;
    }

    for (auto &p : freq)
        cout << p.first << " -> " << p.second << endl;

    return 0;
}
```

</details>
