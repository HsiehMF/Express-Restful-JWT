const express = require('express')
const router = express.Router()
const vocabularyController = require('../controller/vocabulary')

router.get('/', vocabularyController.getAllVocabulary)
router.post('/', vocabularyController.createVocabulary)
router.get('/:vocabularyId', vocabularyController.getVocabularyById)
router.patch('/:vocabularyId', vocabularyController.updateVocabularyById)
router.delete('/:vocabularyId', vocabularyController.deleteVocabulary)

module.exports = router
