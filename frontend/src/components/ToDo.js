import React from "react";



const ToDoItem = ({todo}) => {

    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.create}</td>
            <td>{todo.project}</td>
            <td>{todo.clients}</td>
        </tr>
    )
}


const ToDoList = ({todos}) => {
    console.log(todos)
    return (
        <table className="table">
            <tr>
                <th>id</th>
                <th>text</th>
                <th>create</th>
                <th>project</th>
                <th>clients</th>
            </tr>
            {todos.map((todo) => <ToDoItem todo={todo} />)}
        </table>
    )
}

export default ToDoList