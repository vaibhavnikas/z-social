const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.toogleFriend = async function(req, res){

    // Function to remove friendship
    let removeFriendship = function(user, fid){

        user.friendships.forEach((friendship,index,user)=>{
            if(friendship.id == fid.id){
                user.splice(index,1);
            }
        });
        user.save();
    }


    try{

        let cuser = await User.findById(req.user.id)
        .populate({
            path: 'friendships',
            populate: {
                path: 'to_user from_user'
            }
        });

        let frienduser = await User.findById(req.params.fid)
        .populate({
            path: 'friendships',
            populate: {
                path: 'to_user from_user'
            }
        });

        let isFriend = false;



        if(cuser.friendships.length != 0){
            for(let friendship of cuser.friendships){
                if(friendship.from_user.id == req.params.fid){
                    isFriend = true;
                    let fid = await Friendship.findOne({from_user : req.params.fid});
                    // removing friendship from friendships array in both the user and his friend if friendship already exists
                    removeFriendship(cuser, fid);
                    removeFriendship(frienduser, fid);

                    fid.remove();
                    req.flash('success', 'Friend Removed Successfully');
                }else if(friendship.to_user.id == req.params.fid){
                    isFriend = true;
                    let fid = await Friendship.findOne({to_user : req.params.fid});
                    // removing friendship from friendships array in both the user and his friend if friendship already exists
                    removeFriendship(cuser, fid);
                    removeFriendship(frienduser, fid);

                    fid.remove();
                    req.flash('success', 'Friend Removed Successfully');
                }
            }
        }

        if(!isFriend){
            let friendship = await Friendship.create({
                from_user: req.user._id,
                to_user: req.params.fid
            });

            // adding friendship to friendships array in both the user and his friend if friendship between them doesn't exist
            cuser.friendships.push(friendship);
            cuser.save();
            frienduser.friendships.push(friendship);
            frienduser.save();
            req.flash('success', 'Friend Added Successfully');
        }

        return res.redirect('back');

    }catch(err){
        console.log(err);
        return;
    }

}