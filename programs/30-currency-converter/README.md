# 30. Currency Converter

**Difficulty:** Beginner
**Concepts:** Functions, Maps

## Description
Convert an amount from one currency to another using fixed exchange rates.

## Code
```cpp
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
```

## Expected Output
```
From currency (USD/INR/EUR/GBP): INR
To currency (USD/INR/EUR/GBP): USD
Amount: 1000
1000 INR = 12 USD
```

## Explanation
Every currency is first converted to a common base (USD), then from USD to the target currency, avoiding the need for a rate between every possible pair.
