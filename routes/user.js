const { Router } = require('express');
const router = Router();
const sha = require('../models/hash');

const User = require('../models/user');

router.post('/create', async (req, res) => {
	console.log(req.query, req.body, req.params);
	const { username, password, fcmtoken } = req.body;
	await User.create({
		username: username,
		password: sha(password),
		fcmtoken: fcmtoken,
	})
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => console.error(err));
});

module.exports = router;
