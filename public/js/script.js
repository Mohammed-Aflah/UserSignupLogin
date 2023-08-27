let check = document.querySelector("#check");
let password = document.querySelector("#pass");
let label = document.querySelector("#passLabel");
let email = document.querySelector("#mail");
let emailLable = document.querySelector("#email");
let errorMsg = document.getElementById("para");
let subBtn = document.querySelector("#sub_btn");
let form = document.querySelector(".form");
const timer = document.querySelector("#sp");
function load(status) {
  console.log('reached');
  if (status) {
    let remainingTime = 600;
    const interval = setInterval(() => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      timer.textContent = formattedTime;

      remainingTime--;

      if (remainingTime < 0) {
        clearInterval(interval);
        timer.textContent = "Time's up!";
      }
    }, 1000); // Update every second
  }
}

check.addEventListener("click", () => {
  // password part
  if (password.value.length > 0) {
    label.classList.add("top");
  } else {
    label.classList.remove("top");
  }

  // Email part

  if (password.type == "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});
password.addEventListener("focus", () => {
  emailLable.classList.add("top");
});
document.querySelector(".home").addEventListener("click", () => {
  if (password.value.length > 0) {
    label.classList.add("top");
  } else {
    label.classList.remove("top");
  }
});