// Boilerplate Dependencies //
require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');

// Database Connection //
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Establish Connection //
mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/error //
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));
;

// Models //
const { Schema, model } = mongoose;

// Reviews Schema //
const reviewsSchema = new Schema({
  name: String,
  description: String,
  rating: Number,
});

// Review Model //
const Review = model('Review', reviewsSchema);

// Views Engine - App Object Engine //
const app = express();
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');

// Middleware //
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Listening Route //
app.get('/', (req, res) => {
    res.send(`Wldlfe server is running`)
});


// Seed Route //
app.get('/reviews/seed', (req, res) => {
  const startReviews = [
    { name: `Dan`, description: `fantastic`, rating: 5 },
    { name: `David`, description: `awesome`, rating: 5 },
    { name: `Ken`, description: `terrific`, rating: 5 },
    { name: `Jason`, description: `otherworldly`, rating: 5 },
    { name: `Albert`, description: `good`, rating: 5 },
  ]
  Review.deleteMany({}).then((data) => {
    Review.create(startReviews).then((data) => {
      res.json(data);
    })
  }).catch((err) => {
    res.status(400).send(err)
  })
});


// Index Route //
app.get('/reviews', (req, res) => {
  Review.find({})
    .then((reviews) => {
      res.render('reviews/Index', { reviews });
    })
    .catch((error) => {
      res.json({ error })
    })
});



// Listening to PORT 8000 //
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));