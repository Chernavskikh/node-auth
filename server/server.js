// server/server.js
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./router/index');

const {startDatabase} = require('./database/mongo');

// defining the Express app
const app = express();
const PORT = process.env.PORT || 3000

// defining an array to work as the database (temporary solution)
const ads = [
    {title: 'Hello, world (again)!'}
];

app.use(express.json())
app.use(cookieParser())

// enabling CORS for all requests
app.use(cors());
app.use('/api', router);

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// replace the endpoint responsible for the GET requests
app.get('/', async (req, res) => {
    res.send(await getAds());
});
//
// app.post('/', async (req, res) => {
//     const newAd = req.body;
//     await insertAd(newAd);
//     res.send({ message: 'New ad inserted.' });
// });
//
// // endpoint to delete an ad
// app.delete('/:id', async (req, res) => {
//     await deleteAd(req.params.id);
//     res.send({ message: 'Ad removed.' });
// });
//
// // endpoint to update an ad
// app.put('/:id', async (req, res) => {
//     const updatedAd = req.body;
//     await updateAd(req.params.id, updatedAd);
//     res.send({ message: 'Ad updated.' });
// });

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    try {
        // start the server
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, async () => {
            console.log(`listening on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
});
