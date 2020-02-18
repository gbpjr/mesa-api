'use strict'
const Place = use('App/Models/Place')
const Database = use('Database')
const geoip = require('geoip-lite')
const geolib = require('geolib')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with places
 */
class PlaceController {
  /**
   * Show a list of all places.
   * GET places
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const places = await Database.table('places').orderBy('title')

    return places
  }

  async map ({ request, response }) {
    const ip = "170.80.115.9"
    //const ip = request.ip()
    const ll = geoip.lookup(ip).ll
    const userPlace = {
      'latitude': ll[0],
      'longitude': ll[1]
    }
    let places = await Place.all()
    places = places.toJSON()
   
    let sorted = geolib.orderByDistance(userPlace, places)
    
    return sorted
  }

  /**
   * Render a form to be used for creating a new place.
   * GET places/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new place.
   * POST places
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude'
    ])
    
    let place = await Database
    .from('places')
    .where('latitude', data.latitude)
    .andWhere('longitude', data.longitude)
    .select('id')
   
    try {
      let aaa = place[0]['id']
      return response.json({
        error: "Seems like another place has taken these coordinates. Try somewhere else."
      })
    } catch (error) {
      place = await Place.create({ ...data, user_id: id })
  
      return place
    }
   
   

  }

  /**
   * Display a single place.
   * GET places/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const place = await Place.findOrFail(params.id)

    return place
  }

  /**
   * Render a form to update an existing place.
   * GET places/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update place details.
   * PUT or PATCH places/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a place with id.
   * DELETE places/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PlaceController
