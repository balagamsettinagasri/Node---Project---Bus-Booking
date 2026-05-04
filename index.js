const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

app.use(express.json());

// Mock Data: 10 seats initially available
let busSeats = Array.from({ length: 10 }, (_, i) => ({
    seatNumber: i + 1,
    isBooked: false,
    passengerName: null,
    ticketId: null
}));

// Route: Get all seats
app.get('/seats', (req, res) => {
    res.status(200).json(busSeats);
});

// Route: Book a seat
app.post('/book', (req, res) => {
    const { seatNumber, passengerName } = req.body;

    const seat = busSeats.find(s => s.seatNumber === parseInt(seatNumber));

    if (!seat) {
        return res.status(400).json({ message: "Invalid seat number." });
    }

    if (seat.isBooked) {
        return res.status(400).json({ message: "Seat already booked." });
    }

    // Update seat status
    seat.isBooked = true;
    seat.passengerName = passengerName;
    seat.ticketId = uuidv4();

    res.status(201).json({
        message: "Booking successful!",
        details: seat
    });
});

app.listen(PORT, () => {
    console.log(`Bus Booking Server running on http://localhost:${PORT}`);
});
