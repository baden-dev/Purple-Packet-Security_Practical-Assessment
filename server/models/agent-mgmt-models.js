const mongoose = require('mongoose');
// Create a schema for the agent information
const agentSchema = new mongoose.Schema({
  os: {
    arch: String,
    codename: String,
    major: String,
    minor: String,
    name: String,
    platform: String,
    uname: String,
    version: String
  },
  dateAdd: Date,
  configSum: String,
  version: String,
  ip: String,
  manager: String,
  node_name: String,
  name: String,
  lastKeepAlive: Date,
  id: String,
  group_config_status: String,
  status: String,
  group: [String],
  mergedSum: String,
  registerIP: String,
  greeting: String,
  newKey: String
}, { strict: false });
//---------------------------------------------------------------------------------------------------------------------------------
// Create a schema for the hardware information
const hardwareSchema = new mongoose.Schema({
  cpu: {
    cores: Number,
    mhz: Number,
    name: String
  },
  ram: {
    free: Number,
    total: Number,
    usage: Number
  },
  scan: {
    id: Number,
    time: Date
  },
  board_serial: String,
  agent_id: String,
}, { strict: false });

//---------------------------------------------------------------------------------------------------------------------------------
// Create a schema for the package information
const packageSchema = new mongoose.Schema({
  scan: {
    id: Number,
    time: Date
  },
  section: String,
  size: Number,
  description: String,
  version: String,
  vendor: String,
  format: String,
  name: String,
  multiarch: String,
  architecture: String,
  priority: String,
  source: String,
  agent_id: String,
}, { strict: false });


//---------------------------------------------------------------------------------------------------------------------------------
// Create a schema for the vulnerability information
const vulnerabilitySchema = new mongoose.Schema({
  published: Date,
  cvss2_score: Number,
  cve: String,
  status: String,
  title: String,
  version: String,
  type: String,
  condition: String,
  cvss3_score: Number,
  external_references: [String],
  updated: Date,
  name: String,
  detection_time: Date,
  severity: String,
  architecture: String,
}, { strict: false });

//models based on the schemas
const Agent = mongoose.model('Agent', agentSchema);
const Hardware = mongoose.model('Hardware', hardwareSchema);
const Package = mongoose.model('Package', packageSchema);
const Vulnerability = mongoose.model('Vulnerability', vulnerabilitySchema);

module.exports = { Agent, Hardware, Package, Vulnerability };
