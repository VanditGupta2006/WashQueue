#include <LiquidCrystal.h> // Include the LiquidCrystal library for LCD control

// Global variables for sensor readings and status
int seconds = 0;          // Not used in the current code, but initialized
int current = 0;          // Stores the current sensor's state
int vibration = 0;        // Stores the vibration sensor's state
int temperature = 0;      // Stores the temperature sensor's reading

// Initialize the LCD object with the respective pins
LiquidCrystal lcd_1(12, 11, 5, 4, 3, 2);

void setup()
{
  lcd_1.begin(16, 2); // Set up the LCD with 16 columns and 2 rows
  pinMode(7, INPUT);  // Set pin 7 as input for the current sensor
  pinMode(A0, INPUT); // Set analog pin A0 as input for the temperature sensor
  pinMode(6, INPUT);  // Set pin 6 as input for the vibration sensor

  // Display an initial "Idle" message on the LCD
  lcd_1.print("Idle");
}

void loop()
{
  delay(2000); // Pause for 2 seconds
  lcd_1.clear(); // Clear the LCD for new messages

  // Read sensor values
  current = digitalRead(7); // Read the current sensor state (0 or 1)
  temperature = (-40 + 0.488155 * (analogRead(A0) - 20)); // Calculate temperature
  vibration = digitalRead(6); // Read the vibration sensor state (0 or 1)

  if (current == 0) { // If the current sensor indicates no activity
    lcd_1.setCursor(0, 0); // Set cursor to the first row, first column
    lcd_1.print("Idle"); // Display "Idle" on the LCD
  } else { // If the current sensor indicates activity
    if (temperature > 35 && vibration > 0) { // High temperature and vibration detected
      lcd_1.setCursor(0, 0); // Set cursor to the first row, first column
      lcd_1.print("Drying"); // Display "Drying" on the LCD
    } else {
      if (vibration > 0) { // Vibration detected but temperature is not high
        lcd_1.clear(); // Clear the LCD
        lcd_1.print("Washing"); // Display "Washing" on the LCD
      }
    }
  }
}
