#include <iostream>
using namespace std;

int main() {
    int choice;
    double value;

    cout << "1. KM to Miles\n2. Miles to KM\n3. KG to Pounds\n4. Pounds to KG\nChoice: ";
    cin >> choice;
    cout << "Enter value: ";
    cin >> value;

    double result;
    switch (choice) {
        case 1: result = value * 0.621371; cout << result << " miles" << endl; break;
        case 2: result = value / 0.621371; cout << result << " km" << endl; break;
        case 3: result = value * 2.20462; cout << result << " lb" << endl; break;
        case 4: result = value / 2.20462; cout << result << " kg" << endl; break;
        default: cout << "Invalid choice." << endl;
    }
    return 0;
}
