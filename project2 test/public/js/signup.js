$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form#signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var firstNameInput = $("input#firstName-input");
  var lastNameInput = $("input#lastName-input");
  var dateOfBirthInput = $("input#datePicker-input");
  var heightInput = $("input#height-input");
  var initialWeightInput = $("input#initialWeight-input");
  var goalWeightInput = $("input#goalWeight-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      dateOfBirth: dateOfBirthInput.val(),
      height: heightInput.val().trim(),
      initialWeight: initialWeightInput.val().trim(),
      goalWeight: goalWeightInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      console.log("wrong");
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.firstName, userData.lastName, userData.dateOfBirth, userData.height, userData.initialWeight, userData.goalWeight);
    emailInput.val("");
    passwordInput.val("");
    firstName.val("");
    lastName.val("");
    dateOfBirth.val("");
    height.val("");
    initialWeight.val("");
    goalWeight.val("");
  });

  
  function signUpUser(email, password, firstName, lastName, dateOfBirth, height, initialWeight, goalWeight) {
    $.post("/api/signup", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      height: height,
      initialWeight: initialWeight,
      goalWeight: goalWeight
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
