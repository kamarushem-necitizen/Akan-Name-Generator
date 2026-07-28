// Get the form and HTML elements using their id names
const form = document.getElementById("akan-name-form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const genderInput = document.getElementById("gender");
const resultMessage = document.getElementById("result-message");

// Akan names: Sunday is position 0 and Saturday is position 6
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

// Run this code when the form is submitted
form.addEventListener("submit", function (event) {
  // Stop the page from refreshing
  event.preventDefault();

  // Get values entered by the user
  const day = Number(dayInput.value);
  let month = Number(monthInput.value);
  let year = Number(yearInput.value);
  const gender = genderInput.value;

  // Validate gender
  if (gender === "") {
    alert("Please select your gender.");
    return;
  }

  // Validate day and month
  if (day < 1 || day > 31) {
    alert("Please enter a valid day between 1 and 31.");
    return;
  }

  if (month < 1 || month > 12) {
    alert("Please enter a valid month between 1 and 12.");
    return;
  }

  // Check for impossible dates, such as 31 February
  const checkDate = new Date(year, month - 1, day);

  if (
    checkDate.getFullYear() !== year ||
    checkDate.getMonth() !== month - 1 ||
    checkDate.getDate() !== day
  ) {
    alert("Please enter a valid calendar date.");
    return;
  }

  // January and February become months 13 and 14
  // of the previous year for the Akan day formula
  if (month === 1 || month === 2) {
    month += 12;
    year -= 1;
  }

  // Get century and last two digits of the year
  const CC = Math.floor(year / 100);
  const YY = year % 100;

  // Calculate the day of the week using the required formula
  let dayOfWeek =
    Math.floor(CC / 4) -
    2 * CC -
    1 +
    Math.floor((5 * YY) / 4) +
    Math.floor((26 * (month + 1)) / 10) +
    day;

  // Keep the result between 0 and 6
  dayOfWeek = ((dayOfWeek % 7) + 7) % 7;

  // Select the correct Akan name
  let akanName;

  if (gender === "male") {
    akanName = maleNames[dayOfWeek];
  } else {
    akanName = femaleNames[dayOfWeek];
  }

  // Show the name on the webpage
  resultMessage.textContent = `Your Akan name is ${akanName}.`;

  // Clear the form fields after showing the result
  form.reset();
});

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const output = document.getElementById("output");

output.innerHTML = `
  <h2>🎉 Congratulations, ${akanName}!</h2>
  <p>You were born on <strong>${days[dayIndex]}</strong>.</p>
  <p>
    Based on your birth day and gender, your traditional Akan name is
    <strong>${akanName}</strong>.
  </p>
  <p>Thank you for using the Akan Name Generator.</p>
`;