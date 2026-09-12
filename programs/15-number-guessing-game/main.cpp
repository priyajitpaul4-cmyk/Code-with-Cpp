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
