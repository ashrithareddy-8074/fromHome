const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestsSchema = new Schema({
    owner:
    {
        type: mongoose.Schema.Types.Mixed
    },
    quantity:
    {
        type:Number
    },
    specifications:[
        {
            type: String
        }
    ]
})