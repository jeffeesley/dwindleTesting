// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    
    res.json("/members");
  
  });
  //Route to create users
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      height: req.body.height,
      initialWeight: req.body.initialWeight,
      goalWeight: req.body.goalWeight
    }).then(function(data) {
      console.log('===== db enter ======')
      console.log(data)
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log('ERROR+++++++')
      console.log(err)
      res.status(422).json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        dateOfBirth: req.user.dateOfBirth,
        height: req.user.height,
        initialWeight: req.user.initialWeight,
        goalWeight: req.user.goalWeight
      });
    }
  });

};
