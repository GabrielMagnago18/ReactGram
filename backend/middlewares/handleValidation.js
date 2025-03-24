const {validationResult} = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req); //Pega os erros da requisição
    const extractedErrors = []

    //Se n tiver erro, a requisição continua
    if(errors.isEmpty()) {
        return next();
    }

    errors.array().map((err) => extractedErrors.push(err.msg));

    return res.status(422).json({
        errors: extractedErrors
    });
}

module.exports = validate;
