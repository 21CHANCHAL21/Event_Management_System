const express = require('express');
const mongoose = require('mongoose');
const app = express();

require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const ticketRoutes = require("./ticketRoute");
app.use('/', ticketRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


