const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db: 'z-social_development',
    google_client_id: 'Classified', 
    google_client_secret: 'Classified',
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'z-social',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name : 'production',
    asset_path : process.env.zsocial_asset_path,
    session_cookie_key : process.env.zsocial_session_cookie_key,
    db: process.env.zsocial_db,
    google_client_id: process.env.zsocial_google_client_id, 
    google_client_secret: process.env.zsocial_google_client_secret,
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : process.env.zsocial_jwt_secret,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.zsocial_environment == undefined? development : eval(process.env.zsocial_environment));
