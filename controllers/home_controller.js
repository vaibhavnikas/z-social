const Post = require('../models/post');

module.exports.home = async function(req, res){


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
        if(err){console.log('error in finding posts');return;}

        return res.render('home', {
            title: "Z-Social | Home",
            posts: posts
        });
    });


    // use this syntax if the above method doesn't work 
    // try{
    //     // populate the user of each post and likes also
    //    let posts = await Post.find({})
    //    .sort('-createdAt')
    //    .populate('user')
    //    .populate({
    //        path: 'comments',
    //        populate: {
    //            path: 'user'
    //        }
    //    });
    //    console.log(posts);
    //    return res.render('home', {
    //        title: "Z-Social | Home",
    //        posts:  posts
    //    });
    
    // }catch(err){
    //    console.log('Error', err);
    //    return;
    // }

    
}

