'use strict'

const User = use('App/Models/User')

class UserController {

  async store({ request, response }) {
    const data = request.only(['username', 'email', 'password'])

    try {
      const user = await User.create(request.all())
      return user
    }catch(e){
        return response.json({
          error: 'User is already registered.'
       })
    }
  }

  async show ({ auth, request }) {
    try {
      return await auth.getUser()
    } catch (error) {
      response.send('Missing or invalid api token')
    }
  }

  async update ({ auth, request }) {
    const userData = await auth.getUser()
    const user = await User.findBy('email', userData.email)
    
    user.merge(request.all())
    user.save()

    return user
  }

}

module.exports = UserController
