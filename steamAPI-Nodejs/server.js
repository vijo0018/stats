
var mongoose = require('mongoose');
express = require('express');
cors = require('cors');
morgan = require('morgan');
config = require('./config/database');
passport = require('passport');
routes = require('./routes/users');
bodyParser = require('body-parser');
//var router = express.Router();

mongoose.connect(config.database);

mongoose.connection.on('open', function(){
    console.log('Mongo is connected');
    var app = express();
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(routes);
    app.use(passport.initialize());
    require('./config/passport')(passport);
    app.listen(3333, function(){
        console.log('server is running');
    });
});
//module.exports = router;