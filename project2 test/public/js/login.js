$(document).ready(function() {
  
  var loginForm = $("form#login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var currentWeightInput = $("input#currentWeightLogin-input")

  
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      
    };
      console.log("userData.email********");
      console.log(userData.email);
    if (!userData.email || !userData.password) {
      return;
    }
    
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

});
