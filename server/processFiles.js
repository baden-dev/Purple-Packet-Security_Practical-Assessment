const fs = require('fs');
const path = require('path');
const { Agent, Hardware, Package, Vulnerability } = require('./models/agent-mgmt-models');

const folderPath = './jSONFiles';

const processFiles = async (connection) => {
  try {
    // Empty out all collections
    const deletePromises = [
      Agent.deleteMany(),
      Hardware.deleteMany(),
      Package.deleteMany(),
      Vulnerability.deleteMany(),
    ];

    await Promise.all(deletePromises);

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading folder:', err);
        mongoose.connection.close();
        return;
      }

      // Process each file
      files.forEach((fileName) => {
        // Extract ID and section from the file name
        const [id, section] = fileName.split('.');

        // Read the file contents
        const filePath = path.join(folderPath, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');

        try {
          // Parse the JSON data
          const jsonData = JSON.parse(fileContents);
          // Access the relevant data within the JSON object and process it
          const affectedItems = jsonData.data.affected_items;

          switch (section) {
            case 'json':
              affectedItems.forEach(async (item)  => {
                item.greeting = 'good morning';
                item.newKey = 'New Value';
      
                // Create a new agent document using the Agent model
                const agent = new Agent(item);
      
                try {
                  // Save the agent document to the database
                  await agent.save();
                } catch (error) {
                  console.error('Error saving agent document:', error);
                }
              });
              break;

            case 'hardware':
              affectedItems.forEach(async (item)  => {
                // Create a new hardware document using the Hardware model and save it to the database
                const hardware = new Hardware(item);

                try {
                  // Save the agent document to the database
                  await hardware.save();
                } catch (error) {
                  console.error('Error saving hardware document:', error);
                }
              });
              break;

            case 'packages':
              affectedItems.forEach( async (item) => {
                // Create a new package document using the Package model and save it to the database
                const package = new Package(item);

                try {
                  // Save the agent document to the database
                  await package.save();
                } catch (error) {
                  console.error('Error saving package document:', error);
                }
              });
              break;

            case 'vulnerabilities':
              affectedItems.forEach(async (item) => {
                // Add a new key-value pair to the item object
                item.agent_id = id;

                // Create a new vulnerability document using the Vulnerability model and save it to the database
                const vulnerability = new Vulnerability(item);

                try {
                  // Save the agent document to the database
                  await vulnerability.save();
                } catch (error) {
                  console.error('Error saving vulnerabilitydocument:', error);
                }
              });
              break;

            default:
              console.log(`Unknown section: ${section}`);
              break;
          }

        } catch (error) {
          ;
        }
      });
    });
    
  } catch (error) {
    console.error('Error reading folder:', error);
  }
};

module.exports = processFiles;
