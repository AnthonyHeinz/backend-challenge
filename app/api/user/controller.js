const userService = require('app/modules/user')
// Import the noteService model
const noteService = require('app/modules/notes')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const user = await userService.findById(req.params.id)
  res.status(200).send(user)
}

/**
 * @method update
 */
exports.update = async (req, res) => {
  // Check if the logged in user, in the req.params, is the same as the using requesting an update
  if (req.userId !== req.params.id) {
    // If they aren't the same, return a 400 error
    return res.status(400).send({ error: 'Unauthorized: users do not match' })
  }
  // Otherwise, update the users information by invoking readAndUpdate method on userService
  const user = await userService.readAndUpdate(req.params.id, req.body)
  // Return a 200 status, along with updated user information
  res.status(200).send(user)
}

exports.readUserNotes = async (req, res) => {
  // Get all notes for the user ID in the URL
  const notes = await noteService.find({ user: req.params.id })
  // Returns a 200 status, and all the notes
  res.status(200).send(notes)
}

exports.createNewUserNote = async (req, res) => {
  const note = await noteService.create({
    title: req.body.title,
    message: req.body.message,
    user: req.userId
  })

  res.status(201).send(note)
}
