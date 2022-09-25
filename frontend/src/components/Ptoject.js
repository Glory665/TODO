import React from "react";



const ProjectItem = ({project,users,delete_Project}) => {

    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repository}</td>
            <td>{project.users.map(userId => users.find(u => u.id == userId).last_name)}</td>
            <td><button onClick={()=>delete_Project(project.id)} type="button">Delete</button></td>
        </tr>
    )
}


const ProjectList = ({projects,users,delete_Project}) => {

    return (
        <table className="table">
            <tr>
                <th>id</th>
                <th>name</th>
                <th>repository</th>
                <th>users</th>
                <th></th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} users={users} delete_Project={delete_Project} />)}
        </table>
    )
}

export default ProjectList