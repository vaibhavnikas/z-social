// require the library
const mongoose = require('mongoose');
const env = require('./environment');

const mongoDB_URL =  env.mongoDB_URL || `mongodb://localhost/${env.db}`;

// connect to mongoose
mongoose.connect(mongoDB_URL,{
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