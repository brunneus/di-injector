const { expect } = require('chai')

describe('User service testing', () => {
  it('Should call repository and email service', () => {
    let userCreated = false
    let emailSent = false

    const userRepositoryMock = {
        saveUser: () => userCreated = true
    }

    const emailServiceMock = {
        sendUserCreatedEmail: () => emailSent = true
    }

    const userService = require('./user-service')

    userService.createUser(userRepositoryMock, emailServiceMock)({ name : 'foo-test'})

    expect(userCreated).to.be.eq(true)
    expect(emailSent).to.be.eq(true)
  })
})
