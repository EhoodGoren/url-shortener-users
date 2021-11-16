require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

function authUser(req, res, next){
    const token = req.cookies.token;
    if(!token) return res.redirect('/login');
    jwt.verify(token, secret, (err, user) => {
        if(err) next({ status: 403, message:'Bad token'});
        req.user = user;
        next();
    })
}


module.exports = authUser;
