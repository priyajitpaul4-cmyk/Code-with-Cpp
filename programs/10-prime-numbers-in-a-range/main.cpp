#include <iostream>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

int main() {
    int low, high;
    cout << "Enter range (low high): ";
    cin >> low >> high;

    cout << "Prime numbers: ";
    for (int i = low; i <= high; i++) {
        if (isPrime(i)) cout << i << " ";
    }
    cout << endl;
    return 0;
}
