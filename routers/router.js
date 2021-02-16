const express = require("express");
const router = express.Router();
const user = require('../controllers/user/userCtrl');
const career = require('../controllers/carrer/careerCtrl');
const application = require("../controllers/application/appilicationCtrl");
const applicationzone = require("../controllers/application/adminzoneCtrl")



//https://sarfaroj94.netlify.app/home
//JobSeakhar site link
router.post("/register", user.Register)
router.post("/login", user.Login)
router.get('/user/:id', user.UserGet)
router.post('/user/:id', user.updated)
router.post("/career", career.Register)

//New Task Link
router.post("/adminzone", applicationzone.AdRegister)
router.post("/adminlog", applicationzone.Login)

router.get('/type/:id', applicationzone.UserType)

router.get('/active/:id', applicationzone.isActive)
router.get('/inactive/:id', applicationzone.Deactive)




router.post("/application", application.Applied)
router.post("/application/:id", application.AppUpdated)
router.post("/application2/:id", application.AppUpdated2)
router.post("/application2/:id", application.AppUpdated2)

router.get("/fatch/:jobrole/:location", application.Sarfaroj)




router.get("/applist", application.AppList)
router.get("/appdetail/:id", application.appDetails)
router.get("/userlist", applicationzone.userget)




router.get("/mail", user.SendMail)















router.get("/get", user.test)




module.exports = router;