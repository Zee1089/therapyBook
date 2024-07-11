const mongoose = require('mongoose');

const triggerSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  // // people: {
  // //   type: Boolean,
  // //   required: true,
  // // },

  // reaction: {
  //   type: String,
  //   required: true, 
  // },

  // rectification: {
  //   type: String,
  //   required: true,

  // },
  // notes: {
  //   type: String,
  // },

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
});

const User = mongoose.model('User', userSchema);

module.exports = User;