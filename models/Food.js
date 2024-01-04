const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    timings:
        {
            type: String
        },
    limit:
        {
            type: Number
        },
    menu:
    {
        type:mongoose.Schema.Types.Mixed
    },
    owner:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    cost:
    {
        type:Number
    },
    veg:
    {
        type:Boolean
    },
    addtionalItems:[
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('Food', FoodSchema);