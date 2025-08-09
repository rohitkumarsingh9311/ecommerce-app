
import jwt from  'jsonwebtoken';

const authUser = async (req, res, next) =>{
    const {token} = req.headers;

    if(!token) {
        return res.json({success : false, message: 'Not authrized login again'})
    }

    try {
        const token_decord=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decord.id;
        next();
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
} 

export default authUser;
