// Encrypt Rail Fence
function encryptRailFence() {
    let text = document.getElementById('plaintext').value;
    let numRails = parseInt(document.getElementById('rails').value);
    if (numRails < 2) numRails = 2;

    let rail = new Array(numRails).fill('').map(() => []);
    let dirDown = false, row = 0;

    for (let char of text) {
        rail[row].push(char);
        if (row === 0 || row === numRails - 1) dirDown = !dirDown;
        row += dirDown ? 1 : -1;
    }

    let result = rail.flat().join('');
    document.getElementById('encrypted').textContent = result;
}

// Decrypt Rail Fence
function decryptRailFence() {
    let cipher = document.getElementById('encrypted').textContent;
    let numRails = parseInt(document.getElementById('rails').value);
    if (numRails < 2) numRails = 2;

    let n = cipher.length;
    let rail = new Array(numRails).fill(0).map(() => new Array(n).fill('\n'));

    let dirDown = null, row = 0;

    // mark positions
    for (let i = 0; i < n; i++) {
        if (row === 0) dirDown = true;
        if (row === numRails - 1) dirDown = false;

        rail[row][i] = '*';
        row += dirDown ? 1 : -1;
    }

    // fill letters
    let index = 0;
    for (let i = 0; i < numRails; i++) {
        for (let j = 0; j < n; j++) {
            if (rail[i][j] === '*' && index < n) {
                rail[i][j] = cipher[index++];
            }
        }
    }

    // read the matrix
    let result = '';
    row = 0;
    for (let i = 0; i < n; i++) {
        if (row === 0) dirDown = true;
        if (row === numRails - 1) dirDown = false;

        result += rail[row][i];
        row += dirDown ? 1 : -1;
    }

    document.getElementById('decrypted').textContent = result;
}

// Code examples
const codeSamples = {
    python: `def encrypt_rail_fence(text, key):
    # Create the rail matrix
    rail = [['\n' for _ in range(len(text))] for _ in range(key)]
    
    dir_down = False
    row, col = 0, 0

    for char in text:
        if row == 0 or row == key - 1:
            dir_down = not dir_down

        rail[row][col] = char
        col += 1

        row += 1 if dir_down else -1

    # Construct the result by reading row-wise
    result = ""
    for r in range(key):
        for c in range(len(text)):
            if rail[r][c] != '\n':
                result += rail[r][c]

    return result


def decrypt_rail_fence(cipher, key):
    # Create the rail matrix
    rail = [['\n' for _ in range(len(cipher))] for _ in range(key)]
    
    # Mark the zigzag pattern
    dir_down = True
    row, col = 0, 0
    for i in range(len(cipher)):
        if row == 0:
            dir_down = True
        if row == key - 1:
            dir_down = False

        rail[row][col] = '*'
        col += 1
        row += 1 if dir_down else -1

    # Fill letters row-wise
    index = 0
    for r in range(key):
        for c in range(len(cipher)):
            if rail[r][c] == '*' and index < len(cipher):
                rail[r][c] = cipher[index]
                index += 1

    # Read the zigzag pattern
    result = ""
    row, col = 0, 0
    for i in range(len(cipher)):
        if row == 0:
            dir_down = True
        if row == key - 1:
            dir_down = False

        if rail[row][col] != '*':
            result += rail[row][col]
            col += 1

        row += 1 if dir_down else -1

    return result


def main():
    while True:
        print("\nRail Fence Cipher Tool")
        print("1. Encrypt Text")
        print("2. Decrypt Text")
        print("3. Exit")
        choice = input("Choose an option: ")

        if choice == "3":
            break
        elif choice not in ("1", "2"):
            print("Invalid option. Try again.")
            continue

        text = input("Enter the text: ")
        while True:
            try:
                key = int(input("Enter number of rails (>=2): "))
                if key >= 2:
                    break
                else:
                    print("Number of rails must be at least 2.")
            except ValueError:
                print("Please enter a valid number.")

        if choice == "1":
            encrypted = encrypt_rail_fence(text, key)
            print("\nEncrypted Text:", encrypted)
        elif choice == "2":
            decrypted = decrypt_rail_fence(text, key)
            print("\nDecrypted Text:", decrypted)

    print("Exiting Rail Fence Cipher Tool. Goodbye!")


if __name__ == "__main__":
    main()
`,

    c: `#include <stdio.h>
#include <string.h>

void encryptRailFence(char* text, int key, char* result) {
    int n = strlen(text);
    char rail[key][n];
    
    // Initialize rail
    for (int i = 0; i < key; i++)
        for (int j = 0; j < n; j++)
            rail[i][j] = '\n';

    int dirDown = 0;
    int row = 0;
    
    for (int col = 0; col < n; col++) {
        rail[row][col] = text[col];
        if (row == 0 || row == key - 1) dirDown = !dirDown;
        row += dirDown ? 1 : -1;
    }

    int index = 0;
    for (int i = 0; i < key; i++)
        for (int j = 0; j < n; j++)
            if (rail[i][j] != '\n')
                result[index++] = rail[i][j];

    result[index] = '\0';
}

void decryptRailFence(char* cipher, int key, char* result) {
    int n = strlen(cipher);
    char rail[key][n];

    // Initialize
    for (int i = 0; i < key; i++)
        for (int j = 0; j < n; j++)
            rail[i][j] = '\n';

    // Mark positions
    int dirDown = 0;
    int row = 0;
    for (int col = 0; col < n; col++) {
        rail[row][col] = '*';
        if (row == 0) dirDown = 1;
        else if (row == key - 1) dirDown = 0;
        row += dirDown ? 1 : -1;
    }

    // Fill letters
    int index = 0;
    for (int i = 0; i < key; i++)
        for (int j = 0; j < n; j++)
            if (rail[i][j] == '*' && index < n)
                rail[i][j] = cipher[index++];

    // Read zigzag
    row = 0;
    dirDown = 0;
    index = 0;
    for (int col = 0; col < n; col++) {
        result[index++] = rail[row][col];
        if (row == 0) dirDown = 1;
        else if (row == key - 1) dirDown = 0;
        row += dirDown ? 1 : -1;
    }

    result[index] = '\0';
}

int main() {
    char text[1000], result[1000];
    int key;
    int choice;

    while (1) {
        printf("\nRail Fence Cipher Tool\n");
        printf("1. Encrypt Text\n2. Decrypt Text\n3. Exit\nChoose an option: ");
        scanf("%d", &choice);
        getchar(); // consume newline

        if (choice == 3) break;
        if (choice != 1 && choice != 2) {
            printf("Invalid option. Try again.\n");
            continue;
        }

        printf("Enter the text: ");
        fgets(text, sizeof(text), stdin);
        text[strcspn(text, "\n")] = 0; // remove newline

        do {
            printf("Enter number of rails (>=2): ");
            scanf("%d", &key);
            getchar();
        } while (key < 2);

        if (choice == 1) {
            encryptRailFence(text, key, result);
            printf("Encrypted Text: %s\n", result);
        } else if (choice == 2) {
            decryptRailFence(text, key, result);
            printf("Decrypted Text: %s\n", result);
        }
    }

    printf("Exiting Rail Fence Cipher Tool. Goodbye!\n");
    return 0;
}`,

    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

string encryptRailFence(string text, int key) {
    int n = text.length();
    vector<vector<char>> rail(key, vector<char>(n, '\n'));
    bool dirDown = false;
    int row = 0;

    for (int col = 0; col < n; col++) {
        rail[row][col] = text[col];
        if (row == 0 || row == key - 1) dirDown = !dirDown;
        row += dirDown ? 1 : -1;
    }

    string result = "";
    for (int i = 0; i < key; i++)
        for (int j = 0; j < n; j++)
            if (rail[i][j] != '\n') result += rail[i][j];

    return result;
}

string decryptRailFence(string cipher, int key) {
    int n = cipher.length();
    vector<vector<char>> rail(key, vector<char>(n, '\n'));

    // Mark positions
    bool dirDown;
    int row = 0;
    for (int col = 0; col < n; col++) {
        rail[row][col] = '*';
        if (row == 0) dirDown = true;
        else if (row == key - 1) dirDown = false;
        row += dirDown ? 1 : -1;
    }

    // Fill letters
    int index = 0;
    for (int i = 0; i < key; i++)
        for (int j = 0; j < n; j++)
            if (rail[i][j] == '*' && index < n)
                rail[i][j] = cipher[index++];

    // Read zigzag
    string result = "";
    row = 0;
    for (int col = 0; col < n; col++) {
        result += rail[row][col];
        if (row == 0) dirDown = true;
        else if (row == key - 1) dirDown = false;
        row += dirDown ? 1 : -1;
    }

    return result;
}

int main() {
    string text, result;
    int key, choice;

    while (true) {
        cout << "\nRail Fence Cipher Tool\n";
        cout << "1. Encrypt Text\n2. Decrypt Text\n3. Exit\nChoose an option: ";
        cin >> choice;
        cin.ignore(); // consume newline

        if (choice == 3) break;
        if (choice != 1 && choice != 2) {
            cout << "Invalid option. Try again.\n";
            continue;
        }

        cout << "Enter the text: ";
        getline(cin, text);

        do {
            cout << "Enter number of rails (>=2): ";
            cin >> key;
            cin.ignore();
        } while (key < 2);

        if (choice == 1) {
            result = encryptRailFence(text, key);
            cout << "Encrypted Text: " << result << endl;
        } else if (choice == 2) {
            result = decryptRailFence(text, key);
            cout << "Decrypted Text: " << result << endl;
        }
    }

    cout << "Exiting Rail Fence Cipher Tool. Goodbye!\n";
    return 0;
}
`,

    java: `import java.util.Scanner;

public class RailFenceCipher {

    // Encrypt function
    public static String encryptRailFence(String text, int key) {
        char[][] rail = new char[key][text.length()];

        // Initialize rail with newline characters
        for (int i = 0; i < key; i++)
            for (int j = 0; j < text.length(); j++)
                rail[i][j] = '\n';

        boolean dirDown = false;
        int row = 0, col = 0;

        for (int i = 0; i < text.length(); i++) {
            if (row == 0 || row == key - 1)
                dirDown = !dirDown;

            rail[row][col++] = text.charAt(i);
            row += dirDown ? 1 : -1;
        }

        // Read row-wise to get cipher text
        StringBuilder result = new StringBuilder();
        for (int r = 0; r < key; r++)
            for (int c = 0; c < text.length(); c++)
                if (rail[r][c] != '\n')
                    result.append(rail[r][c]);

        return result.toString();
    }

    // Decrypt function
    public static String decryptRailFence(String cipher, int key) {
        char[][] rail = new char[key][cipher.length()];

        // Initialize rail with newline
        for (int i = 0; i < key; i++)
            for (int j = 0; j < cipher.length(); j++)
                rail[i][j] = '\n';

        boolean dirDown = true;
        int row = 0, col = 0;

        // Mark zigzag positions
        for (int i = 0; i < cipher.length(); i++) {
            if (row == 0) dirDown = true;
            if (row == key - 1) dirDown = false;

            rail[row][col++] = '*';
            row += dirDown ? 1 : -1;
        }

        // Fill letters row-wise
        int index = 0;
        for (int r = 0; r < key; r++)
            for (int c = 0; c < cipher.length(); c++)
                if (rail[r][c] == '*' && index < cipher.length())
                    rail[r][c] = cipher.charAt(index++);

        // Read zigzag to reconstruct plaintext
        StringBuilder result = new StringBuilder();
        row = 0; col = 0;
        for (int i = 0; i < cipher.length(); i++) {
            if (row == 0) dirDown = true;
            if (row == key - 1) dirDown = false;

            if (rail[row][col] != '*')
                result.append(rail[row][col++]);

            row += dirDown ? 1 : -1;
        }

        return result.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\nRail Fence Cipher Tool");
            System.out.println("1. Encrypt Text");
            System.out.println("2. Decrypt Text");
            System.out.println("3. Exit");
            System.out.print("Choose an option: ");
            String choice = sc.nextLine();

            if (choice.equals("3")) break;
            if (!choice.equals("1") && !choice.equals("2")) {
                System.out.println("Invalid option. Try again.");
                continue;
            }

            System.out.print("Enter the text: ");
            String text = sc.nextLine();

            int key = 0;
            while (true) {
                System.out.print("Enter number of rails (>=2): ");
                try {
                    key = Integer.parseInt(sc.nextLine());
                    if (key >= 2) break;
                    else System.out.println("Number of rails must be at least 2.");
                } catch (NumberFormatException e) {
                    System.out.println("Please enter a valid number.");
                }
            }

            if (choice.equals("1")) {
                String encrypted = encryptRailFence(text, key);
                System.out.println("\nEncrypted Text: " + encrypted);
            } else if (choice.equals("2")) {
                String decrypted = decryptRailFence(text, key);
                System.out.println("\nDecrypted Text: " + decrypted);
            }
        }

        System.out.println("Exiting Rail Fence Cipher Tool. Goodbye!");
        sc.close();
    }
}
`
};

function showCode() {
    const lang = document.getElementById('language').value;
    document.getElementById('codeDisplay').textContent = codeSamples[lang];
}

// Show default code on load
showCode();
