#include <iostream>
using namespace std;

int main() {
    const int subjects = 5;
    double marks[subjects];
    double total = 0;

    for (int i = 0; i < subjects; i++) {
        cout << "Enter marks for subject " << (i + 1) << ": ";
        cin >> marks[i];
        total += marks[i];
    }

    double average = total / subjects;
    char grade;

    if (average >= 90) grade = 'A';
    else if (average >= 75) grade = 'B';
    else if (average >= 60) grade = 'C';
    else if (average >= 40) grade = 'D';
    else grade = 'F';

    cout << "Average: " << average << endl;
    cout << "Grade: " << grade << endl;
    return 0;
}
