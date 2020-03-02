var express = require('express');
var router = express.Router();
const { body, check, validationResult } = require('express-validator');
var Page = require('../models/pages');

router.get('/', function(req, res){
    // res.send('Hello World');
    res.render('index', {
        h1 : 'Admin Area'
    });
});

router.get('/add-page', function(req, res){
    var title = "";
    var link = "";
    var content = "";
    var errors = "";

    res.render('admin/add_page', {
        errors : errors,
        title : title,
        link : link,
        content : content
    });
});

router.post('/add-page', [
    check('title')
        .not().isEmpty().withMessage('Title harus diisi!!'),
    check('link')
      .not().isEmpty()
      .trim(),
    check('content')
      .not().isEmpty().withMessage('Content harus diisi!!'),
    
  ], (req, res) => {

    var title = req.body.title;
    var link = req.body.link.replace(/\s+/g, '-').toLowerCase();
    if (link==""){
        link = req.body.title.replace(/\s+/g, '-').toLowerCase();
    }
    var content = req.body.content;

    const errors = validationResult(req).errors;

    if(errors){
        res.render('admin/add_page',{
            errors:errors,
            title:title,
            link:link,
            content:content
        });
    }else{
        Page.findOne({link:link}, function(err, page) {
            if(page){
                req.flash('danger', 'Page ini telah ada, silahkan gunakan nama lain');
                res.render('admin/add-page', {
                title:title,
                link:link,
                content:content,
                });
            } else {
                var page = new Page({
                    title : title,
                    link : link,
                    content : content,
                    sorting : 0
                });    
            
            page.save(function(err){
                if (err) {
                    return console.log(err);
                    Page.find({}).sort({sorting: 1}).exec(function(err,pages){
                        if (err) {
                            console.log(err);
                        }else{
                            req.app.locals.pages = pages;    
                }
            }); 

            req.flash('Success', 'Page Berhasil Ditambahkan');
            res.redirect('/admin');
                };
            });    
        };
    });
    });
});
module.exports = router;