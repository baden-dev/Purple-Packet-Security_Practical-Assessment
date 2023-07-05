const mongoose = require('mongoose');
let connection = null;

const connectToDatabase = async () => {
  try {
    connection = await mongoose.connect('mongodb://mongo:27017/testDb', {
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