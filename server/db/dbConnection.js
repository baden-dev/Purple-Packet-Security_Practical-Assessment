const mongoose = require('mongoose');
let connection = null;
let url = 'mongodb://mongo:27017/testDb';
// let url = 'mongodb://localhost:27017/testDb';

const connectToDatabase = async () => {
  try {
    connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

module.exports = { connectToDatabase, connection };