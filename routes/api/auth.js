const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// @route     POST api/auth
// @desc      Authenticate User
// @access    Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    User.findOne({ email })
       .then(user => {
           if(!user) return res.status(400).json({ msg: 'User doesn\'t exist'});

            bcrypt.compare(password, user.password)
              .then(isMatch => {
                  if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                  jwt.sign(
                    { id: user.id }, 
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                     if(err) throw err;

                     res.json({
                         token: token,
                         user: {
                             id: user.id,
                             name: user.name,
                             email: user.email
                         }
                     })

                    }
                 )
              })
       })
});

// @route     GET api/auth/user
// @desc      Get user data
// @access    Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
})


module.exports = router;