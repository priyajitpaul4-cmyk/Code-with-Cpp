#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Item { string name; int quantity; double price; };

int main() {
    vector<Item> inventory;
    int choice;

    do {
        cout << "\n1. Add Item 2. Sell Item 3. View Inventory 4. Exit\nChoice: ";
        cin >> choice;

        if (choice == 1) {
            Item it;
            cout << "Name: "; cin >> it.name;
            cout << "Quantity: "; cin >> it.quantity;
            cout << "Price: "; cin >> it.price;
            inventory.push_back(it);
        } else if (choice == 2) {
            string name; int qty;
            cout << "Item name: "; cin >> name;
            cout << "Quantity sold: "; cin >> qty;
            bool found = false;
            for (auto &it : inventory) {
                if (it.name == name) {
                    found = true;
                    if (qty > it.quantity) cout << "Not enough stock!\n";
                    else it.quantity -= qty;
                }
            }
            if (!found) cout << "Item not found.\n";
        } else if (choice == 3) {
            for (auto &it : inventory) {
                cout << it.name << " | Qty: " << it.quantity << " | Price: " << it.price;
                if (it.quantity < 5) cout << "  [LOW STOCK]";
                cout << endl;
            }
        }
    } while (choice != 4);

    return 0;
}
