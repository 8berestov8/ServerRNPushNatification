const { Schema, model } = require('mongoose');

const user = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	fcmtoken: String,
	platform: String,
});

module.exports = model('User', user);
