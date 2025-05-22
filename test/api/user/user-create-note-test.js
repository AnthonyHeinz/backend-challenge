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
  describe('note', () => {
    describe('create', () => {
      // Declare a variable to hold a mock authenticated user
      let authUser
      // Before tests, create a mock user with a valid auth token
      before(async () => {
        authUser = await mockData.mockAuthAndUser()
      })

      it('should allow a logged-in user to create a note', async () => {
        // Define the request payload (note content)
        const body = {
          title: 'Test Note',
          message: 'This is a test message'
        }
        // Send a POST request with the valid token and body
        const note = await agent
          .client()
          .post('/note')
          .set('authorization', authUser.token)
          .send(body)
          .expect(201)
          .promise()

        // Check that the response contains a valid note
        should.exist(note)
        // Check that the note's title matches
        note.title.should.equal(body.title)
        // Check that the note's message matches
        note.message.should.equal(body.message)
        // Check the note is ref'd by the correct user
        note.user.should.equal(authUser.user)
      })
      it('should fail if no auth token is provided', async () => {
        const body = {
          title: 'No Authorization Token',
          message: 'Should not be saved'
        }

        await agent.client().post('/note').send(body).expect(401).promise()
      })
    })
  })
})
