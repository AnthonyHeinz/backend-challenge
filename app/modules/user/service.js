const { Service } = require('app/modules/common')

class UserService extends Service {
  // Added an async method to read and update a user by ID
  async readAndUpdate(id, updatedData) {
    // Find the user in the database by their ID and update the data
    const user = await this.model.findByIdAndUpdate(id, updatedData, { new: true })
    // If user doesn't exist, throw an error
    if (!user) throw new Error('User not found')
    // return the value of user
    return user
  }
}

module.exports = UserService
