import mongoose from 'mongoose';

const MarkSchema = mongoose.Schema
({
  name:
  {
    type: String,
    required: 'Enter the name of the mark'
  },
  active:
  {
    type: Boolean,
    default: true
  },
  created:
  {
    type: Date,
    default: Date.now
  }
});

const Mark = mongoose.model('Mark', MarkSchema);
module.exports = Mark;
