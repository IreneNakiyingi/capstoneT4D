const express = require('express');
const router = express.Router();

// users to use for testing
const users = [
    {id:1,
    name: 'John',
    email: 'j@gmail.com'},
    { id:2,
    name: 'Mary',
    email: 'm@gmail.com'
}
];
//creating the routes
router.get('/', (req, res,next) => {
    res.status(200).json({
        message: "Requests GET for user data handled",
        users : users
    });
});
router.post('/', (req, res,next) => {
    res.status(200).json({
        message: "Adding POST user data handled",
        user : [
            {id :3, name: 'Tom', email: 't@gmail.com'}
        ]
    });
});

//single user
router.get('/:userId', (req, res,next) => {
    const userId = req.params.userId;
    if (userId === 'special'){
       res.status(200).json({
        message: "Requests GET for user id handled",
        userId : userId
    }); 
    } else {
        res.status(200).json({
            message: "Id noted"
        });

    }
    
});
// patch
router.patch('/:userId', (req, res,next) => {
    
        res.status(200).json({
            message: "Id updated"
        });

    
});
// delete
router.delete('/:userId', (req, res,next) => {
    
    res.status(200).json({
        message: "Id deleted"
    });


});

module.exports = router;