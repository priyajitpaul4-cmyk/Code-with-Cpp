# Problem 04: String Analyzer

**Difficulty:** Intermediate

## Statement
Given a sentence, count vowels, consonants, digits and spaces.

## Sample Input
```
"C++ is fun 2 learn"
```

## Sample Output
```
Vowels: 4
Consonants: 7
Digits: 1
Spaces: 4
```

## Hint
Loop through each character and classify it with isalpha, isdigit and a vowel check.

<details>
<summary>Reveal Solution</summary>

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string text;
    cout << "Enter a sentence: ";
    getline(cin, text);

    int vowels = 0, consonants = 0, digits = 0, spaces = 0;
    string vowelSet = "aeiouAEIOU";

    for (char c : text) {
        if (isspace(c)) spaces++;
        else if (isdigit(c)) digits++;
        else if (isalpha(c)) {
            if (vowelSet.find(c) != string::npos) vowels++;
            else consonants++;
        }
    }

    cout << "Vowels: " << vowels << endl;
    cout << "Consonants: " << consonants << endl;
    cout << "Digits: " << digits << endl;
    cout << "Spaces: " << spaces << endl;
    return 0;
}
```

</details>
