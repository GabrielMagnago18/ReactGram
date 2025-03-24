const mongoose = require("mongoose");

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const connect = async () => {
    try {
        const dbConnect = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wv7ow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );
        console.log("conectou ao banco");
        return dbConnect 
        
    } catch (error) {
        console.log(error)
    }
}

connect();

module.exports = connect