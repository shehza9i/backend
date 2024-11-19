import express from 'express';
import bodyParser from 'body-parser';
import { connectToMongoDB, getCollection } from './config/db.js'; // Import the functions
import { ObjectId } from 'mongodb'; // Import ObjectId
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

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

// POST route to handle user registration
app.post('/submit', async (req, res) => {
    try {
        const { name, age, role, password, email, phone } = req.body;

        // Get the collection
        const collection = getCollection();
        
        // Create a new user document with a unique userId and createdAt field
        const newUser = {
            userId: uuidv4(), // Generate a unique user ID
            name,
            age,
            role,
            password,
            email,
            phone,
            createdAt: new Date(), // Add the current timestamp
        };

        // Insert the user into the MongoDB collection
        const insertResult = await collection.insertOne(newUser);
        
        // Send response back to the client
        res.status(200).json({ 
            message: 'User registered successfully', 
            userId: newUser.userId // Return the generated userId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// POST route to handle login
app.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Get the collection
        const collection = getCollection();

        // Find the user by email
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password === password) {
            if (user.role === role) {
                // Send success response with the userId
                return res.status(200).json({
                    message: 'Login successful',
                    userId: user.userId, // Show userId after successful login
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    createdAt: user.createdAt,
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
