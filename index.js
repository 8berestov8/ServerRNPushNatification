const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');

const app = express();

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use('/', homeRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
	try {
		mongoose.set('strictQuery', true);
		const url = `mongodb+srv://8berestov8:tovj5TTdSxgBuw70@cluster0.kzlvehy.mongodb.net/test`;
		await mongoose.connect(url, {
			useNewUrlParser: true,
		});

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
}

start();
