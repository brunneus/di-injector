const createUser = (userRepository, emailService) => user => {
    userRepository.saveUser(user)
    emailService.sendUserCreatedEmail(user)

    console.log(`User ${user.name} created successfully`)
}

module.exports = {
    createUser
}