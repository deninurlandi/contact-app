const mongoose = require('mongoose');

// membuat Schema
const Contact = mongoose.model('kelolaKadit', {
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  nohp: {
    type: String,
    required: true,
  },
});

module.exports = Contact;
