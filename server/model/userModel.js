import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = mongoose.Schema
({
  name:
  {
    type: String,
    required: 'Enter a name'
  },
  email: {
    type: String,
    required: 'Enter a E-mail',
    unique: true,
    dropDups: true
  },
  username: {
    type: String,
  },
  phone: {
    type: Number
  },
  adress: {
    type: String,
    required: 'Enter a adress',
  },
  hashPassword: {
    type: String,
    default: 'client'
  },
  company: {
    type: String
  },
  picture: {
    type: String,
    default: 'https://via.placeholder.com/150.png'
  },
  active: {
    type: Boolean,
    default: false
  },
  typeUser: {
    type: String,
    default: 'client'
  },
  solde: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

UserSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
