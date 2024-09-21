const mongoose = require('mongoose');

// Define the schema for Human
const humanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  meeting: {
    type: String,  // How/where did you meet
    required: true,
  },
  relationship: {
    type: String,
    enum: ['parent', 'sibling', 'acquaintance', 'friend', 'college_friend'],  // Add more if needed
    required: true,
  },
  status: {
    type: String,
    enum: ['ongoing', 'past'],
    required: true,
  },
  characteristics: {
    type: String,
  },
  pros: {
    type: String,
  },
  cons: {
    type: String,
  }
});

const triggerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  reaction: {
    type: String,
    required: true, 
  },

  rectification: {
    type: String,
    required: true,

  },
  notes: {
    type: String,
  },

  status : {
    type: String,
    enum: ['succeded', 'recovered', 'working on it', 'overcomed', 'be careful next time']

  }, 

});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
triggers: [triggerSchema],
humans: [humanSchema], 
});

const User = mongoose.model('User', userSchema);

module.exports = User;