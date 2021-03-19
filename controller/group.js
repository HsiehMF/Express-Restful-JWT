const mongoose = require('mongoose')
const Group = require('../models/group')
const Vocabulary = require('../models/vocabulary')

exports.getAllGroup = (req, res) => {
    Group.find()
        .exec()
        .then(result => {
            res.status(200).json({
                count: result.length,
                group: result.map(doc => {
                    return {
                        _id: doc._id,
                        vocabulary: doc.vocabulary,
                        vocDefinition: doc.vocDefinition,
                        request: {
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
    Vocabulary.findById(req.body.vocabularyId)
        .then(vocabulary => {
            if (!vocabulary) {
                return res.status(404).json({
                    message: "vocabulary not found, please input  prodoct of id rightly"
                })
            }
            const group = new Group({
                _id: mongoose.Types.ObjectId(),
                groupName: req.body.groupName,
                description: req.body.description,
                vocabularyId: req.body.vocabularyId
            })
            return group.save()
        })
        .then(result => {
            res.status(201).json({
                message: 'Group build',
                createdOrder: {
                    _id: result._id,
                    groupName: result.groupName,
                    description: result.description
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/group/' + result._id
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'We dont have this vocabulary',
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
                    message: 'Group not found'
                })
            }
            res.status(200).json({
                group: group,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/group'
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
                group: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/group'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
