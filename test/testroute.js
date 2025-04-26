/**
 * Testroute module.
 * @module routes/testroute
 */
import express from 'express'

/**
 * The router object from express.
 */
const router = express.Router()

/** 
 * Add a method that converts BIGInt values (i.e. '12376n') to String when creating a JSON format represention.
 * A more robust solution is shown here: {@link https://dev.to/benlesh/bigint-and-json-stringify-json-parse-2m8p}
 * @summary Method to convert BigInt values to JSON compatible format.
 * @function toJSON
 */
BigInt.prototype.toJSON = function () {
    return this.toString() + 'n'
}

/** 
 * @summary Just respond something nice on root level...
 */
router.get('/', async function (req, res) {
    res.send('Welcome to the this beautiful REST server!')
})

/**
 * More detailed description of the route...
 * @summary Short description
 * @query {String} [queryParam] A parameter taken from the URL.
 * @body {Number} [ID] A parameter in the body of the request.
 */
router.put('/writeSomeData', async function (req, res) {
    const result = 'OK ' + req.query.queryParam + ' ' + req.body.ID
    res.send(result)
})

export default router