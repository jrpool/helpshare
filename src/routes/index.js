const router = require('express').Router();

router.use('/members', require('./members'));
router.use('/skills', require('./skills'));
router.use('/acts', require('./acts'));
router.use('/powers', require('./powers'));

module.exports = router;
