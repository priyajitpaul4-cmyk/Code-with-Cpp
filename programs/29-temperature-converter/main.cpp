#include <iostream>
using namespace std;

int main() {
    double c, f, k;
    cout << "Enter temperature in Celsius: ";
    cin >> c;

    f = (c * 9.0 / 5.0) + 32;
    k = c + 273.15;

    cout << c << " C = " << f << " F" << endl;
    cout << c << " C = " << k << " K" << endl;
    return 0;
}
