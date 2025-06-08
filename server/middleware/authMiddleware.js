const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY || secret123456


const protect = async(req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "No token provided"})
    }

    const token = authHeader.split(' ')[1];

    try{
        //Attaches req.user with user
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }
    catch(err){
        res.status(401).json({message: "Invalid token"});
    }
}

module.exports = protect;