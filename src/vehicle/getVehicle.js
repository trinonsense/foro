import request from 'superagent'

export default function getVehicle(req, res) {
  request
    .get('https://autolist-test.herokuapp.com/api/vehicles/' + req.params.vin)
    .end((err, response) => {
      if (err) return console.log(err)

      res.format({
        html() {
          res.send('<p>hey</p>')
        },

        json() {
          res.send(response.body)
        }
      })
    })
}
