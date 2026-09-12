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
