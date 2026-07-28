 const form = document.getElementById("akan-name-form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const genderInput = document.getElementById("gender");
const resultMessage = document.getElementById("result-message");

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

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const day = Number(dayInput.value);
  let month = Number(monthInput.value);
  let year = Number(yearInput.value);
  const gender = genderInput.value;

  if (gender === "") {
    alert("Please select your gender.");
    return;
  }

  const checkDate = new Date(year, month - 1, day);

  if (
    checkDate.getFullYear() !== year ||
    checkDate.getMonth() !== month - 1 ||
    checkDate.getDate() !== day
  ) {
    alert("Please enter a valid calendar date.");
    return;
  }

  if (month === 1 || month === 2) {
    month += 12;
    year -= 1;
  }

  const CC = Math.floor(year / 100);
  const YY = year % 100;

  let dayOfWeek =
    Math.floor(CC / 4) -
    2 * CC -
    1 +
    Math.floor((5 * YY) / 4) +
    Math.floor((26 * (month + 1)) / 10) +
    day;

  dayOfWeek = ((dayOfWeek % 7) + 7) % 7;

  const akanName =
    gender === "male" ? maleNames[dayOfWeek] : femaleNames[dayOfWeek];

  resultMessage.innerHTML = `
    <h2>🎉 Congratulations, ${akanName}!</h2>
    <p>You were born on <strong>${days[dayOfWeek]}</strong>.</p>
    <p>
      Based on your birth day and gender, your traditional Akan name is
      <strong>${akanName}</strong>.
    </p>
    <p>Thank you for using the Akan Name Generator.</p>
  `;

  form.reset();
});