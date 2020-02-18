'use strict'

class SessionController {
  
  async create({ request, auth }){
    const { email, password } = request.all()
    
    const token = await auth.attempt(email, password)

    return token
  }

  async destroy({ request, auth }){
    await auth.logout()
  }
}

module.exports = SessionController
