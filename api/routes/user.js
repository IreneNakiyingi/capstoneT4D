const express = require('express');

//uploading the user schema
const userSchema = require('./userSchema');
const User = require('./userSchema');
const router = new express.Router();

//auth token
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString()},
  process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
};

// users to use for testing
const newUser = new User (
    {
    name: 'John',
    email: 'j@gmail.com',
    password: 'free',
    createdAt: Date },

    );
newUser.save((err) => {
  if (err) return console.error(err);
  console.log('User added');
});
// adding new user to db

//creating the routes

//login new user
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
      throw new Error('Unable to log in');
  }
  const isMatch = await bcrypt.compare(password, user.password)
  console.log(isMatch)
  if(!isMatch) {
      throw new Error('Unable to login');
  }

  return user
};

//hashing passowrd before proceeding
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 7);
  }

  next();
});
//new user
// POST: create a new user
router.post('/user/:id', async (req, res) => {
    const newUser = new User(req.body);
  
    try {
      const savedUser = await newUser.save();
      //?gen auth token
      User.findByCredentials(req.body.email, req.body.password)
      const token = await savedUser.generateAuthToken()
      res.send({ savedUser, token})
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
//get all users
router.get('/user', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
//get one user
router.get('/user/:id', getUser, (req, res) => {
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


//logout routes
//single logout
router.post('/user/logout', Auth, async (req, res) => {
  try {
      req.user.tokens =  req.user.tokens.filter((token) => {
     return token.token !== req.token;
    })
      await req.user.save();
      res.send()
  } catch (error) {
      res.status(500).send();
  }
});
module.exports = router;