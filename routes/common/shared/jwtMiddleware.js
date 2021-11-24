const jwt = require("jsonwebtoken");

function jwtMiddleware (req,res , next){
    try{
            if (req.headers && req.headers.authorization) {
                let notDecodedToken = req.headers.authorization;

                let extractToken = notDecodedToken.slice(7);

                let decodedToken = jwt.verify(extractToken, process.env.JWT_SECRET);
                
                res.locals.decodedData = decodedToken;
                next();

            }else{
                throw { message: "You dont have permission"};
            }

    }catch(e){
        console.log(e);
        res.status(500).json({message: "error", error: e.message});
    }
}

module.exports = {
    jwtMiddleware,
};