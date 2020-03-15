import mongoose from 'mongoose';

const SessionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String
  },
  ip: {
    type: String
  },
  agent: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;
