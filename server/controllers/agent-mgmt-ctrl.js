const { Agent, Hardware, Package, Vulnerability } = require('../models/agent-mgmt-models');


// Controller function to retrieve all agents
async function getAllAgents(req, res) {
  console.log("-- getAllAgents function exacuted")
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    console.error('Error retrieving agents:', error);
    res.status(500).json({ error: 'An error occurred while retrieving agents' });
  }
}

// Controller function to retrieve all hardware
async function getAllHardware(req, res) {
  console.log("--- getAllHardware function exacuted")
  try {
    const hardware = await Hardware.find();
    res.json(hardware);
  } catch (error) {
    console.error('Error retrieving hardware:', error);
    res.status(500).json({ error: 'An error occurred while retrieving hardware' });
  }
}

// Controller function to retrieve all packages
async function getAllPackages(req, res) {
  console.log("-- getAllPackages function exacuted")
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    console.error('Error retrieving packages:', error);
    res.status(500).json({ error: 'An error occurred while retrieving packages' });
  }
}

// Controller function to retrieve all vulnerabilities
async function getAllVulnerabilities(req, res) {
  console.log("-- getAllVulnerabilities function exacuted")
  try {
    const vulnerabilities = await Vulnerability.find();
    res.json(vulnerabilities);
  } catch (error) {
    console.error('Error retrieving vulnerabilities:', error);
    res.status(500).json({ error: 'An error occurred while retrieving vulnerabilities' });
  }
}

module.exports = {
  getAllAgents,
  getAllHardware,
  getAllPackages,
  getAllVulnerabilities,
};