const express = require('express');
const  router = express.Router();
const Event = require("./Model/Event");
const Booking = require("./Model/Booking");

// post/events
router.post('/events', async (req, res) => {
    try {
        const { eventName, date, totalTickets } = req.body;

        if (!eventName || !date || !totalTickets) {
            return res.status(400).send('All fields are required.');
        }
        const newEvent = new Event({ eventName, date, totalTickets });
        const response =  await newEvent.save();
        res.status(200).send("Event is created successfully");

    } catch (error) {
        if (error.code === 11000) { 
            return res.status(400).send('Event is already exist.');
        }
        res.status(500).send('Server error');
    }
});

// post bookings
router.post('/bookings', async (req, res) => {
    try {
        let { userId, eventId, quantity } = req.body;

        // Check if all fields are provided
        if (!userId || !eventId || !quantity) {
            return res.status(400).send('All fields are required.');
        }

        // Find the event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send('Event not found.');
        }

        // Check if there are enough tickets available
        if (event.totalTickets < quantity) {
            return res.status(400).send(`only ${event.totalTickets} tickets are available`);
        }
        if (event.totalTickets == 0) {
            return res.status(400).send("Event is fully booked No tickets are available");
        }

        // Ensure the quantity does not exceed 15 tickets per booking request
        if (quantity > 15) {
            quantity = 15;
            console.log('We can book max 15 tickets in a single request.');
        }


        // Create a new booking
        const newBooking = new Booking({
            userId,
            eventId,
            quantity
        });
        
        // Save the new booking
        const response = await newBooking.save();

        // Decrease the number of available tickets for the event
        event.totalTickets -= quantity;
        await event.save();

        res.status(200).send("booking has been done successfully");

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// cancel a booking by ID #delete/bookings

router.delete("/:id", async(req, res)=>{
    try{
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);
        if(!booking){
            return res.status(500).json({error: "There is no such Booking id exist "});
        }
        const event = await Event.findById(booking.eventId);
        event.totalTickets += booking.quantity;
        await event.save();
        const response = await Booking.findByIdAndDelete(bookingId);

        if(!response){
            return res.status(500).json({error: "There is an error"});
        }
        
        // console.log("Ticket has been cancelled");
        res.send("Booking cancelled");

    }
    catch(error){
        res.status(500).send('Server error');
    }
})

// Get all the events #Get/events

router.get('/events', async(req, res)=>{
    try{
        const data = await Event.find();
        console.log("Data has been fetched");
        res.status(200).json(data);
        
    }
    catch(error){
       res.status(500).json({error: "internal server error"});
    
    }
})

// Get event detail using event ID #Get/events/:id

router.get('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const data = await Event.findById(eventId);

        if (!data) {
            return res.status(404).json({ error: "There is no such event id exist" });
        }

        console.log("Data fetched");
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// Print ticket for specific booking #Post/print-ticket
router.post('/print-ticket', async (req, res) => {
    try {
        const {bookingId}  = req.body;

        if (!bookingId) {
            return res.status(400).send('Booking ID is required.');
        }

        // Fetch booking details
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found." });
        }

        // Fetch event details
        const event = await Event.findById(booking.eventId);
        if (!event) {
            return res.status(404).json({ error: "Event associated with the booking not found." });
        }

        // Generate a printable ticket format (for simplicity, using plain text here)
        const ticketDetails = `
            Ticket Details
            --------------
            User ID: ${booking.userId}
            Event Name: ${event.eventName}
            Event Date: ${event.date.toLocaleString()}
            Quantity: ${booking.quantity}
            Booking Date: ${booking.bookingDate.toLocaleString()}
        `;

        // Send the ticket details as a response (text/plain for simplicity)
        res.setHeader('Content-Type', 'text/plain');
        res.send(ticketDetails);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;