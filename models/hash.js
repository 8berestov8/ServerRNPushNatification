const crypto = require('crypto');
module.exports = function (input) {
	return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex');
};
