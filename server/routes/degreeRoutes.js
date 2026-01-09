const express = require('express');
const router = express.Router();
const degreeController = require('../controllers/degreeController');

router.get('/', degreeController.getAllDegrees);
router.get('/:id', degreeController.getDegreeById);
router.post('/', degreeController.createDegree);
router.put('/:id', degreeController.updateDegree);
router.delete('/:id', degreeController.deleteDegree);

module.exports = router;
