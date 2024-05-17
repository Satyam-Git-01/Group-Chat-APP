const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

const loginSubmitButton = document.getElementById("loginBtn");
signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};

const handleLogin = async (event) => {
  try {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const loginDetails = {
      email,
      password,
    };
    const result = await axios.post(
      "http://localhost:4800/user/login",
      loginDetails
    );
    localStorage.setItem("token", result.data.token);
    window.location.href='/homePage'
  } catch (err) {
    console.log(err);
  }
};

loginSubmitButton.addEventListener("click", handleLogin);
