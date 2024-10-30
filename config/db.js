// import { MongoClient } from 'mongodb';

// // Connection URL to your MongoDB
// const url = 'mongodb+srv://shehzaan:naseema1976r@shehzaan.ymumn.mongodb.net/?retryWrites=true&w=majority&appName=shehzaan'; // Replace with your MongoDB connection string
// const dbName = 'test'; // Your database name
// const collectionName = 'testing'; // Your collection name

// const client = new MongoClient(url);
// let collection;

// export const connectToMongoDB = async () => {
//     try {
//         await client.connect();
//         console.log("Connected successfully to MongoDB");
//         const db = client.db(dbName);
//         collection = db.collection(collectionName);
//     } catch (error) {
//         console.error("MongoDB connection error:", error);
//     }
// };

// export const getCollection = () => {
//     if (!collection) {
//         throw new Error("Collection not initialized. Ensure you connect to MongoDB first.");
//     }
//     return collection;
// };

// config/db.js
import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://shehzaan:naseema1976r@shehzaan.ymumn.mongodb.net/?retryWrites=true&w=majority&appName=shehzaan'; // Replace with your MongoDB connection string
const dbName = 'test'; 
const collectionName = 'testing';

const client = new MongoClient(url);
let collection;

export const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        const db = client.db(dbName);
        collection = db.collection(collectionName);
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

export const getCollection = () => {
    if (!collection) {
        throw new Error("Collection not initialized. Ensure you connect to MongoDB first.");
    }
    return collection;
};

