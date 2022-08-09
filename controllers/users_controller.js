const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req, res){

    try{
        let user = await User.findById(req.params.id);

        return res.render('user_profile',{
            title: 'Profile',
            profile_user : user
        });
    }catch(err){
        console.log('Error',err);
        return;
    }
  
}


module.exports.update = async function(req, res){

    if(req.user.id == req.params.id){
        
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('*****Multer Error: ',err);}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // Saving the path of the uploaded file into the avatar field in the user
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();

                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }

    }else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
    
}


module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }else{
        return res.render('user_sign_up',{
            title: 'Z-social | Sign Up'
        });
    }
    
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }else{
        return res.render('user_sign_in',{
            title: 'Z-social | Sign In'
        });
    }

    
}

// get the sign in data
module.exports.create = async function(req,res){

    try{
       
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }

        let user = await User.findOne({email:req.body.email});

        if(!user){
            user = User.create(req.body);

            return res.redirect('/users/sign-in');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('Error',err);
        return;
    }
    
}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(user, err){
        if(err) return next(err);

        req.flash('success', 'You have logged out!');
        
        return res.redirect('/');
    });
 
}