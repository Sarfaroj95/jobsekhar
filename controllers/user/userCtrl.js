const User = require('../../model/user/user')
const { normalizeErrors } = require('../../helper/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config/dev')
const bcrypt = require('bcrypt');




// User Register

exports.Register = function (req, res) {
    const { fname, lname, phone, email, password } = req.body;

    if (!fname) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide first name!' }] });
    }
    if (!lname) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide last name!' }] });
    }
    if (!phone) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide phone number!' }] });
    }

    if (!email) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide email id!' }] });

    }
    if (!password) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide  password!' }] });

    }

    User.findOne({ email }, function (err, existingUser) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (existingUser) {
            return res.status(422).send({ errors: [{ title: 'Invalid email', details: 'Email is alredy exist' }] });

        }
        User.findOne({ phone }, function (err, existingUser) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (existingUser) {
                return res.status(422).send({ errors: [{ title: 'Invalid Phone number', details: 'Phone number is alredy exist' }] });

            }


            const user = new User({
                fname,
                lname,
                phone,
                email,
                password,
            });

            user.save(function (err) {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }

                return res.json({ msg: 'Register is successfull', data: user.isActived });
            })
        })
    })
    // res.json({username, email});
};

// User Login
exports.Login = function (req, res) {
    const { email, password } = req.body;

    if (!password || !email) {
        res.status(422).send({ errors: [{ title: 'Data missing!', details: 'Provide email and password!' }] });
    }

    User.findOne({ email }, function (err, user) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!user) {
            return res.status(422).send({ errors: [{ title: 'Invalid User', details: 'User does not exist' }] });
        }

        //     if (!user) {
        //         return res.status(422).send({
        //             errors: [
        //                 { title: "Invalid User", details: "Please Check Email or Password" }
        //             ]
        //         });
        //     }
        //     return res.json({ success: true, data: user._id });
        // });
        // bcrypt.compare(req.body.password, hash, function (err, res) {
        //     if (res == true) {
        //         console.log("password", res)
        //         res.json({ msg: "Update is successfull", res });

        //     }
        // });

        // bcrypt.hash(req.body.password, 10, function (err, hash) {
        //     console.log(hash);

        // });

        // bcrypt.compare(req.body.password, '$2b$10$yO7wnQETdjG2JcZkaD.x5OzCUBEu6lP6aVF4gy4octEKNgLjWvTjW', function (err, res) {
        //     if (res) {
        //         console.log('Your password mached with database hash password', res.password);
        //     } else {
        //         console.log('Your password not mached.');
        //     }
        // });

        if (user.hasSamePasswrod(password)) {

            const token = jwt.sign({
                userId: user.id,
                email: user.email
            }, config.SECRET, { expiresIn: '1h' });

            return res.json({ msg: 'succes', token: token, id: user._id });
        } else {
            res.status(422).send({ errors: [{ title: 'Wrong Data', details: 'Wrong email or password' }] });
        }
    });
}
exports.UserGet = function (req, res) {
    User.findById({ _id: req.params.id })
        .select('fname')
        .select('lname')
        .select('phone')
        .select('email')
        .exec(function (err, foundCou) {
            res.json(foundCou);
        });
}



exports.updated = function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            {
                fname: req.body.fname,
                lname: req.body.lname,
                password: hash,
                createdAt: new Date().toISOString()
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
    });
}


exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const user = parseToken(token);
        User.findById(user.userId, function (err, user) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (user) {
                res.locals.user = user;
                next();
            } else {
                return notAuthirized(res);
            }
        });
    } else {
        return notAuthirized(res);
    }
};

exports.CourseGet = function (req, res) {
    User.find({})
        .select('title')

        .exec(function (err, foundCou) {

            res.json(foundCou);
        });
}





// for Test
exports.test = function (req, res) {
    res.json("I am getting ");
}

//exports.update = function (req, res) {
//     User.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//             fname: req.body.fname,
//             lname: req.body.lname,
//             email: req.body.email,
//             password: req.body.password

//         },
//         {
//             new: true
//         },
//         (err, doc) => {
//             if (err) {
//                 return res.status(422).send({ errors: normalizeErrors(err.errors) });
//             } else {
//                 res.json({ success: true });
//                 console.log("Updated...");
//             }
//         }
//     );
// };
