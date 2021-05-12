const mongoose = require('mongoose')
const Group = require('../models/group')

exports.getAllGroup = (req, res) => {
    Group.find()
        .exec()
        .then(result => {
            res.status(200).json({
                count: result.length,
                output: result.map(doc => {
                    return {
                        _id: doc._id,
                        groupName: doc.groupName,
                        description: doc.description,
                        request_example: {
                            type: 'GET',
                            url: 'http://localhost:3000/group/' + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.createGroup = (req, res) => {
    Group.findById(req.body.groupName)
        .then(isGroupExist => {
            if (isGroupExist) {
                return res.status(404).json({
                    message: "群組已存在，請重新輸入"
                })
            }
            const group = new Group({
                _id: mongoose.Types.ObjectId(),
                groupName: req.body.groupName,
                description: req.body.description,
            })
            return group.save()
        })
        .then(result => {
            res.status(201).json({
                message: '群組建立成功',
                input: {
                    _id: result._id,
                    groupName: result.groupName,
                    description: result.description
                },
                request_example: {
                    type: 'GET',
                    url: 'http://localhost:3000/group/' + result._id
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: '非預期錯誤',
                error: err
            })
        })
}

exports.getGroupById = (req, res) => {
    Group.findById(req.params.groupId)
        .exec()
        .then(group => {
            if (!group) {
                return res.status(404).json({
                    message: '不存在該群組'
                })
            }
            res.status(200).json({
                output: {
                    _id: group._id,
                    groupName: group.groupName,
                    description: group.description
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: '錯誤，請輸入正確格式'
            })
        })
}

exports.deleteGroupById = (req, res) => {
    Group.remove({ _id: req.params.groupId })
        .exec()
        .then(result => {
            res.status(200).json({
                delete: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
