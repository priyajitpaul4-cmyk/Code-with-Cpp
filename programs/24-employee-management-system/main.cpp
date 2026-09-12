#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
using namespace std;

struct Employee { string name; double basicSalary; };

double calculateNetSalary(double basic) {
    double hra = basic * 0.20;
    double tax = basic * 0.10;
    return basic + hra - tax;
}

int main() {
    vector<Employee> employees;
    int n;
    cout << "Number of employees: ";
    cin >> n;

    for (int i = 0; i < n; i++) {
        Employee e;
        cout << "Name: "; cin >> e.name;
        cout << "Basic salary: "; cin >> e.basicSalary;
        employees.push_back(e);
    }

    cout << fixed << setprecision(2);
    for (auto &e : employees) {
        cout << e.name << " -> Net Salary: " << calculateNetSalary(e.basicSalary) << endl;
    }
    return 0;
}
