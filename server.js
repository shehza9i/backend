// server.js

import express from 'express';
import bodyParser from 'body-parser';
import { connectToMongoDB, getCollection } from './config/db.js'; // Import the functions
import { ObjectId } from 'mongodb'; // Import ObjectId
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an Express application
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`)); // Adjust according to your structure

// Connect to MongoDB
connectToMongoDB(); // Call this to establish the connection

// POST route to handle form submission
app.post('/submit', async (req, res) => {
    try {
        const { name, age, role, password, email, phone } = req.body;

        // Get the collection
        const collection = getCollection();
        
        // Insert the data into the MongoDB collection
        const insertResult = await collection.insertOne({ name, age, role, password, email, phone });
        
        // Send response back to the client
        res.status(200).json({ message: 'Data inserted successfully', data: insertResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting data', error });
    }
});

// POST route to handle login
app.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        // Get the collection
        const collection = getCollection();
        
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password === password) {
            if (user.role === role) {
                // Send complete user details
                return res.status(200).json({
                    message: 'Login successful',
                    name: user.name,
                    email: user.email,           // Ensure this is included
                    phone: user.phone,           // Ensure this is included
                    role: user.role,
                    createdAt: user.createdAt,   // Ensure this is included
                    userId: user._id             // Include userId for profile page redirection
                });
            } else {
                return res.status(403).json({ message: 'Invalid role' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'An error occurred during login', error });
    }
});

// GET route to retrieve user profile by userId
app.get('/profile', async (req, res) => {
    try {
        const { userId } = req.query;

        // Get the collection
        const collection = getCollection();
        
        const user = await collection.findOne({ _id: new ObjectId(userId) }); // Use ObjectId

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt // Ensure this field is present in the document
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'An error occurred while fetching user profile', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
