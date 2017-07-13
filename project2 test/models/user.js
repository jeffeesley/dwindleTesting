// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    initialWeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    goalWeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    classMethods: {
      associate: function(models){
        User.hasMany(models.Stats, {
          onDelete: "cascade"
        });
      }
    }
  }




  {
   
    hooks: {
      beforeCreate: function(user, options, cb) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      }
    }
  });

  
  User.prototype.validPassword = function(password){
    console.log('calling validPassword')
    return bcrypt.compareSync(password, this.password)
  }
  return User;

};

