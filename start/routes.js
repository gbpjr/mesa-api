'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to Mesa API' }
})

Route.post('users', 'UserController.store')
Route.get('users', 'UserController.show').middleware('auth')
Route.put('users', 'UserController.update').middleware('auth')

Route.post('sessions', 'SessionController.create')
Route.delete('sessions', 'SessionController.destroy')

Route.resource('places', 'PlaceController')
  .apiOnly()
  .middleware('auth')

Route.get('/map', 'PlaceController.map').middleware('auth')

Route.resource('ratings', 'RatingController')
  .apiOnly()
  .middleware('auth')
  .validator(new Map([
    [['ratings.store'], ['StoreRating']]
  ]))