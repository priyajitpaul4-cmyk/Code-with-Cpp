#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    int choice;
    cout << "1. Add Note 2. View Notes\nChoice: ";
    cin >> choice;

    if (choice == 1) {
        ofstream file("notes.txt", ios::app);
        cin.ignore();
        string note;
        cout << "Enter note: ";
        getline(cin, note);
        file << note << endl;
        file.close();
        cout << "Note saved!" << endl;
    } else if (choice == 2) {
        ifstream file("notes.txt");
        string line;
        int i = 1;
        if (!file) { cout << "No notes found." << endl; return 0; }
        while (getline(file, line)) {
            cout << i++ << ". " << line << endl;
        }
        file.close();
    }
    return 0;
}
