require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use environment variable for security
const path = require('path');
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the /charge endpoint
app.post('/charge', async (req, res) => {
    try {
        const { token, amount, productName, firstName, lastName, email, phone, address, city, state, zip, apartment } = req.body;

        // Create a new customer in Stripe
        const customer = await stripe.customers.create({
            name: `${firstName} ${lastName}`,
            email: email,
            phone: phone,
            address: {
                line1: address,
                line2: apartment,
                city: city,
                state: state,
                postal_code: zip,
                country: 'US',
            },
            source: token,
        });

        // Charge the customer
        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            customer: customer.id,
            description: `Purchase of ${productName}`,
        });

        res.send({ success: true });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}. Visit http://localhost:${PORT} to view the site.`));
