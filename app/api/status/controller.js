// Import in the constant for the database
const db = require('../../lib/mongodb')

// Export the status of the controller to /status in router.js
exports.currentStatus = async function (req, res) {
  try {
    // Check if the database is connected.
    // This is done by checking if the value of the ready state is equal to 1
    if (db.readyState === db.ReadyStates.connected) {
      // If true, return a 200 status
      return res.status(200).send({ status: 'OK' })
    } else {
      // Otherwise return a 500 status
      return res.status(500).send({ status: 'Database not connected' })
    }
  } catch (err) {
    // Added incase there is an error checking the connection
    console.error('Error checking DB connection:', err)
    // Will still return a 500 error
    return res.status(500).send({ status: 'Database not connected' })
  }
}
