const express = require('express');
const router = express.Router();

// importing food schema
const FoodItem = require('./foodItem');
// db setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', () => {
  console.log('Failed to connect to database');
});

db.once('open', () => {
  console.log('Connected to database');
});
// routes using food item file
//get all
router.get('/',async (req,res,next) => {
    try {
        const foodItems = await FoodItem.find();
        res.status(200).json(foodItems);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    //get all items
    //res.status(200).json({
    //message: "Requests GET for all items handled"
    //});
});
//getting one item
router.get('/:itemId', getFoodItem, (req,res,next) => {
    
    res.status(200).json(
    res.foodItem
    );
});

//add one item
router.post('/', async (req,res,next) => {
    //get all items
    const foodItem = new FoodItem({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category
      });
    
      try {
            const newFoodItem = await foodItem.save();
            res.status(201).json(newFoodItem);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
});

//updating
router.put('/:id', getFoodItem, async (req, res) => {
    if (req.body.name != null) {
      res.foodItem.name = req.body.name;
    }
    if (req.body.description != null) {
      res.foodItem.description = req.body.description;
    }
    if (req.body.price != null) {
      res.foodItem.price = req.body.price;
    }
    if (req.body.imageUrl != null) {
      res.foodItem.imageUrl = req.body.imageUrl;
    }
    if (req.body.category != null) {
      res.foodItem.category = req.body.category;
    }
  
    try {
      const updatedFoodItem = await res.foodItem.save();
      res.status(200).json(updatedFoodItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
//deleting one item
router.delete('/foods/:id', async (req, res) => {
    try {
      const deletedFood = await FoodItem.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedFood);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;