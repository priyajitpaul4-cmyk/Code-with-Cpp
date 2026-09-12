#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n, original, sum = 0, digits = 0;
    cout << "Enter a number: ";
    cin >> n;
    original = n;

    int temp = n;
    while (temp != 0) { digits++; temp /= 10; }

    temp = n;
    while (temp != 0) {
        int digit = temp % 10;
        sum += (int)pow(digit, digits);
        temp /= 10;
    }

    if (sum == original)
        cout << original << " is an Armstrong number." << endl;
    else
        cout << original << " is not an Armstrong number." << endl;

    return 0;
}
