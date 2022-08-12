const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function(req,res){
    
    try{
        let post = await Post.findById(req.body.post);

        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        if(post){
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email');
            // not using the passportGoogle strategy due to safety concerns regarding credentials
            // commentsMailer.newComment(comment);
        }

        // if(req.xhr){
            
        //     return res.status(200).json({
        //         data: {
        //             comment : comment,
        //             post: post,
        //             username: req.user.name
        //         },
        //         message: "Comment Added!"
        //     });
        // }

        req.flash('success', 'Comment Published');
        res.redirect('/'); 
    }catch(err){
        console.log(err);
        req.flash('error', err);
        return res.redirect('back');
    }

}


module.exports.destroy = async function(req,res){
    

    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            
            let postId = comment.post;

            comment.remove();

            await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id} });
        }

        req.flash('success', 'Comment Deleted');
        return res.redirect('back');
        
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}