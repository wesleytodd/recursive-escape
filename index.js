var _escape = require('lodash.escape');

var e = module.exports = function (input) {
	// Null or undefined, just return input
	if (typeof input === 'undefined' || input === null) {
		return input;
	}

	var output;
	var i;
	var type = typeof input;

	if (input instanceof Array) {
		output = [];
		for (i = 0; i < input.length; i++) {
			output[i] = e(input[i]);
		}
	} else if (type === 'object') {
		output = {};
		for (i in input) {
			output[i] = e(input[i]);
		}
	} else if (type === 'string') {
		output = _escape(input);
	} else if (type === 'number' || type === 'boolean') {
		output = input;
	} else {
		output = input;
	}

	return output;
};
