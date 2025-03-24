const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Cors
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

// Upload imagens
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB connection
require("./config/db.js");

//Routes
const router  = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});