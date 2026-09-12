#include <iostream>
using namespace std;

int main() {
    double a, b, c;
    cout << "Enter three numbers: ";
    cin >> a >> b >> c;

    double largest = a;
    if (b > largest) largest = b;
    if (c > largest) largest = c;

    cout << "Largest number: " << largest << endl;
    return 0;
}
