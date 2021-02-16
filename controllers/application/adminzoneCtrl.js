const { normalizeErrors } = require('../../helper/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config/dev')
const bcrypt = require('bcrypt');
const Adminzone = require('../../model/application/adminzone')




exports.AdRegister = function (req, res) {
    const { name, email, password, userType } = req.body;

    if (!name) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide name!' }] });
    }


    if (!email) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide email id!' }] });

    }
    if (!password) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide  password!' }] });

    }
    if (!userType) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide  usertype!' }] });

    }

    Adminzone.findOne({ email }, function (err, existingUser) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (existingUser) {
            return res.status(422).send({ errors: [{ title: 'Invalid email', details: 'Email is alredy exist' }] });

        }
        const adminzone = new Adminzone({
            name,
            email,
            password,
            userType
        });

        adminzone.save(function (err) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            return res.json({ msg: 'Register is successfull', data: adminzone.isActived });
        })

    })
    // res.json({username, email});
};


// ADMIN LOGIN 
exports.Login = function (req, res) {
    const { email, password, userType } = req.body;

    if (!password || !email || !userType) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide email and password!' }] });
    }

    Adminzone.findOne({ email }, function (err, adminzone) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!adminzone) {
            return res.status(422).send({ errors: [{ title: 'Invalid User', details: 'User does not exist' }] });
        }
        Adminzone.findOne({ userType }, function (err, adminzone) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (!adminzone) {
                return res.status(422).send({ errors: [{ title: 'Invalid User', details: 'User Type does not exist' }] });
            }

            if (adminzone.hasSamePasswrod(password)) {

                const token = jwt.sign({
                    userId: adminzone.id,
                    email: adminzone.email,
                    userType: adminzone.userType
                }, config.SECRET, { expiresIn: '1h' });

                return res.json({ msg: 'succes', token: token, id: adminzone._id, status: adminzone.isActived, userType: adminzone.userType });
            } else {
                res.status(422).send({ errors: [{ title: 'Wrong Data', details: 'Wrong email or password' }] });
            }
        });
    });
}


exports.UserType = function (req, res) {
    Adminzone.findById({ _id: req.params.id })
        .select('isActived')
        .select('userType')
        .select('isActived')

        .exec(function (err, foundCou) {
            res.json(foundCou);
        });
}




exports.isActive = function (req, res) {
    Adminzone.findOneAndUpdate(
        { _id: req.params.id },
        {
            isActived: true,
        },
        {
            new: true
        },
        (err, doc) => {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            } else {
                res.json({ msg: "Active is successfull" });

            }
        }
    );

}

exports.Deactive = function (req, res) {
    Adminzone.findOneAndUpdate(
        { _id: req.params.id },
        {
            isActived: false,
        },
        {
            new: true
        },
        (err, doc) => {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            } else {
                res.json({ msg: "Deactive is successfull" });
            }
        }
    );

}


exports.userget = function (req, res) {
    Adminzone.find({})
        .select('name')
        .select('email')
        .select('userType')
        .select('isActived')

        .exec(function (err, foundCou) {

            res.json(foundCou);
        });
}






//TEST SERVER RUN
exports.test = function (req, res) {
    res.json("I am getting ");
}