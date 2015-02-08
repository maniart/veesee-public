var mongoose = require('mongoose')
  , config = require('./config')
  , User = new mongoose.Schema({
    id: Number,
    username: String, 
    name: String,
    auth_token: String,
    password: String
  });

mongoose.model('User', User);
mongoose.set('debug', true);

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.MONGODB_URL, options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('connected', function() {
    console.log('mongoose connected');
});


