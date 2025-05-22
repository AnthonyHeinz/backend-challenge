// Imports Note model Schema
const Model = require('./model')
// Import Note Service class
const Service = require('./service')
// Creates a new instance of a Note Model
const model = new Model('Note')
// Creates a new instance of a service
const service = new Service(model)

// Exports the service
module.exports = service