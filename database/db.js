const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://harshshrivastav139:VCO4YvJTzEFw6fKu@cluster0.w65mjxa.mongodb.net/';
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(mongoURI, options)
	.then(() => {
		console.log('Connected to MongoDB');
		// Start your application or perform additional operations
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
