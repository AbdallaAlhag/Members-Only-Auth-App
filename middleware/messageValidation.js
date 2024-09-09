const { body, validationResult } = require('express-validator');


const messageValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required')
];

const validateMessage = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorObject = {};
        errors.array().forEach(error => {
            errorObject[error.path] = error.msg;
        });
        return res.status(400).render('create', {
            errors: errorObject,
            data: { title: req.body.title, content: req.body.content }
        });
    }
    next();
};

module.exports = {
    messageValidationRules,
    validateMessage
};