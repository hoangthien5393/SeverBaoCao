//Sever API
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialize the app
let app = express();
//
let server = require('http').createServer(app)

// Import routes
let apiRoutes = require('./API-routes');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    limit: '500mb', extended: true
}));
app.use(bodyParser.json({limit: '500mb', extended: true}));
// Heroku Mongoose connection
// mongoose.connect('mongodb://heroku_5686p02g:sia8l3fni4jmu7qbn0ac1t75mf@ds349857.mlab.com:49857/heroku_5686p02g', { useNewUrlParser: true });
// Setup server port
var port = process.env.PORT || 9000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
server.listen(port );