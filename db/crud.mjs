// crud.mjs
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function performCRUDOperations() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    // Specify the database and collection
    const database = client.db('store');
    const collection = database.collection('category');

    // Insert a document
    const document = { cat:'homme',name: 'John Doe', age: 30 };
    const result = await collection.insertOne(document);
    console.log(`Inserted ${result.insertedCount} document`);

    // Find documents
    const resultFind = await collection.find({ cat: 'GROCERIES' }).toArray();
    console.log('Found documents:', resultFind);

    // Update a document
    const resultUpdate = await collection.updateOne(
      { name: 'John Doe' },
      { $set: { age: 26 } }
    );
    console.log(`Updated ${resultUpdate.modifiedCount} document`);
      // delete
    const resultDelete = await collection.deleteOne({ name: 'hiba' });
    console.log(`Deleted ${resultDelete.deletedCount} document`);

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    // Close the connection after operations
    await client.close();
    console.log('Connection closed');
  }
}

performCRUDOperations();
