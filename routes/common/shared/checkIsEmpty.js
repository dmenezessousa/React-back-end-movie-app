const {isEmpty} = require("validator");

function checkIsEmpty (req, res, next){
    let body = req.body;
    let errObj = {};

    //loop through the array and check if there is an empty space
    for(let key in body){
        if(isEmpty(body[key])){
            errObj[`${key}`] = `${key} cannot be empty`;
        }
    }

     //check if its empty
    if(Object.keys(errObj).length > 0){
        return res.status(500).json({
            message: "error",
            error: errObj,
        })
    }else{
        next();
    }
}

module.exports = {
    checkIsEmpty,
}