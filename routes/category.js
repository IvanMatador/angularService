const { response } = require('express');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/category');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll); //стратегия паспорта (passport-__JWT__ например) (не имя переменной)
router.post('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/', controller.create);
router.patch('/:id', controller.update);


module.exports = router;