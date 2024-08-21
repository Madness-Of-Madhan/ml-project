
import React from "react";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import DeleteIcon from '@mui/icons-material/Delete';

const Todo = ({ task, toggleComplete,deleteTodo,editTodoForm }) => {
    const { id, task: taskText, completed } = task;

    const handleToggleComplete = () => {
        toggleComplete(id);
    };

    return (
        <div className="Todo" style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            <p onClick={handleToggleComplete}>{taskText}</p>
            <div>
                <HistoryEduIcon onClick={()=>editTodoForm(task.id)} />
                <DeleteIcon onClick={()=>deleteTodo(task.id)}/>
            </div>
        </div>
    );
};

export default Todo;
