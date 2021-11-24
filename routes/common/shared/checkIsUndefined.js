function checkIsUndefined(req, res, next){
    let body = req.body;
    if(Object.keys(body).length === 0 || body === undefined){
        return res.status(500).json({
            message: "Failure",
            error: "Please Fill out the form"
        });
    }else{
        next();
    }
}

module.exports = {
    checkIsUndefined,
};