const controller = require('./controller')
const auth = require('./auth')
const validator = require('./validator')

module.exports = (router) => {
  // Added a get route to get all the notes for a user
  router.get('/user/:id/notes', async (req, res) => {
    // Checks the authorization berear matches the user id
    await auth.requiresCurrentUser(req)
    // Reads the users notes
    await controller.readUserNotes(req, res)
  })

  router.get('/user/:id', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await controller.read(req, res)
  })

  router.put('/user/:id', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await validator.update(req)
    await controller.update(req, res)
  })

  router.post('/note', async (req, res) => {
    // Checks the user is logged in
    await auth.requiresLogin(req)
    // Creates a new new for the user if their logged in
    await controller.createNewUserNote(req, res)
  })
}
