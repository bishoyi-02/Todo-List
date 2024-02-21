const mongoose =require("mongoose")
const Joi = require('joi')

const toDoSchema = new mongoose.Schema({
    toDo:{
        type:String,
        required:true
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
})



function validateTodo(todo){
    const validator = Joi.object({
        toDo:Joi.string().min(3).max(50).required()
    }).options({ abortEarly: false})
    return validator.validate(todo)
}

// exports.method=mongoose.model("ToDo",toDoSchema)
module.exports={ToDoModel : mongoose.model("ToDo",toDoSchema),
                validateTodo:validateTodo}
// module.exports={ToDoModel:mongoose.model("ToDo",toDoSchema)}