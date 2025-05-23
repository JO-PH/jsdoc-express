# jsdoc-express
A module supporting the documentation of an express based REST server.

## Installation

Simply install with e.g. npm: 

`npm install jsdoc-express`

## Configuration

Include in your `jsdoc.conf` a reference to the plugin:

`"plugins": ["node_modules/jsdoc-express"]`

Full functionality is given together with the [jsdoc-http-plugin](https://github.com/vmarchaud/jsdoc-http-plugin#readme), so install that as well and include it in the plugins section too:

`"plugins": ["jsdoc-http-plugin", "node_modules/jsdoc-express"]`

## Usage

This module currently relies on that you define your routes by calling the http-Method function on the express router object named `router`. E.g.:

```
router.put('/writeSomeData', async function (req, res) {
    const result = 'OK ' + req.query.queryParam + ' ' + req.body.ID
    res.send(result)
})
```

The jsdoc-express plugin will trigger on such definitions and append your JSDoc comment with a @path tag, which is defined in the jsdoc-http-plugin. From the definition of the route jsdoc-express derives the http-method and the route's name.

## Examples

See test folder of the package for some example usages.

## To Do
* Make the express-router object's name configurable. Currently only "router" is accepted.
* It would by cool, if routes are a separate category.

## Version History

0.0.1: Initial version published.

0.0.2: Added some basic documentation.


