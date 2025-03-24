const express = require("express")
const router = express.Router();

router.use("/api/users", require("./UserRoutes") )

// test route
router.get("/", (req, res) => {
    res.send("Api funcionando");
});

module.exports = router;