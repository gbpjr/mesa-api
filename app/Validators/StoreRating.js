'use strict'

class StoreRating {
  get rules () {
    return {
      stars: 'integer|range:-1,6',
      latitude: 'required',
      longitude: 'required',
    }
  }

  get messages () {
    return {
      'stars.range': 'The max number for stars is 5.',
      'latitude.required': 'Latitude is required.',
      'longitude.required': 'Longitude is required.'
    }
  }
}

module.exports = StoreRating
