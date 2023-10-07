const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const food = require('../controllers/food');

router.get('/', catchAsync(food.getAllFoodInfo));

router.post('/', catchAsync(food.addFoodInfo));

router.get('/:id', catchAsync(food.getFoodInfo));

router.put('/:id', catchAsync(food.editFoodInfo));

router.delete('/:id', catchAsync(food.deleteFoodInfo));

module.exports = router;