const express = require('express');
const router = express.Router();
const {
    createUsers,login
    } 
 = require('../controllers/users');

router.post('/',createUsers);
router.post('/login',login);


module.exports = router;