const passwordOutput = document.getElementById("password");
const GeneratePasswordBtn = document.getElementById("btn");

function GeneratePassword(e) {
  let characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+?><:{}[]";
  let password = "";
  let passwordLength = 16;

  for (let i = 0; i < passwordLength; i++) {
    let randomNum = Math.floor(Math.random() * characters.length);
    password += characters.substring(randomNum, randomNum + 1);
  }

  passwordOutput.value = password;

  setTimeout(() => {
    passwordOutput.value = "";
  }, 5000);
}

GeneratePasswordBtn.addEventListener("click", GeneratePassword);
