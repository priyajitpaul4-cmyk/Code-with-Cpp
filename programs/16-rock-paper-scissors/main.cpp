#include <iostream>
#include <cstdlib>
#include <ctime>
#include <string>
using namespace std;

int main() {
    srand((unsigned)time(0));
    string choices[3] = {"Rock", "Paper", "Scissors"};

    int userChoice;
    cout << "0-Rock  1-Paper  2-Scissors" << endl;
    cout << "Enter your choice: ";
    cin >> userChoice;

    int compChoice = rand() % 3;
    cout << "Computer chose: " << choices[compChoice] << endl;

    if (userChoice == compChoice) {
        cout << "It's a tie!" << endl;
    } else if ((userChoice == 0 && compChoice == 2) ||
               (userChoice == 1 && compChoice == 0) ||
               (userChoice == 2 && compChoice == 1)) {
        cout << "You win!" << endl;
    } else {
        cout << "Computer wins!" << endl;
    }
    return 0;
}
