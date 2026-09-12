#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, double> rateToUSD = {
        {"USD", 1.0}, {"INR", 0.012}, {"EUR", 1.09}, {"GBP", 1.27}
    };

    string from, to;
    double amount;

    cout << "From currency (USD/INR/EUR/GBP): "; cin >> from;
    cout << "To currency (USD/INR/EUR/GBP): "; cin >> to;
    cout << "Amount: "; cin >> amount;

    if (rateToUSD.count(from) && rateToUSD.count(to)) {
        double usd = amount * rateToUSD[from];
        double result = usd / rateToUSD[to];
        cout << amount << " " << from << " = " << result << " " << to << endl;
    } else {
        cout << "Unsupported currency." << endl;
    }
    return 0;
}
