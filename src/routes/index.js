const router = require('express').Router();

router.use('/members', require('./members'));
router.use('/skills', require('./skills'));
router.use('/acts', require('./acts'));
router.use('/rights', require('./rights'));

module.exports = router;
