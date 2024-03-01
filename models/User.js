const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const util = require('util');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save', function( next ){
  var user = this;

  // Only when the password is modified
  if (user.isModified('password')){
    //Encrypt information
    bcrypt.genSalt(saltRounds, function(err, salt){
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      })
    })
  } else {
      next();
  }
})


userSchema.methods.comparePassword = async function(plainPassword) {
  //Encrypt the plain password to compare it to the password in the databass
  try {
    return await bcrypt.compare(plainPassword, this.password);
  } catch (err) {
    throw err;
  }
};



userSchema.methods.generateToken = async function() {
  var user = this;
  user.token = jwt.sign(user._id.toHexString(), 'secretToken');
  try {
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};


userSchema.statics.findByToken = function(token) {
  const user = this;

  return util.promisify(jwt.verify)(token, 'secretToken')
      .then((decoded) => {
          console.log(decoded);
          return user.findOne({
              "_id": decoded,
              "token": token
          });
      })
      .catch((err) => {
          console.log(err);
          throw new Error("유효하지 않은 토큰입니다.");
      });
}



const User = mongoose.model('User', userSchema);

module.exports = {User};
