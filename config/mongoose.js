// require the library
const mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://localhost/z-social_development',{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  family: 4,
});

// acquire the connection
const db = mongoose.connection;
// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message
db.once('open', function () {
  console.log('Connected to Database :: MongoDB');
});