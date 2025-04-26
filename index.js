/**
 * @summary JSDoc plugin to document router files.
 * @module jsdoc-express
 */

/**
 * Global variable for generating IDs on routes.
 */
var nodeID = 0

/**
 * Handler for visitNode events of the astNodeVisitor process.
 * @todo Make the express-router object's name configurable. Currently only "router" is accepted.
 * @todo It would by cool, if routes are a separate category.
 */
const astNodeVisitor = {
    visitNode: function (node, e, parser, currentSourceName) {
        // filter out those Nodes, where a function is called on the router object, i.e. 
        // ExpressionStatements having a callee (CallExpressions)
        if (node.type == 'ExpressionStatement' && node.expression.callee) {
            let callee = node.expression.callee
            if (callee.object) {
                // filter out those CallExpressions where the object is named "router"
                // then populate the event's properties
                if (callee.object.name == 'router') {
                    // name of the route is its http method in curly bracketc followed by the route itself
                    let name = '{'
                        + callee.property.name.toUpperCase()
                        + '} '
                        + node.expression.arguments[0].value
                    // generate a unique ID, based on the global variable, which needs to be incremented after assignement
                    e.id = 'route' + nodeID
                    nodeID++
                    // append a @path tag utilizing the name as argumemnts
                    e.comment = '/*'
                        + node.expression.leadingComments[0].value
                        + '* @path ' + name
                        + '\n */'
                    // Location of the codeblock
                    e.lineno = node.loc.start.line
                    e.columnno = 0
                    e.range = node.range
                    e.filename = currentSourceName
                    // 
                    e.astnode = node
                    e.code = {
                        name: name,
                        type: 'route',
                        node: node,
                        //kind: 'function' //otherwise routes get listed as members...
                    }
                    e.event = 'symbolFound'
                }
            }
        }
    }
}

export { astNodeVisitor }
