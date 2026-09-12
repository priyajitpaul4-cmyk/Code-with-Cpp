# 18. Student Grade Calculator

**Difficulty:** Beginner
**Concepts:** Arrays, Conditions

## Description
Calculate a student's average marks and assign a letter grade.

## Code
```cpp
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
```

## Expected Output
```
Enter marks for subject 1: 88
... 
Average: 79.4
Grade: B
```

## Explanation
Marks for each subject are stored in an array, summed, and averaged. The average is then mapped to a letter grade using a chain of conditions.
