const { post } = require("../routes");
const Post = require('../models/post');

module.exports.home = function(req, res){


    // Post.find({},function(err,posts){
    //     if(err){console.log('error in finding posts');return;}

    //     return res.render('home', {
    //         title: "Z-Social | Home",
    //         posts: posts
    //     });
    // });

    // populate the user for each post
    Post.find({}).populate('user').exec(function(err,posts){
        if(err){console.log('error in finding posts');return;}

        return res.render('home', {
            title: "Z-Social | Home",
            posts: posts
        });
    });
    
}

