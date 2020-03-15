import mongoose from 'mongoose';

const CarSchema = mongoose.Schema
({
  modele:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modele',
    required: true
  },
  chassis:
  {
    type: String,
    required: 'Enter a chassis'
  },
  immatriculation:
  {
    type: String,
    required: 'Enter an immatriculation'
  },
  circulation:
  {
    type: String,
    required: 'Enter a circulation'
  },
  moteur:
  {
    type: String,
    required: 'Enter a moteur'
  },
  couleur:
  {
    type: String,
    required: 'Enter a moteur'
  },
  mark:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mark',
    required: true
  },
  user:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});
const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
