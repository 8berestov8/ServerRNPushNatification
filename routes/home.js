const { Router } = require('express');
const User = require('../models/user');
const sha = require('../models/hash');
const router = Router();

const admin = require('firebase-admin');

const serviceAccount = require('../testaufgabe-715e5-firebase-adminsdk-mou21-62a67719b2.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

router.get('/', async (req, res) => {
	const users = await User.find({});

	res.render('index', {
		title: 'Home page',
		isIndex: true,
		users,
	});
});

router.post('/create', async (req, res) => {
	// console.log(req.query, req.body, req.params);
	const { username, password, fcmtoken, platform } = req.body;
	await User.create({
		username: username,
		password: sha(password),
		fcmtoken: fcmtoken,
		platform: platform,
	})
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => console.error(err));
});

router.get('/find', async (req, res) => {
	// console.log(req.query, req.body, req.params);

	await User.findById(req.query.id)
		.then((doc) => {
			//send push
			const message = {
				notification: {
					title: `${req.query.title}`,
					body: `${req.query.message}`,
					sound: 'enable',
				},
				data: {
					title: `${req.query.title}`,
					body: `${req.query.message}`,
					type: 'Notification',
				},
			};

			const notification_options = {
				priority: 'high',
				timeToLive: 60 * 60 * 24,
			};
			admin
				.messaging()
				.sendToDevice(doc.fcmtoken, message, notification_options)
				.then((response) => {
					console.log('Notification sent successfully', response);
				})
				.catch((error) => {
					console.log(error);
				});
		})

		.catch((err) => console.error(err));
	res.redirect('/');
});

router.post('/auth', async (req, res) => {
	// console.log(req.query, req.body, req.params);
	const { username, password } = req.body;
	await User.findOne({
		username: username,
		password: sha(password),
	})
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => console.error(err));
});

module.exports = router;
