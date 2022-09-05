import React from "react";



const ToDoItem = ({todo}) => {

    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.dateCreate}</td>
            <td>{todo.dateUpdate}</td>
            <td>{todo.project}</td>
            <td>{todo.clients}</td>
        </tr>
    )
}


const ToDoList = ({todos}) => {

    return (
        <table className="table">
            <tr>
                <th>id</th>
                <th>text</th>
                <th>date Create</th>
                <th>date Update</th>
                <th>project</th>
                <th>clients</th>
            </tr>
            {todos.map((todo) => <ToDoItem todo={todo} />)}
        </table>
    )
}

export default ToDoList