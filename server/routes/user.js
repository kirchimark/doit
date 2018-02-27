const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('jsonwebtoken');

const secretKey = require('../constants').secretKey;

router.post('/signup', async (req, res , next) => {
    try {
        const user =  await User.find({email:  req.body.email}).exec();
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'mail exists',
                success: false,
            })
        }

        bcrypt.hash(req.body.password , 10 , async (err , hash) => {
        if (err) {
            return res.status(500).json({
                error: err,
                success: false,
             });
            }

        let newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
        });

        let result = await newUser.save();
        const token = jwt.sign({email: newUser.email , newUser: user._id },
            secretKey,
            {
                expiresIn: '1d',
            });

        res.status(201).json({
            _id: newUser._id,
            message: 'User created',
            success: true,
            token,
        });

        })
    } catch (e) {
        res.status(409).json({
            message: 'User wan\'t created',
            success: false,
        })
    }
});

router.post('/login', async (req , res , next) => {
    try {
        const user = await User.find({email: req.body.email}).exec();
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth fail',
                success: false
            })
        }

        bcrypt.compare(req.body.password , user[0].password , (err , hash) => {
            if (err) {
                return res.status(401).json({ message: 'Auth failed' , success: false})
            }

            if (hash) {
                const token = jwt.sign({email: user[0].email , userId: user[0]._id },
                        secretKey,
                        {
                            expiresIn: '1d',
                        });

                return res.status(200).json({
                    _id: user[0]._id,
                    message: 'Auth was successfull',
                    success: true,
                    token,
                })
            }
        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server error',
            success: false,
        })
    }
});

module.exports = router;