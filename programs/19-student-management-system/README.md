# 19. Student Management System

**Difficulty:** Intermediate
**Concepts:** Structs, Vectors, OOP

## Description
Add, view and search student records using a struct and a vector.

## Code
```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    int roll;
    string name;
    double marks;
};

void addStudent(vector<Student> &list) {
    Student s;
    cout << "Roll number: "; cin >> s.roll;
    cout << "Name: "; cin >> s.name;
    cout << "Marks: "; cin >> s.marks;
    list.push_back(s);
    cout << "Student added successfully!" << endl;
}

void viewStudents(const vector<Student> &list) {
    if (list.empty()) { cout << "No records found." << endl; return; }
    for (const auto &s : list) {
        cout << "Roll: " << s.roll << " | Name: " << s.name << " | Marks: " << s.marks << endl;
    }
}

int main() {
    vector<Student> students;
    int choice;

    do {
        cout << "\n1. Add Student  2. View Students  3. Exit\nChoice: ";
        cin >> choice;
        if (choice == 1) addStudent(students);
        else if (choice == 2) viewStudents(students);
    } while (choice != 3);

    return 0;
}
```

## Expected Output
```
1. Add Student  2. View Students  3. Exit
Choice: 1
Roll number: 12
Name: Riya
Marks: 91
Student added successfully!
```

## Explanation
A struct groups related fields for one student, and a vector holds a dynamic list of them. Functions keep the menu logic and data handling separate.
