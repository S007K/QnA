
import JWT from 'jsonwebtoken';


// protected route using token
export const requireSignIn = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
};

