let should
let agent
let mockData
let noteService

// Before running tests, load dependencies
before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
  noteService = require('app/modules/notes')
})

describe('api', () => {
  describe('user', () => {
    describe('notes', () => {
      // Declare variables to hold the authenticated user and another user
      let authUser, otherUser
      // Before running the tests, set up test data
      before(async () => {
        // Create a user and associated auth token
        authUser = await mockData.mockAuthAndUser()
        // Create a second user for access control testing
        otherUser = await mockData.mockAuthAndUser()

        // Create two notes for the authenticated user
        await noteService.create({
          title: 'Note 1',
          message: 'Test message 1',
          user: authUser.user
        })

        await noteService.create({
          title: 'Note 2',
          message: 'Test message 2',
          user: authUser.user
        })
        // Create a note for the other user
        await noteService.create({
          title: 'Other Note',
          message: 'Should not appear',
          user: otherUser.user
        })
      })

      it('should list notes for the correct user', async () => {
        const notes = await agent
          // Send a GET request to fetch notes for authUser
          .client()
          .get(`/user/${authUser.user}/notes`)
          .set('authorization', authUser.token)
          .expect(200)
          .promise()

        // Checks that notes are returned as an array
        should(notes).be.an.Array()
        // Checks the length of the array is 2
        notes.length.should.equal(2)
        // Check the notes belong to the authenicated user
        notes.forEach((note) => {
          note.user.should.equal(authUser.user)
        })
      })

      it('should not allow accessing notes of another user', async () => {
        // Try to access notes other user using authUser's token
        await agent
          .client()
          .get(`/user/${otherUser.user}/notes`)
          .set('authorization', authUser.token)
          .expect(403)
          .promise()
      })
    })
  })
})
