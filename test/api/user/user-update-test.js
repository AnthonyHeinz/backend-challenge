let should
let agent
let mockData

// Before running tests, load dependencies
before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('update', () => {
      // Declare variables to hold the authenticated user and another user
      let authUser, otherUser
      // Before running the tests, set up test data
      before(async () => {
        authUser = await mockData.mockAuthAndUser()
        otherUser = await mockData.mockAuthAndUser()
      })

      it('should allow a user to update their own profile', async () => {
        // Define the new data to update
        const body = { firstName: 'UpdatedName' }

        // Send a PUT request to update the current user’s profile
        const user = await agent
          .client()
          .put(`/user/${authUser.user}`)
          .set('authorization', authUser.token)
          .send(body)
          .expect(200)
          .promise()

        // Check that a user object was returned
        should.exist(user)
        // Check that the returned user matches the one we updated
        user.id.should.equal(authUser.user)
        // Check that the firstName was updated
        user.firstName.should.equal('UpdatedName')
      })

      it("should block a user from updating someone else's profile", async () => {
        // Define the fake update data
        const body = { firstName: 'HackedName' }
        // Try to update another user's profile using the wrong token
        const response = await agent
          .client()
          .put(`/user/${otherUser.user}`)
          .set('authorization', authUser.token)
          .send(body)
          .expect(403)
          .promise()

        should.exist(response.error || response)
      })
    })
  })
})
