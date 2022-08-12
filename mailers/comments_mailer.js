const nodemailer = require('../config/nodemailer');


exports.newComment = (comment) => {
    console.log('inside newComment mailer');

    nodemailer.transporter.sendMail({
        from: 'comments@zsocial.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: '<h1>Yup, your comment is now published</h1>'
    }, (err, info) => {
        if(err){
            console.log('error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}