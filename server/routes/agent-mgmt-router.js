const express = require('express')

const AgentCtrl = require('../controllers/agent-mgmt-ctrl')

const {
    getAllAgents,
    getAllHardware,
    getAllPackages,
    getAllVulnerabilities,
} = require('../controllers/agent-mgmt-ctrl');
  

const router = express.Router();

router.get('/agents', getAllAgents);
router.get('/hardwares', getAllHardware);
router.get('/packages', getAllPackages);
router.get('/vulnerabilities', getAllVulnerabilities);

module.exports = router;