const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){


    // Post.find({},function(err,posts){
    //     if(err){console.log('error in finding posts');return;}

    //     return res.render('home', {
    //         title: "Z-Social | Home",
    //         posts: posts
    //     });
    // });

    //populate the user for each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        
        User.find({},function(err, users){

            return res.render('home', {
                title: "Z-Social | Home",
                posts: posts,
                all_users: users
            });

        });
        
    });
 
}

