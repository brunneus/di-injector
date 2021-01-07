const { injectFunctionDependencies } = require('./function-di-injector')

const userService = require('./user-service')
const { createUser } = injectFunctionDependencies(userService, 'createUser')

createUser({ name: 'foo' })
