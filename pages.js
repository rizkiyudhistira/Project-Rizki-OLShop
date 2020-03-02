var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    // res.send('Hello World');
    res.render('index', {
        h1 : 'Rizkionlineshop Keren'
    });
});

router.get('/product', function(req, res){
    // res.send('Hello World');
    res.render('index', {
        h1 : 'product - product terkece'
    });
});

module.exports = router;