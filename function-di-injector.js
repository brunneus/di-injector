const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
const ARGUMENT_NAMES = /([^\s,]+)/g
const { curry } = require('ramda')

function DependencyInjector(fun) {
  this.fun = curry(fun)

  this.inject = (service) => {
    this.fun = this.fun(service)
  }

  this.injectUserRepository = () => this.inject(require('./user-repository'))
  this.injectEmailService = () => this.inject(require('./email-service'))

  this.getFun = () => this.fun
}

const getParamNames = (func) => {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '')
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
  if (result === null) { result = [] }
  return result
}

const injectFunctionDependencies = (serviceObject, funcName) => {
  const func = serviceObject[funcName]
  const dependencies = getParamNames(func)
  const di = new DependencyInjector(func)

  const servicesInjectors = {
    userRepository: di.injectUserRepository,
    emailService: di.injectEmailService,
  }

  dependencies.forEach((dep) => {
    const injector = servicesInjectors[dep]
    if (!injector) throw new Error(`Not found a service to inject for dependency ${dep}`)
    injector()
  })

  return {
    ...serviceObject,
    [funcName]: di.getFun()
  }
}

module.exports = {
  injectFunctionDependencies
}
