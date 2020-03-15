import mongoose from 'mongoose';

const ModeleSchema = mongoose.Schema
({
  name:
  {
    type: String,
    required: 'Enter the Name of the modele'
  },
  mark:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mark',
    required: true
  },
  active:
  {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Modele = mongoose.model('Modele', ModeleSchema);
module.exports = Modele;
