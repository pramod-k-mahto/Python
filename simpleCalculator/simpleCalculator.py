num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))

print("\nSelect operation:")
print("1. Addition")
print("2. Subtraction")
print("3. Multiplication")
print("4. Division")
print("5. Exit")

userOperator = int(input("Enter your choice (1-5): "))
value =0
if userOperator == 5:
    print("Exiting the calculator")
elif 1 <= userOperator <= 4:
    if userOperator == 1:
        value = num1 + num2
    elif userOperator == 2:
        value = num1 - num2
    elif userOperator == 3:
        value = num1 * num2
    elif userOperator == 4:
        if num2 != 0:
            value = num1 / num2
        else:
            print("Cannot divide by zero. Please choose a non-zero second number.")
else:
    print("Invalid choice. Please enter a number between 1 and 5.")
    print("Invalid number,  plz enter 1 to 5 number")

if(value>0):
    print(f"Your value is {value}")
if(value<0):
    print("If you want to print  absolute value  press y or for Not absolute value  Type n" )
    suggestion=input("")
    if(suggestion=='y'):
        print(abs(value))
    elif(suggestion=='n'):
        print(value)

    else:
        print("Invalid Input")
