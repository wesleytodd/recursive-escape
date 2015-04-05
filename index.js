var _escape = require('lodash.escape');

var e = module.exports = function(data) {
	if (typeof data === 'undefined' || data === null) {
		return null;
	}

	if (data instanceof Array) {
		for (var i = 0; i < data.length; i++) {
			data[i] = e(data[i]);
		}
	} else if (typeof data === 'object') {
		for (var i in data) {
			data[i] = e(data[i]);
		}
	} else if (typeof data === 'string') {
		data = _escape(data);
	}

	return data;
};
