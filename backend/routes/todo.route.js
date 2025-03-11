const express = require("express");
const { createTodo, getTodo, updateTodo, deleteTodo } = require("../controller/todo.controller");

const router= express.Router();

router.post('/create',createTodo);
router.get('/fetch',getTodo); 
router.put('/update/:id',updateTodo);
router.delete('/delete/:id',deleteTodo);

module.exports = router; 