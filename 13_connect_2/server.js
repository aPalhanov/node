const connect = require('connect');
const setup = require('./logger.js');
const errorHandler = require('./errors.js');


function hello(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	next(new Error('Intentional error'));
}


/*
function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');
}
*/

const app = connect()
	.use(setup(':method :url'))
	.use(hello)
	.use(errorHandler)
	.listen(3000);