#include <iostream>
using namespace std;

int main() {
    long long n, reversed = 0;
    cout << "Enter a number: ";
    cin >> n;

    bool negative = n < 0;
    if (negative) n = -n;

    while (n != 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }

    if (negative) reversed = -reversed;
    cout << "Reversed number: " << reversed << endl;
    return 0;
}
