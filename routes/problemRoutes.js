const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');

router.post('/problems', problemController.createProblem);
router.get('/problems', problemController.getProblems);
router.put('/problems/:id', problemController.updateProblem);
router.delete('/problems/:id', problemController.deleteProblem);

module.exports = router;
