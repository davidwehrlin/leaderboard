import React, { useDebugValue } from 'react';
import './style.css';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signalUpdate = this.signalUpdate.bind(this);
    this.signalDelete = this.signalDelete.bind(this);
    this.signalRefresh = this.signalRefresh.bind(this);
    this.state = {
      isEditing: false,
      id: this.props.id,
      name: this.props.name,
      score: this.props.score,
      date: this.props.date
    }
  }

  handleChange(event) {
    var name = event.target.name;
    var value = event.target.value;
    var isAlphaNum = value.match("^[a-zA-Z0-9 ]*$") != null;
    if (isAlphaNum || name != "name") this.setState({ [name]: value })
  }

  signalUpdate() {
    //Toggle Edit state
    this.setState({
      isEditing: !this.state.isEditing
    })



    if (this.state.isEditing) {
      this.props.onUpdate(this.state);
    }


  }

  signalDelete(event) {
    this.props.onDelete(this.state.id);
  }

  signalRefresh(event) {
    this.props.onRefresh();
    this.setState({ isEditing: false})
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
              pattern="[A-Za-z0-9]"
              onChange={this.handleChange} />
          </td>
          <td>
            <button onClick={this.signalUpdate}>
              Confirm
            </button>
            <button onClick={this.signalRefresh}>
              Cancel
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
            <button className="update" onClick={this.signalUpdate}>
              Edit
            </button>
            <button className="delete" onClick={this.signalDelete}>
              Delete
            </button>
          </td>
        </tr>
      )
    }
  }
}

export default Entry;