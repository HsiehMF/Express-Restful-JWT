const Vocabulary = require('../models/vocabulary')
const mongoose = require('mongoose')

exports.getAllVocabulary = (req, res) => {
    // note: if data is null, mongodb will return [] instead of null.
    Vocabulary.find()
        .exec()
        .then(result => {
            res.status(200).json({
                output: result.map(doc => {
                    return {
                        _id: doc._id,
                        groupId: doc.groupId,
                        vocabulary: doc.vocabulary,
                        vocDefinition: doc.vocDefinition
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

exports.createVocabulary = (req, res) => {
    const vocabulary = new Vocabulary({
        _id: new mongoose.Types.ObjectId(),
        groupId: req.body.groupId,
        vocabulary: req.body.vocabulary,
        vocDefinition: req.body.vocDefinition
    })
    vocabulary.save()
        .then(result => {
            res.status(200).json({
                message: '新增單字成功',
                input: {
                    _id: result._id,
                    groupId: result.groupId,
                    vocabulary: result.vocabulary,
                    vocDefinition: result.vocDefinition
                }
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.getVocabularyById = (req, res) => {
    const id = req.params.vocabularyId
    Vocabulary.findById(id)
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    result: {
                        _id: result._id,
                        groupId: result.groupId,
                        vocabulary: result.vocabulary,
                        vocDefinition: result.vocDefinition
                    }
                })
            } else {
                res.status(404).json({
                    message: '查詢不到該筆單字'
                })
            }
        }).catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.updateVocabularyById = (req, res) => {
        const id = req.params.vocabularyId
        const updateOps = {}
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value                          // propName 為使用者欲修改的 key
        }
        Vocabulary.updateOne({ _id: id }, { $set: updateOps })  // 第一個參數為 _id，第二個參數為傳入的更改內容
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "更新成功",
                    result: {
                        _id: result._id,
                        groupId: result.groupId,
                        vocabulary: result.vocabulary,
                        vocDefinition: result.vocDefinition
                    }
                })
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            })
}

exports.deleteVocabulary = (req, res) => {
    const id = req.params.vocabularyId
    Vocabulary.remove({ _id : id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
