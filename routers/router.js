const express = require("express");
const router = express.Router();
const user = require('../controllers/user/userCtrl');
const career = require('../controllers/carrer/careerCtrl')



router.post("/register", user.Register)
router.post("/login", user.Login)
router.get('/user/:id', user.UserGet)
router.post('/user/:id', user.updated)

router.post("/career", career.Register)















router.get("/get", user.test)




module.exports = router;