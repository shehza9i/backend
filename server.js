// Import the necessary modules using ES module syntax
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connection URL to your MongoDB
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string if using Atlas
const dbName = 'test'; // Your database name
const collectionName = 'testing'; // Your collection name

// Create an Express application
const app = express();
const port = 3000;

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

// MongoDB client initialization outside the route
const client = new MongoClient(url);
let db, collection;

// Connect to MongoDB and initialize the collection once
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        db = client.db(dbName);
        collection = db.collection(collectionName);
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
connectToMongoDB();

// POST route to handle form submission
app.post('/submit', async (req, res) => {
    try {
        // Get the data from the request body
        const { name, age, role, password, email } = req.body;

        // Insert the data into the MongoDB collection
        const insertResult = await collection.insertOne({ name, age, role, password, email });
        
        // Send response back to the client
        res.status(200).json({ message: 'Data inserted successfully', data: insertResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting data', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


// POST route to handle login
app.post('/login', async (req, res) => {
    try {
        // Extract the email and password from the request body
        const { email, password, name } = req.body;

        // Check if the user exists in the MongoDB collection
        const user = await collection.findOne({ email });
        const user2 = await collection.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password (you can add encryption later if needed)
        if (user.password === password) {
            // If the password matches, return success
            return res.status(200).json({ message: 'Login successful' });
        } else {
            // If the password does not match, return an error
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'An error occurred during login', error });
    }
});
