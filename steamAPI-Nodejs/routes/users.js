var express = require('express');
var router = express.Router();
var User = require('../model/user');
var config = require('../config/database');
var jwt = require('jwt-simple');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticate', function (req, res, next) {
    User.findOne({
        name: req.body.name
    }, function(err, user){
        if (err) throw err;

        if(!user) {
            res.status(403).send({success: false, message: 'Authentication failed, User not found'});
        }

        else {
            user.comparePassword(req.body.password, function(err, isMatch){
                if(isMatch && !err) {
                    var token = jwt.encode(user, config.secret);
                    res.json({success: true, token: token});
                } else {
                    return res.status(403).send({success: false, message: 'Authenticaton failed, wrong password.'});
                }
            })
        }

    })
});


router.post('/adduser', function(req, res, next){
    if((!req.body.name) || (!req.body.password)){
        console.log(req.body.name);
        console.log(req.body.password);

        res.json({success: false, message: 'Enter all values'});
    }
    else {
        var newUser = User({
            name: req.body.name,
            password: req.body.password
        });

        newUser.save(function(err, newUser){
            if (err){
                res.json({success:false, message:'Failed to save'})
            }

            else {
                res.json({success:true, message:'Successfully saved'});
            }
        })
    }
});
router.get('/getinfo', function(req, res, next){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1];
        var decodedtoken = jwt.decode(token, config.secret);
        return res.json({success: true, message: 'hello '+decodedtoken.name});
    }
    else {
        return res.json({success:false, message: 'No header'});
    }

});

module.exports = router;
