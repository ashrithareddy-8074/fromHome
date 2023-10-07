const Food = require('../models/Food');

module.exports.getAllFoodInfo = async (req, res) => {
    const foodInfo = await Food.find({});
    return res.status(200).json({ message:"success", foodInfo});
}

module.exports.addFoodInfo = async (req, res) => {
    const food = new Food(req.body);
    await food.save();
    return res.status(200).json({message:"successfully added info"});
}

module.exports.getFoodInfo = async (req, res) => {
    const {id} = req.params;
    const food = await Food.findById(id);
    return res.status(200).json({message:"success", food});
}

module.exports.editFoodInfo = async (req, res) => {
    const {id} = req.params;
    await Food.findByIdAndUpdate(id, {...req.body});
    return res.status(200).json({message:"successfully updated details"});
}

module.exports.deleteFoodInfo = async (req, res) => {
    const {id} = req.params;
    await Food.findByIdAndDelete(id);
    return res.status(200).json({message:"successfully deleted"});
}