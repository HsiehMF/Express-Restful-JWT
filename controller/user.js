const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.userRegister = (req, res) => {
    User.find({  email: req.body.email  })
        .exec()
        .then(email => {
            if (email.length > 1) {
                return res.status(409).json({
                    message: '此信箱已被註冊'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hashPassword
                        })
                        user.save()
                            .then(result => {
                                res.status(200).json({
                                    message: '註冊成功'
                                })
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
}

exports.userLogin = (req, res) => {
    User.find({  email: req.body.email  })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(404).json({
                message: '帳號不存在或密碼錯誤，請重新輸入'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: '帳號不存在或密碼錯誤，請重新輸入'
                })
             }
            if (result) {
                    const token = jwt.sign({
                        userId: user[0]._id,
                        email: user[0].email
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                )
                return res.status(200).json({
                    message: '登入成功',
                    token: token
                })
            }
         })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.userDelete = (req, res) => {
    User.remove({  _id: req.params.userId  })
        .exec()
        .then(result => {
            res.status(200).json({
                message: '使用者註銷'
            }) 
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
