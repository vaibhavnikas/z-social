const User = require('../models/user');

module.exports.profile = function(req, res){

    if(req.cookies.user_id){

        User.findById(req.cookies.user_id, function(err,user){

            if(user){

                return res.render('user_profile',{
                    title: 'Profile',
                    user: user
                });
            }

            return res.redirect('/users/profile');
        });

    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'Z-social | Sign Up'
    });
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: 'Z-social | Sign In'
    });
}

// get the sign in data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signing up'); return;}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return;}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    // steps to authenticate
    // find the user
    User.findOne({email:req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing in'); return;}

        // handle user found

        if(user){
            // handle password which doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id',user.id);
            // return res.redirect('/users/profile');
            return res.render('user_profile',{
                title: 'z-social | User Profile',
                user: user
            });
        }else{
            // handle user not found

            return res.redirect('back');
        }
    });

}


module.exports.signOut = function(req, res){
    res.clearCookie("user_id");

    return res.redirect('/users/sign-in');
}