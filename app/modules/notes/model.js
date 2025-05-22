// Import the base Model class from the common module
const { Model } = require('app/modules/common')

// Define a new NoteModel class that extends the base Model
class NoteModel extends Model {
  // Define the schema for the Note model
  schema() {
    return {
      // Adds a title
      title: {
        // The title must be a string
        type: String,
        // Makes this field required
        required: true,
        // Gets rid of white spaced
        trim: true
      },
      // Adds a message
      message: {
        // The message must be a string
        type: String,
        // Makes this field required
        required: true
      },
      // Adds the user
      user: {
        // The user must be a string
        type: String,
        // Attaches a reference to the existing user model
        ref: 'User',
        // Makes this field required
        required: true
      }
    }
  }
}

module.exports = NoteModel
