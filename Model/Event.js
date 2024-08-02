const mongoose = require('mongoose');

// Define the schema
const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  totalTickets: {
    type: Number,
    required: true,
    min: 0
  }
});

// Create the model from the schema
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
