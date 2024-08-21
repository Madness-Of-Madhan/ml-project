import React, { useState } from "react";
import TodoForm from './TodoForm';
import {v4 as uuidv4} from 'uuid';
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
uuidv4();
const TodoWrapper =()=>
{
    const[todos,setTodos] =useState([]) 
    const[isEditing,setIsEditing]=useState(false);
    const addTodo =(todoText)=>
    {
        setTodos([...todos,{id:uuidv4(),task:todoText,completed:false,isEditing:false}])
        console.log(todos)
    }
    const toggleComplete =(id)=>
    {
        setTodos(todos.map(todo=>todo.id===id?{...todo,completed: !todos.completed}:todo));
    }
    const deleteTodo =(id)=>
    {
        setTodos(todos.filter(todo=>todo.id !==id))

    }
    const editTodoForm = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
        setIsEditing(true); // Set isEditing to true when editing
    };

    const editTask = (editedTask, id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task: editedTask, isEditing: false } : todo));
        setIsEditing(false); // Set isEditing to false after editing
    };
    return(
        <div className="TodoWrapper">
            <h1>Stuffs To Done!</h1>
            <TodoForm addTodo={addTodo}/>
            {todos.map((todo, index) => (
                isEditing ?(
                    <EditTodoForm editTodo={editTask} task={todo}/>
                ):
                (
                <Todo task={todo} key={index}
                toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodoForm={editTodoForm}/>
                )
                
            ))}
        </div>
    )
}
export default TodoWrapper;