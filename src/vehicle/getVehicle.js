import renderReactPage from '../lib/renderReactPage'
import request from 'superagent'
import VehiclePage from './VehiclePage'

export default function getVehicle(req, res, next) {
  request
    .get('https://autolist-test.herokuapp.com/api/vehicles/' + req.params.vin)
    .end((err, response) => {
      if (err) return console.log(err)
      const vehicle = response.body

      res.format({
        html() {
          renderReactPage(res, next, {
            PageComponent: VehiclePage,
            clientScript: 'vehicle.js',
            reactData: {vehicle},
            templateData: {
              title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`
            }
          })
        },

        json() {
          res.send(vehicle)
        }
      })
    })
}
