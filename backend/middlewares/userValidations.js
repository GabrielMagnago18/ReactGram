const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString() // Verifica se tem algo escrito
      .withMessage("O nome é obrigatório") // Mensagem de erro
      .isLength({ min: 3 }) // Tamanho mínimo 
      .withMessage("O nome precisa ter no mínimo 3 caracteres"),
      
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório")
      .isEmail() // Função do express-validator pra verificar se é email
      .withMessage("Insira um e-mail válido"),

    body("password")
      .isString()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres"),
    
    body("confirmpassword")
      .isString()
      .withMessage("Confirme a senha")
      .custom((value, {req}) => {
        if(value != req.body.password) {
            throw new Error("As senhas precisam ser iguais.")
        }
        return true; 
      })
  ];
};

module.exports = {
  userCreateValidation,
};
