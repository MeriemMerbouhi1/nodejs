// app.mjs
import { MongoClient } from 'mongodb';

// Replace 'your_mongodb_connection_string' with your actual connection string
const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToMongoDB();


