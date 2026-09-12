#include <iostream>
using namespace std;

int main() {
    int year;
    cout << "Enter a year: ";
    cin >> year;

    bool isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);

    if (isLeap)
        cout << year << " is a Leap Year." << endl;
    else
        cout << year << " is not a Leap Year." << endl;

    return 0;
}
