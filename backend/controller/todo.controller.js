const Todo = require("../model/todo.model");

 const createTodo = async (req,res) =>{
    const todo = new Todo({
        text:req.body.text,
        completed:req.body.completed
    })

    try{
        const newTodo = await todo.save();
        res.status(201).json({message:"Todo Created Successfully ",newTodo});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"Error Occurred in Todo Creation"})
    }

}

const getTodo = async (req,res) =>{
    try{
        const todos = await Todo.find();
        res.status(201).json({message:"Todo Fetched Successfully",todos});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"Error occuring in todo fetching"});  
    }
}


const updateTodo =async (req,res) =>{
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
        });
        res.status(201).json({message:"Todo Updated Successfully",todo});

    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"Error occuring in updating Todo"});  

    }
}

const deleteTodo = async (req,res) =>{
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.status(201).json({message:"Todo deleted Successfully"});

    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"Error occuring in Deleting Todo"});  
    }
}

module.exports = { createTodo , getTodo,updateTodo, deleteTodo};  