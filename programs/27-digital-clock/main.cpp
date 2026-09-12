#include <iostream>
#include <ctime>
#include <thread>
#include <chrono>
using namespace std;

int main() {
    cout << "Digital Clock (Ctrl+C to stop)" << endl;
    for (int i = 0; i < 5; i++) {
        time_t now = time(0);
        tm *ltm = localtime(&now);
        cout << "\r" << (1900 + ltm->tm_year) << "-"
             << (1 + ltm->tm_mon) << "-" << ltm->tm_mday << "  "
             << ltm->tm_hour << ":" << ltm->tm_min << ":" << ltm->tm_sec << "   " << flush;
        this_thread::sleep_for(chrono::seconds(1));
    }
    cout << endl;
    return 0;
}
