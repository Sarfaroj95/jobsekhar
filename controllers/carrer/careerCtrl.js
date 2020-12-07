const Career = require('../../model/career/career')
const { normalizeErrors } = require('../../helper/mongoose');





exports.Register = function (req, res) {
    const { fullname, email, phone, cityname, jobtype, salaryrange, arefresher, startdate } = req.body;



    Career.findOne({ email }, function (err, existingUser) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (existingUser) {
            return res.status(422).send({ errors: [{ title: 'Invalid email', details: 'Email is alredy exist' }] });

        }
        Career.findOne({ phone }, function (err, existingUser) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (existingUser) {
                return res.status(422).send({ errors: [{ title: 'Invalid phone', details: 'Phone number is alredy exist' }] });

            }



            const career = new Career({
                fullname,
                email,
                phone,
                cityname,
                jobtype,
                salaryrange,
                arefresher,
                startdate
            });

            career.save(function (err) {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }

                return res.json({ msg: 'Register is successfull', data: career.arefresher });
            })
        })
    })
    // res.json({username, email});
};




exports.Test = function (req, res) {
    res.json("I am getting ");
    console.log("hey u Whats happend...")
}