const mongoose = require('mongoose');
require('dotenv').config(); 

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection URI:', mongoURI);
    
    const { readyState } = mongoose.connection;
    console.log('Current connection state:', readyState);

    if (readyState === 1) {
      console.log('MongoDB is already connected.');
      // List all collections
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('Available collections:', collections.map(c => c.name));
      
      // Get count from aicontents collection
      const count = await mongoose.connection.db.collection('aicontents').countDocuments();
      console.log(`Documents in aicontents: ${count}`);
      
      // List all documents in aicontents
      const docs = await mongoose.connection.db.collection('aicontents').find({}, { projection: { _id: 1, title: 1 } }).toArray();
      console.log('Available documents:', docs.map(doc => ({ id: doc._id.toString(), title: doc.title })));
      
      return;
    }

    if (readyState === 2) {
      console.log('MongoDB is in the process of connecting...');
      return;
    }

    // Connect to the specific database
    const connection = await mongoose.connect(mongoURI, {
      dbName: 'aiSearchEngine_dashboard' // Explicitly specify the database name
    });
    console.log('Connected to MongoDB Atlas - Database: aiSearchEngine_dashboard');
    
    // List all collections after connecting
    const collections = await connection.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    // Get count from aicontents collection
    const count = await connection.connection.db.collection('aicontents').countDocuments();
    console.log(`Documents in aicontents: ${count}`);
    
    // List all documents in aicontents
    // const docs = await connection.connection.db.collection('aicontents').find({}, { projection: { _id: 1, title: 1 } }).toArray();
    // console.log('Available documents:', docs.map(doc => ({ id: doc._id.toString(), title: doc.title })));
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Stop the app on failure
  }
};

module.exports = connectDB;
