const express = require('express');
const router = express.Router();
//uploading the user schema
const User = require('./userSchema');
// users to use for testing
const users = [
    {userId:1,
    name: 'John',
    email: 'j@gmail.com'},
    { userId:2,
    name: 'Mary',
    email: 'm@gmail.com'
}
];
//creating the routes
//new user
// POST: create a new user
router.post('/', async (req, res) => {
    const newUser = new User(req.body);
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
//get all users
router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
//get one user
router.get('/:id', getUser, (req, res) => {
    res.status(200).json(res.user);
});
//delete user by id
router.delete('/:id', getUser, async (req, res) => {
    try {
      await res.user.remove();
      res.status(204).json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

//middleware to select user by id
async function getUser(req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
    res.user = user;
    next();
};

module.exports = router;