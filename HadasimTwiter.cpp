#include <iostream>
#include <cmath>
using namespace std;

 void createRectangle();
 void createTriangle();
 void printTriangle(int height, int width);

 int main() {
	int userChoice = 0;
	while (userChoice != 3)
	{
		cout << "enter 1 to rectangle" << endl << "enter 2 to triangle" << endl << "to exit enter 3" << endl;
		cin >> userChoice;
		switch (userChoice)
		{
		case 1:
			createRectangle();
			break;
		case 2:
			createTriangle();
			break;
		case 3:
			break;
		default:
			cout << "error, enter again" << endl;
			break;
		}
	}
	return 0;
}

void createRectangle()
{
	int height = 0;
	int width, difference;
	bool flag = true;
	while (flag) {
		cout << "enter height" << endl;
		cin >> height;
		if (height < 2) {
			cout << "Height of a tower must be greater than or equal to 2" << endl;
		}
		else {
			flag = false;
		}
	}

	cout << "enter width" << endl;
	cin >> width;
	difference = abs(height - width);
	if (!difference || difference > 5)
	{
		cout << height * width;
	}
	else
	{
		cout << 2 * height + 2 * width;
	}
}

void createTriangle()
{
	int height = 0;
	int	width, help;
	bool flag = true;
	while (flag) {
		cout << "enter height" << endl;
		cin >> height;
		if (height < 2) {
			cout << "Height of a tower must be greater than or equal to 2" << endl;
		}
		else {
			flag = false;
		}
	}
	cout << "enter width" << endl;
	cin >> width;
	cout << "to print the Calculate the scope of the triangle enter 1" << endl << "to print the triangle enter 2" << endl;
	cin >> help;
	switch (help)
	{
	case 1:
		cout << 2 * height + width << endl;
		break;
	case 2:
		if (!(width % 2) || width > (2 * height))
		{
			cout << "can`t print the triangle" << endl;
			return;
		}
		printTriangle(height, width);
		break;
	default:
		cout << "error" << endl;
		break;
	}
}

void printTriangle(int height, int width)
{
	int widthTemp = width - 2;
	int heightTemp = height - 2;
	int hTemp = heightTemp / widthTemp;
	int counter = 3;
	widthTemp = widthTemp / 2;
	heightTemp %= widthTemp;
	for (int k = 0; k < (width - 1) / 2; k++)
	{
		cout << " ";
	}
	cout << "*" << endl;
	for (int i = 0; i < widthTemp; i++)

	{
		for (int j = 0; j < heightTemp + hTemp; j++)
		{
			for (int k = 0; k < (width - counter) / 2; k++)
			{
				cout << " ";
			}
			for (int k = 0; k < counter; k++)
			{
				cout << "*";
			}
			cout << endl;
		}
		hTemp = 0;
		counter += 2;
	}
	for (int k = 0; k < width; k++)
	{
		cout << "*";
	}
	cout << endl;
}