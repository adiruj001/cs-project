let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDB = require('./database/db')

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB.db, {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database successfully connected!');
}, error => {
    console.log('Database error: ' + error)
})

const reservationRoute = require('./routes/reservation.routes')
const memberRoute = require('./routes/member.routes')
const adminRoute = require('./routes/admin.routes');
const contactRoute = require('./routes/contact.routes');

// Connect to MongoDB
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// PORT
const port = process.env.PORT || 9999

// Connect PORT
app.listen(port, () => {
    console.log('Listening on port ' + port);
});

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/')));

// Base route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// API Root
app.use('/api', reservationRoute);
app.use('/api', memberRoute);
app.use('/api', adminRoute);
app.use('/api', contactRoute);
app.use('/images', express.static(path.join('images')));
app.use('/pictures', express.static(path.join('pictures')));

// 404 Handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
});