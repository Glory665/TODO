import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', project: props.projects[0].id, text_note: '', created_user: props.users[0].id }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.create_Todo(this.state.name, this.state.project, this.state.text_note, this.state.created_user)
        event.preventDefault()
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
                    <label for="project">project</label>
                    <select name="project" onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option
                            value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label for="text_note">text_note</label>
                    <input type="text" className="form-control" name="text_note"
                        value={this.state.text_note} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="created_user">created_user</label>
                    <select name="created_user" onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option
                            value={item.id}>{item.last_name}</option>)}
                    </select>
                </div>
                <input type="submit" value="Save" />
            </form >
        );
    }
}
export default TodoForm