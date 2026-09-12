#include <iostream>
using namespace std;

char board[3][3] = {{'1','2','3'}, {'4','5','6'}, {'7','8','9'}};

void printBoard() {
    for (int i = 0; i < 3; i++) {
        cout << " " << board[i][0] << " | " << board[i][1] << " | " << board[i][2] << endl;
        if (i < 2) cout << "---|---|---" << endl;
    }
}

bool checkWin(char player) {
    for (int i = 0; i < 3; i++)
        if ((board[i][0] == player && board[i][1] == player && board[i][2] == player) ||
            (board[0][i] == player && board[1][i] == player && board[2][i] == player))
            return true;
    if (board[0][0] == player && board[1][1] == player && board[2][2] == player) return true;
    if (board[0][2] == player && board[1][1] == player && board[2][0] == player) return true;
    return false;
}

int main() {
    char currentPlayer = 'X';
    int move;

    for (int turn = 0; turn < 9; turn++) {
        printBoard();
        cout << "Player " << currentPlayer << ", enter cell (1-9): ";
        cin >> move;
        int row = (move - 1) / 3, col = (move - 1) % 3;

        if (move < 1 || move > 9 || board[row][col] == 'X' || board[row][col] == 'O') {
            cout << "Invalid move, try again." << endl;
            turn--;
            continue;
        }

        board[row][col] = currentPlayer;
        if (checkWin(currentPlayer)) {
            printBoard();
            cout << "Player " << currentPlayer << " wins!" << endl;
            return 0;
        }
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    }

    printBoard();
    cout << "It's a draw!" << endl;
    return 0;
}
