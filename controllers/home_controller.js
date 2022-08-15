const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){

    let friends = [];

    let getAllFriends = function(users){ // calling this function will fill the friends array with all the users friends
        
        users.forEach((user, index, users) => {
            
            if(user.id != req.user.id){  // used this condition to avoid repeatition(i.e adding the same friend twice)
                user.friendships.forEach((friendship,index,friendships) => {
                    if(friendship.to_user.id == req.user.id){
                        friends.push(friendship.from_user);
                    }else if(friendship.from_user.id == req.user.id){
                        friends.push(friendship.to_user);
                    }
                });
            }

        });
    }

    try{
       
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        
        let users = await User.find({})
        .populate({
            path: 'friendships',
            populate: {
                path: 'from_user to_user'
            }
        });

        if(req.user){ // get all friends only if the user is logged in
            getAllFriends(users); 
        }
        
        
        return res.render('home', {
            title: "Z-Social | Home",
            posts: posts,
            all_users: users,
            friends: friends
        });

    }catch(err){
        console.log('Error',err);
        return;
    }

}

