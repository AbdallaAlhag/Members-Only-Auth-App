const { body, validationResult } = require('express-validator');


const signupValidationRules = [
    body('firstName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('First name is required')
        .bail()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),
    body('lastName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Last name is required')
        .bail()
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),
    body('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .bail()
        .isLength({ min: 2, max: 50 })
        .withMessage('Username must be between 2 and 50 characters'),
    body('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 8, max: 100 })
        .withMessage('Password must be between 8 and 100 characters'),
    body('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Confirm password is required')
        .bail()
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage('Passwords do not match'),
];

const validateSignup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorObject = {};
        errors.array().forEach(error => {
            errorObject[error.path] = error.msg;
        });
        return res.status(400).render('sign-up', {
            errors: errorObject,
            data: { firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username }
        });
    }
    next();
};

module.exports = {
    signupValidationRules,
    validateSignup
};