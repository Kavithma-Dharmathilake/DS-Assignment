const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Validate contact number format with country code and plus mark
        return /^\+\d{1,3}\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid contact number with country code`
    }
  },
  address:{
    type: String,
    required: false
  }
});

// Static signup method
userSchema.statics.signup = async function(email, password, role, contact, address) {
  // Validations
  if (!email || !password || !role || !contact) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }
  if(!validator.isMobilePhone(contact)) {
    throw Error('Invalid mobile number');
  }

  //Implement userID sequence
  const lastUser = await this.findOne({}, {}, { sort: { 'userId': -1 } });
  let userId;
  if (lastUser) {
    const lastUserId = parseInt(lastUser.userId.substr(1));
    userId = 'U' + (lastUserId + 1).toString().padStart(3, '0');
  } else {
    userId = 'U001';
  }

  //Validation for existing emails
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ userId, email, password: hash, role, contact, address });

  return user;
};

// Static login method
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
