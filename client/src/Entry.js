import React, { useDebugValue } from 'react';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.signalDelete = this.signalDelete.bind(this);
    this.state = {
      isEditing: false,
      id: this.props.id,
      name: this.props.name,
      score: this.props.score,
      date: this.props.date
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleToggle(event) {
    this.setState({
      isEditing: !this.state.isEditing,
      [event.target.name]: event.target.value
    })

    if (this.state.isEditing) {
      this.props.onUpdate(this.state);
    }
  }

  signalDelete(event){
    this.props.onDelete(this.state.id);
  }

  render() {
    if (this.state.isEditing) {
      return (
        <tr>
          <td>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange} />
          </td>
          <td>{this.state.score}</td>
          <td>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange} />
          </td>
          <td>
            <button onClick={this.handleToggle}>
              Confirm
            </button>
            <button onClick={this.signalDelete}>
              Delete
            </button>
          </td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{this.state.name}</td>
          <td>{this.state.score}</td>
          <td>{this.state.date}</td>
          <td>
            <button onClick={this.handleToggle}>
              Edit
            </button>
            <button onClick={this.signalDelete}>
              Delete
            </button>
          </td>
        </tr>
      )
    }
  }
}

export default Entry;