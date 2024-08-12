var express = require('express');
var router = express.Router();
const {infomembers}=require('../controllers/api/index')

/* GET users listing. */
router.get('/', infomembers );

module.exports = router;
