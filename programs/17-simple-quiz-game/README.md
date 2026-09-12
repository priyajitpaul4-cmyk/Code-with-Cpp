# 17. Simple Quiz Game

**Difficulty:** Beginner
**Concepts:** Arrays, Loops

## Description
A short multiple-question quiz that scores the player at the end.

## Code
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string questions[3] = {
        "What is the capital of France? ",
        "5 + 7 = ? ",
        "Which language is this program written in? "
    };
    string answers[3] = {"paris", "12", "c++"};
    int score = 0;

    for (int i = 0; i < 3; i++) {
        string userAnswer;
        cout << questions[i];
        cin >> userAnswer;

        for (auto &c : userAnswer) c = tolower(c);
        if (userAnswer == answers[i]) {
            cout << "Correct!" << endl;
            score++;
        } else {
            cout << "Wrong! Correct answer: " << answers[i] << endl;
        }
    }

    cout << "You scored " << score << " out of 3." << endl;
    return 0;
}
```

## Expected Output
```
What is the capital of France? Paris
Correct!
5 + 7 = ? 12
Correct!
Which language is this program written in? Python
Wrong! Correct answer: c++
You scored 2 out of 3.
```

## Explanation
Answers are normalised to lowercase before comparison so the check is not case sensitive, and a running score tracks correct responses.
