'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rating extends Model {

  user () {
    return this.hasOne('App/Models/User')
  }
  
  place () {
    return this.hasOne('App/Models/Place')
  }
}

module.exports = Rating