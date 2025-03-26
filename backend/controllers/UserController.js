const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET;

// Cria um JWT com base no id do usuário
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d"
    })
}

//Registro do usuário
const register = async(req, res) => {
    const {name, email, password} = req.body

    const user = await User.findOne({email})
    // Verifica se o email já existe
    if(user) { 
        res.status(422).json({errors: ["Utilize outro email"]})
        return;
    }

    const salt = await bcrypt.genSalt(); //valor aleatório adicionado à senha (deixa mais seguro)
    const passwordHash = await bcrypt.hash(password, salt);

    //Cria um novo usuário (mongoose)
    const newUser = await User.create({
        name,
        email, 
        password: passwordHash
    })

    if(!newUser) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde"]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

const login = async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user) {
        res.status(404).json({errors: ["Usuário não encontrado"]})
        return
    }

    if(!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({errors: ["Senha inválida."]})
    }

    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })
}

module.exports = {
    register,
    login,
}