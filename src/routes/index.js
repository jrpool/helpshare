const router = require('express').Router();

router.use('/members', require('./members'));
router.use('/skills', require('./skills'));
router.use('/acts', require('./acts'));
router.use('/agents', require('./agents'));

module.exports = router;
