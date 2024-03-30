const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    //get all items
    res.status(201).json({
    message: "Requests GET for all items handled"
    });
});
//getting one item
router.get('/itemId', (req,res,next) => {
    //get all items
    res.status(201).json({
    message: "Requests GET for single item handled",
    orderId : req.params.orderId
    });
});

//add one item
router.post('/itemId', (req,res,next) => {
    //get all items
    res.status(201).json({
    message: "Requests post new item handled"
    });
});

//deleting one item
router.delete('/', (req,res,next) => {
    //get all items
    res.status(201).json({
    message: "Requests DELETE for item data handled"
    });
});
module.exports = router;