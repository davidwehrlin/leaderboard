import React, { useDebugValue } from 'react';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
      [event.target.name]: event.target.value,
      isEditing: !this.state.isEditing
    })
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
          <td>
            <input
              type="number"
              name="score"
              value={this.state.score}
              onChange={this.handleChange} />
          </td>
          <td>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange} />
          </td>
          <td>
            <button onClick={this.handleToggle}>
              Submit
            </button>
            <button >Delete</button>
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
            <button>Delete</button>
          </td>
        </tr>
      )
    }
  }
}

export default Entry;