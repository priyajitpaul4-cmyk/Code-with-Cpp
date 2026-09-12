# Problem 09: Contact Search System

**Difficulty:** Intermediate

## Statement
Store a list of names and phone numbers, then search for a name using binary search after sorting.

## Sample Input
```
names = [Zoya, Amit, Priya], search = Amit
```

## Sample Output
```
Found: Amit
```

## Hint
Sort the array first, then apply binary search since it requires sorted data.

<details>
<summary>Reveal Solution</summary>

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cout << "Number of contacts: ";
    cin >> n;
    string names[100];
    for (int i = 0; i < n; i++) cin >> names[i];

    sort(names, names + n);

    string query;
    cout << "Search for: ";
    cin >> query;

    if (binary_search(names, names + n, query))
        cout << "Found: " << query << endl;
    else
        cout << "Not found." << endl;

    return 0;
}
```

</details>
