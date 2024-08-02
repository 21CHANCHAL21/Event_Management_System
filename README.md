# Event Management System API

This API allows users to create events, get events, and delete bookings. It also includes functionality for booking tickets, checking availability, and printing tickets.

## Prerequisites

Ensure you have the following software installed on your system:

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (v4.x or higher)

## Installation

### Clone the Repository

Open your VS-Code terminal and run the following command to clone the repository:

```sh
git clone https://github.com/21CHANCHAL21/Event_Management_System.git

# Navigate to the Project Directory

Change into the project directory:
"cd your-repository"

# Install the required dependencies using npm:
npm install

# Set Up Environment Variables

Create a .env file in the root of your project and add the following environment variables:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database
Replace your-database with the name you want for your MongoDB database.

# Running the Application
Start MongoDB

Ensure your MongoDB server is running. If you installed MongoDB locally, you can start it with:
"mongod"

# Start the server using npm:
"npm start"
The server should start on the port specified in your .env file (default is 3000). You should see a message indicating the server is running.

# Using the API
You can use tools like Postman or cURL to test the API endpoints.

Example Requests

# Create an Event
POST /events
Content-Type: application/json
{
  "eventName": "Tech Conference",
  "date": "2024-10-01",
  "totalTickets": 500
}

# Get an Event by ID
GET /events/:id

# Get all the  Events
GET /events

# POST /bookings
Content-Type: application/json

{
  "userId": "user_id",
  "eventId": "event_id",
  "quantity": 5
}

# Cancel a Booking
DELETE /bookings/:id

# POST /print-ticket
Content-Type: application/json

{
  "bookingId": "66abc2374b006201f711ecb7"
}
