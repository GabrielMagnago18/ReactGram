const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  {
    timestamps: true, //Cria a Data e hora da criação e da última atualização no BD
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;