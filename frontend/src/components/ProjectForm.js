import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', users: [] }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.create_Project(this.state.name, this.state.users)
        event.preventDefault()
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let users = []

        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            'users': users
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name"
                        value={this.state.name} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="users">users</label>
                    <select multiple name="users" onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((user) => <option value={user.id}>{user.first_name} {user.last_name}</option>)}
                    </select>
                </div>
                <input type="submit" value="Save" />
            </form >
        );
    }
}
export default ProjectForm