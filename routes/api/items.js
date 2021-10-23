const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route     GET api/items
// @desc      Get All Items
// @access    Privates
router.get('/', auth, (req, res) => {
    const token = req.header('x-auth-token');
    const userID = jwt.verify(token, config.get('jwtSecret'));
    Item.find({ id: userID })
        .sort({ date: -1 })
        .then(items => res.json(items));
});

// @route     POST api/items
// @desc      Create an Item
// @access    Private
router.post('/', auth, (req, res) => {
    const token = req.header('x-auth-token');
    const userID = jwt.verify(token, config.get('jwtSecret'));
    
    const newItem = new Item({
        name: req.body.name,
        id: userID
    });

    newItem.save().then(item => {
        res.json(item);
    });
});


// @route     DELETE api/items
// @desc      Delete an Item
// @access    Private
router.delete('/:uid/:name', auth, (req, res) => {
    /* Item.findById(req.params.id)``
        .then(item => {
            item.remove().then(() => res.json({success: true}))
        }).catch(err => res.status(404).json({success: false})); */
    Item.find({ id: req.params.uid, name: req.params.name })
    .then(item => {
        item.remove().then(() => res.json({success: true}))
    }).catch(err => res.status(404).json({success: false}));
});


module.exports = router;