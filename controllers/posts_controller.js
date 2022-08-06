const Post = require('../models/post');

module.exports.create = function(req,res){
    if(req.isAuthenticated()){
        Post.create({
            content:req.body.content, 
            user: req.user._id
        },function(err,post){
            if(err){console.log('error in creating post'); return;}

            console.log(post);

            return res.redirect('back');
        });
    }else{
        return res.redirect('/users/sign-in');
    }
}