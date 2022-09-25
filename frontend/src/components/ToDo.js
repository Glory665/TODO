import React from "react";



const ToDoItem = ({todo,users,projects,delete_Todo}) => {
    let is_active = todo.is_active ? 'true' : 'false'
    let user = users.find(u => u.id == todo.created_user).last_name
    let project = projects.find(p => p.id == todo.project).name
    let button_text = todo.is_active ? 'Set not_active' : 'Set active'
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.dateCreate}</td>
            <td>{todo.dateUpdate}</td>
            <td>{project}</td>
            <td>{user}</td>
            <td>{is_active}</td>
            <td><button onClick={()=>delete_Todo(todo.id)} type="button">Delete</button></td>
        </tr>
    )
}


const ToDoList = ({todos,users,projects,delete_Todo}) => {

    return (
        <table className="table">
            <tr>
                <th>id</th>
                <th>text</th>
                <th>date Create</th>
                <th>date Update</th>
                <th>project</th>
                <th>Created user</th>
                <th>Is active</th>
                <th></th>
            </tr>
            {todos.map((todo) => <ToDoItem todo={todo} users={users} projects={projects} delete_Todo={delete_Todo} />)}
        </table>
    )
}

export default ToDoList