// Get the form and HTML elements using their id names
const form = document.getElementById("akan-name-form");
const birthdateInput = document.getElementById("birthdate");
const genderInput = document.getElementById("gender");
const resultMessage = document.getElementById("result-message");

// Akan names in the order of the days of the week
// Index 0 = Sunday, index 1 = Monday, up to index 6 = Saturday
const maleNames = [
  "Kwasi",
  "Kwadwo",
  "Kwabena",
  "Kwaku",
  "Yaw",
  "Kofi",
  "Kwame"
];

const femaleNames = [
  "Akosua",
  "Adwoa",
  "Abenaa",
  "Akua",
  "Yaa",
  "Afua",
  "Ama"
];

// This runs when the user submits the form
form.addEventListener("submit", function (event) {
  // Stops the page from refreshing
  event.preventDefault();

  // Get the date and gender values from the form
  const birthdate = birthdateInput.value;
  const gender = genderInput.value;

  // Check that the user entered both a date and gender
  if (birthdate === "" || gender === "") {
    alert("Please enter your date of birth and select your gender.");
    return;
  }

  // A date input returns a date in this format: YYYY-MM-DD
  // Example: 2000-05-12
  const dateParts = birthdate.split("-");

  // Convert the date parts from text to numbers
  let year = Number(dateParts[0]);
  let month = Number(dateParts[1]);
  const day = Number(dateParts[2]);

  // Validate the day and month ranges
  if (day < 1 || day > 31 || month < 1 || month > 12) {
    alert("Please enter a valid day and month.");
    return;
  }

  // Check for impossible dates, for example 31 February
  const checkDate = new Date(year, month - 1, day);

  if (
    checkDate.getFullYear() !== year ||
    checkDate.getMonth() !== month - 1 ||
    checkDate.getDate() !== day
  ) {
    alert("Please enter a valid date.");
    return;
  }

  /*
    The Akan day formula works with March as month 3 through December as month 12.

    January and February are treated as months 13 and 14
    of the previous year.
  */
  if (month === 1 || month === 2) {
    month += 12;
    year -= 1;
  }

  // CC is the first two digits of the year
  // Example: 1989 becomes 19
  const CC = Math.floor(year / 100);

  // YY is the last two digits of the year
  // Example: 1989 becomes 89
  const YY = year % 100;

  /*
    Calculate the day of the week using the formula:

    d = ((CC / 4 - 2 * CC - 1) + (5 * YY / 4)
        + (26 * (MM + 1) / 10) + DD) % 7

    Math.floor removes decimal values from each division.
  */
  let dayOfWeek =
    Math.floor(CC / 4) -
    2 * CC -
    1 +
    Math.floor((5 * YY) / 4) +
    Math.floor((26 * (month + 1)) / 10) +
    day;

  // Ensure the result is always between 0 and 6
  dayOfWeek = ((dayOfWeek % 7) + 7) % 7;

  // Find the correct Akan name using the gender selected
  let akanName;

  if (gender === "male") {
    akanName = maleNames[dayOfWeek];
  } else {
    akanName = femaleNames[dayOfWeek];
  }

  // Display the result inside <p id="result-message">
  resultMessage.textContent = `Your Akan name is ${akanName}.`;

  // Clear the date and gender fields after displaying the result
  form.reset();
});
