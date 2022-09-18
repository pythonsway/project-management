const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 500,
  },
  status: {
    type: String,
    ennum: ['NEW', 'PROGRESS', 'COMPLETED'],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);