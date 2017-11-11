const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User');

require('./services/passport');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in ms
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
///////////////////////////////////
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//process.env.NODE_ENV set by heroku
if (process.env.NODE_ENV === 'production') {
  //express server will serve production assets file like main.js or main.css
  app.use(express.static('client/build'));

  //express will also serve index.html file if it does not regconize path, so React Router will
  //decide what to serve
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
