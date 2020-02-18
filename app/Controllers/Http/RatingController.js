'use strict'

const Rating = use('App/Models/Rating')
const Database = use('Database')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ratings
 */
class RatingController {
  
  async index ({ request, response, view }) {
    const ratings = await Database.table('ratings')

    return ratings
  }

  async store ({ auth, request, response }) {
    
    const { id } = auth.user
    let data = request.only([
      'stars',
      'comment',
      'latitude',
      'longitude'
    ])

    const place = await Database
      .from('places')
      .where('latitude', data.latitude)
      .andWhere('longitude', data.longitude)
      .select('id')


    const rating = await Rating.create({ 
      stars: data.stars,
      comment: data.comment,
      user_id: id,
      place_id: place[0]['id']
    })
    
    return rating
  }

  /**
   * Display a single rating.
   * GET ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing rating.
   * GET ratings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update rating details.
   * PUT or PATCH ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a rating with id.
   * DELETE ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RatingController
