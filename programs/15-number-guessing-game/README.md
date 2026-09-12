# 15. Number Guessing Game

**Difficulty:** Beginner
**Concepts:** Loops, Random, Conditions

## Description
Guess a randomly generated number within a limited number of attempts.

## Code
```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand((unsigned)time(0));
    int target = rand() % 100 + 1;
    int guess, attempts = 0;
    const int maxAttempts = 7;

    cout << "Guess the number between 1 and 100!" << endl;

    do {
        cout << "Attempt " << (attempts + 1) << "/" << maxAttempts << ": ";
        cin >> guess;
        attempts++;

        if (guess > target) cout << "Too high!" << endl;
        else if (guess < target) cout << "Too low!" << endl;
        else { cout << "Correct! You guessed it in " << attempts << " attempts." << endl; break; }

    } while (attempts < maxAttempts);

    if (guess != target)
        cout << "Out of attempts! The number was " << target << "." << endl;

    return 0;
}
```

## Expected Output
```
Guess the number between 1 and 100!
Attempt 1/7: 50
Too low!
Attempt 2/7: 75
Correct! You guessed it in 2 attempts.
```

## Explanation
rand() % 100 + 1 generates a pseudo-random target. A do-while loop keeps prompting until the guess matches or attempts run out.
