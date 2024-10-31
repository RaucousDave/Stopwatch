import React, {useState} from "react"

function TodoList(){

    const [tasks, setTasks] = useState([])
    const handleRemoveTask = (index) => {

        setTasks(tasks.filter((_element, i) => !i == index))
    }

    const handleAddTask = () => {
        const newTask = document.getElementById("task-field").value;
        document.getElementById("task-field").value = "";
        setTasks(t => [...t, newTask])
    }
    return(
        <div id="container">
            <h1>Todo List</h1>
            <div>
            <input type="text" id="task-field" />
            <button onClick={handleAddTask}>Add</button>
            </div>
            <div id="task-container">
            <ul>
                {tasks.map((task, index) => <li key={index} onClick={() => handleRemoveTask(index)}>{task}</li>)}
            </ul>
            </div>
        </div>
    )
}

export default TodoList