const passwordOutput = document.getElementById("password");
const GeneratePasswordBtn = document.getElementById("btn");
const copyBtn = document.querySelector(".copy i");
const alertBox = document.querySelector(".alert");

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
  alertBox.innerHTML = `${password} <br> Copied!`;

  setTimeout(() => {
    passwordOutput.value = "";
    password = "";
  }, 3000);
}

function copyPassword(e) {
  if (e.isTrusted && passwordOutput.value !== "") {
    let copiedText = passwordOutput;
    copiedText.select();
    copiedText.setSelectionRange(0, 9999);
    document.execCommand("copy");
    alertBox.classList.add("active");

    setTimeout(() => {
      alertBox.classList.remove("active");
    }, 3000);
  }
}

GeneratePasswordBtn.addEventListener("click", GeneratePassword);
copyBtn.addEventListener("click", copyPassword);
