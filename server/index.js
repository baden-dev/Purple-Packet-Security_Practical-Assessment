const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 4000

const { connectToDatabase, connection } = require('./db/dbConnection');
const agentRouter = require('./routes/agent-mgmt-router')
const processFiles = require('./processFiles');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

connectToDatabase()
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.use('/api', agentRouter);

    app.listen(apiPort, () => {
      console.log(`Server running on port ${apiPort}`);
      // Call the processFiles function and pass the connection variable
      processFiles(connection);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
});