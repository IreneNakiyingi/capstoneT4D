// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:3000/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());

// Sample data (can be replaced with a database)
let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

// above(for testing) or below (connecting to database)
// Define schema and model
const userSchema = new mongoose.Schema({
    name: String
  });
  const User = mongoose.model('User', userSchema);

// Routes users
app.get('/api/users',async (req, res) => {
  
  try{
    const users = await User.find();
    res.json(users);
  } catch (error){
    res.status(500).json({message: error.message});
  }
});

// get to get users info from db
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

//update and add new users
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updateUser = req.body;
  let userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[userIndex] = { ...users[userIndex], ...updateUser };
  res.json(users[userIndex]);
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

//admin

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});