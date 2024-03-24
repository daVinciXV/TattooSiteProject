const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");



function sendEmail() {

  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Message: ${message.value}`;

  Email.send({

    SecureToken: "",//vom pune tokenul 
    Host: "smtp.elasticemail.com", //eu am folosit elasticmail pentru a trimite mailurile
    Username: "",//atasati mailul
    Password: "", //parola generata de ei
    To: 'missicetattoo.studio@gmail.com',
    // From: document.getElementById("email").value,
    From: "missicetattoo.studio@gmail.com", //de unde sa fie trimise
    Subject: "New Booking",
    Body: bodyMessage
  }).then(
    message => {
      if (message == "OK") {
        Swal.fire({
          title: "Nice One!",
          text: "Message sent successfully",
          icon: "success"
        });
      }
    }
  );
}

function checkInputs() {
  const items = document.querySelectorAll(".form-control");
  for (const item of items) {
    if (!item.value) {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      }
      else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }

    })
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address";
    } else {
      errorTxtEmail.innerText = "Email can't be blank";
    }

  }
  else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }

}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();

  if (fullName.value && email.value && message.value) {

    sendEmail();

    form.reset();
    return false;
  }

});
