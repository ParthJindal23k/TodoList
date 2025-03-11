const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    }
})

const todo = mongoose.model("Todo",todoSchema) ;

module.exports = todo;