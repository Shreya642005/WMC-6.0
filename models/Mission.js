const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  missionTitle: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: false
  },
  place: {
    type: String,
    required: true,
    trim: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  image: {
    type: String, // Store image path/URL
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
missionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Mission', missionSchema);