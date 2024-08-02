const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the booking schema
const bookingSchema = new Schema({
  userId: {
    type: Number,
    required: true
     // Assuming there is a User model
  },
  eventId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Event'
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
