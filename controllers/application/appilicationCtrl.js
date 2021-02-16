const Application = require('../../model/application/application')
const { normalizeErrors } = require('../../helper/mongoose');

//LOGIN SYSTEM


// Application register form
exports.Applied = function (req, res) {
    const { name, email, phone, current_organization, jobrole, workstatus, location } = req.body;



    Application.findOne({ email }, function (err, existingUser) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (existingUser) {
            return res.status(422).send({ errors: [{ title: 'Invalid email', details: 'Email is alredy exist' }] });

        }
        Application.findOne({ phone }, function (err, existingUser) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (existingUser) {
                return res.status(422).send({ errors: [{ title: 'Invalid phone', details: 'Phone number is alredy exist' }] });

            }
            const application = new Application({
                name,
                email,
                phone,
                current_organization,
                jobrole,
                workstatus,
                location
            });

            application.save(function (err) {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }

                return res.json({ msg: 'Application is successfull', data: application.name, id: application._id });
            })
        })
    })
    // res.json({username, email});
};


// Update App
exports.AppUpdated = function (req, res) {

    Application.findOneAndUpdate(
        { _id: req.params.id },
        {
            total_technology: req.body.total_technology,
            skillrate: req.body.skillrate,
            skill: req.body.skill,
            overall: req.body.overall,

            joindate: req.body.joindate,
            cctc: req.body.cctc,
            ectc: req.body.ectc,
            reason: req.body.reason,



        },
        {
            new: true
        },
        (err, doc) => {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            } else {
                res.json({ msg: "Update is successfull" });
                console.log("Updated...");
            }
        }
    );
    // console.log("User data", user)

}

exports.AppUpdated2 = function (req, res) {

    Application.findOneAndUpdate(
        { _id: req.params.id },
        {
            joindate: req.body.joindate,
            cctc: req.body.cctc,
            ectc: req.body.ectc,
            reason: req.body.reason,
        },
        {
            new: true
        },
        (err, doc) => {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            } else {
                res.json({ msg: "Update is successfull" });
                console.log("Updated...");
            }
        }
    );
    // console.log("User data", user)

}

// GET ALL DATA FROM TABLE
exports.AppList = function (req, res) {
    Application.find({})
        .select("name")
        .select("email")
        .select("phone")
        .select("location")
        .select("workstatus")
        .select("jobrole")
        .select("cctc")
        .select("ectc")
        .select("joindate")
        .exec(function (err, foundApplications) {
            res.json(foundApplications);
        });
};


exports.Sarfaroj = function (req, res) {

    var jobrole = req.params.jobrole;
    var regex = req.params.location;

    Application.find({ jobrole: jobrole, location: regex })
        .then(data => {
            res.status(200).json(data)
        })
}



exports.appDetails = function (req, res) {
    Application.findById({ _id: req.params.id })
        .select('name')
        .select('email')
        .select('phone')
        .select('current_organization')
        .select('jobrole')
        .select('workstatus')
        .select('location')
        .select('cctc')
        .select('ectc')
        .select('joindate')
        .select('overall')
        .select('reason')
        .select('skill')
        .select('skillrate')
        .select('total_technology')
        .exec(function (err, foundCou) {
            res.json(foundCou);
        });
}


exports.Test = function (req, res) {
    res.json("I am getting ");
    console.log("hey u Whats happend...")
}