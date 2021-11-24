const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
// const errorHandler = require("../../utils/errorHandler/errorHandler");


async function userSignUp (req,res){
    const {firstName , lastName, userName, email, password} = req.body;
    try{
        //masks the user password
        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password,salt);
        //create a new User
        const createUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: hashed,
        });
        //save the new User info
        let savedUser = await createUser.save();
        res.json({message: "Success", payload: savedUser});
    }catch(e){
        res.status(500).json({message: "Create Error", error: e.message});
    };
};


async function userLogin (req, res){
    const {email, password} = req.body;
    try{
        let foundUser = await User.findOne({email: email});
        //check if User exists
        if(!foundUser){
            return res.status(500).json({
                message: "Login Error",
                error: "Please Sign Up",
            });
        }else{
            //check if the password matches the password of the User found
            let matchedPassword = await bcrypt.compare(password, foundUser.password);
            if(!matchedPassword){
                return res.status(500).json({
                    message: "Login Error",
                    error: "please check email and password",
                });
            }else{
                let jwtToken = jwt.sign({
                    email:foundUser.email,
                    userName: foundUser.userName,
                },
                process.env.JWT_SECRET,
                {expiresIn: "48h"},
                );
                res.json({message: "Login Success", payload: jwtToken});
            };
        };
    }catch(e){
        res.status(500).json({message: "Login Error", error: e.message});
    };
};

async function updateUser(req,res){
    try{

        const {password} = req.body;

        const decodedData = res.locals.decodedData;

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        req.body.password = hashedPassword;

        let updateUser = await User.findOneAndUpdate(
            {email: decodedData.email},
            req.body,
            {new: true}
        );

        res.json({
            message: "success",
            payload: updateUser,
        });
    }catch(e){
        res.status(500).json({message: "error", error: e.message});
    }
}

module.exports = {
    userSignUp,
    userLogin,
    updateUser,
};

