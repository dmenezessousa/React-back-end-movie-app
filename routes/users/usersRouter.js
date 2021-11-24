const express = require("express");
const router = express.Router();

const {
    userSignUp,
    userLogin,
    updateUser,
} = require("./controller/userController");


const {
    checkIsEmpty,
    checkIsUndefined,
    validateCreateData,
    validateLoginData,
    validateUpdateData,
} = require("../common");

const {jwtMiddleware} = require("../common/shared/jwtMiddleware");


router.post("/create-user",
    checkIsUndefined,
    checkIsEmpty,
    validateCreateData,
    userSignUp,
);

router.post("/login",
    checkIsUndefined,
    checkIsEmpty,
    validateLoginData,
    userLogin,
);

router.put("/update-profile",
    jwtMiddleware,
    checkIsUndefined,
    checkIsEmpty,
    // validateUpdateData,
    updateUser,
);


module.exports = router;