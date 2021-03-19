const Vocabulary = require('../models/vocabulary')
const mongoose = require('mongoose')

exports.getAllVocabulary = (req, res) => {
    // note: if data is null, mongodb will return [] instead of null.
    Vocabulary.find()
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
                message: '[POST] 新增單字 to /vocabulary',
                createdVocabulary: vocabulary
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
                res.status(200).json(result)
            } else {
                res.status(404).json({
                    message: '查詢不到此筆單字'
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
            updateOps[ops.propName] = ops.value    // Client 需要傳入陣列包著 JSON 格式，propName 為 Schema 定義的屬性名稱
        }
        Vocabulary.updateOne({ _id: id }, { $set: updateOps })  // 第一個參數為 _id，第二個參數須更改的資料內容 (定義的屬性, value)
            .exec()
            .then(result => {
                console.log(result)
                res.status(200).json(result)
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
