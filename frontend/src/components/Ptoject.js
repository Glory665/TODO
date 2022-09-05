import React from "react";



const ProjectItem = ({project}) => {

    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repository}</td>
            <td>{project.users}</td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
    console.log(projects)
    return (
        <table className="table">
            <tr>
                <th>id</th>
                <th>name</th>
                <th>repository</th>
                <th>users</th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList