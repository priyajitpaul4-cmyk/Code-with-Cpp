# 32. Hangman Game

**Difficulty:** Advanced
**Concepts:** Strings, Loops, Sets

## Description
Guess the hidden word letter by letter before running out of attempts.

## Code
```cpp
#include <iostream>
#include <string>
#include <set>
using namespace std;

int main() {
    string word = "polytechnic";
    set<char> guessed;
    int attemptsLeft = 6;

    while (attemptsLeft > 0) {
        string display = "";
        bool complete = true;
        for (char c : word) {
            if (guessed.count(c)) display += c;
            else { display += '_'; complete = false; }
        }

        cout << "Word: " << display << "   Attempts left: " << attemptsLeft << endl;
        if (complete) { cout << "You win! The word was " << word << endl; break; }

        cout << "Guess a letter: ";
        char letter;
        cin >> letter;
        guessed.insert(letter);

        if (word.find(letter) == string::npos) {
            attemptsLeft--;
            cout << "Wrong guess!" << endl;
        }
    }

    if (attemptsLeft == 0) cout << "You lost! The word was " << word << endl;
    return 0;
}
```

## Expected Output
```
Word: ___________   Attempts left: 6
Guess a letter: p
Word: p__________   Attempts left: 6
```

## Explanation
A std::set stores guessed letters without duplicates. The hidden word is redrawn each round, revealing any letter that has already been guessed correctly.
