const router = require('express').Router();

// Delegate routing to specialized modules.
router.use('/members', require('./members'));
router.use('/skills', require('./skills'));
router.use('/acts', require('./acts'));
router.use('/roles', require('./roles'));
router.use('/powers', require('./powers'));

module.exports = router;
