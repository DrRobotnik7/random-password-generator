// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

let passwordSize = 0;

let characters = {
  "special": false,
  "numeric": false,
  "lowerCase": false,
  "upperCase": false
}

let allChars = [];

// Function to prompt user for password options
function getPasswordOptions() {
  allChars = [];
  while (passwordSize < 8 || passwordSize > 128 || isNaN(passwordSize)){    
    passwordSize = parseInt(prompt("Choose a number between 8 and 128"));
  }

  if (confirm("Special characters?")){
    characters.special = true;
    allChars = allChars.concat(specialCharacters)
  }
  if (confirm("Numeric?")){
    characters.numeric = true;
    allChars = allChars.concat(numericCharacters)
  }
  if (confirm("Lower case?")){
    characters.lowerCase = true;
    allChars = allChars.concat(lowerCasedCharacters)
  }
  if (allChars.length === 0 || confirm("Upper case?")){
    characters.upperCase = true;
    allChars = allChars.concat(upperCasedCharacters)
  }
  writePassword();
  passwordSize = 0;
}

// Function for getting a random element from an array
function getRandom(arr) {
  let index = Math.floor(Math.random() * (arr.length - 1));
  return arr[index];
}

// Function to generate password with user input
function generatePassword() {
  let passArray = [];
  if (characters.special) {
    passArray.push(getRandom(specialCharacters))
  }
  if (characters.numeric) {
    passArray.push(getRandom(numericCharacters))
  }
  if (characters.lowerCase) {
    passArray.push(getRandom(lowerCasedCharacters))
  }
  if (characters.upperCase) {
    passArray.push(getRandom(upperCasedCharacters))
  }
  while (passArray.length < passwordSize) {
    passArray.push(getRandom(allChars));
  }
  let shuffled = passArray // Taken from stack overflow as a way of shuffling the password
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  return shuffled.join("");
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', getPasswordOptions);