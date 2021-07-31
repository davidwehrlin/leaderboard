import React from 'react';
import Entry from './Entry'
import CreationForm from './CreationForm';

var baseUrl = 'http://localhost:9000/api/leaderboard';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    // this.handleCreate = this.handleCreate.bind(this);
    // this.handleRead = this.handleRead.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      entries: [],
      errors: []
    }
  }
 
  handleUpdate(entry) {
    console.log(entry)
    var url = baseUrl.concat(
      `/${entry.id}`,
      `?name=${entry.name}`,
      `&date=${entry.date}`
    )
    fetch(url, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(response => response)
      .catch(error => console.log(error))
  }

  handleDelete(id) {
    var url = baseUrl.concat(
      `/${id}`
    )
    fetch(url, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'}
    })
      .then(response => response.json())
      .then(response => response)
      .catch(error => console.log(error))
    //TODO: Delete entry in this.state.entries
  }

  render() {
    return (
      <div name="wrapper">
        <CreationForm />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <Entry 
              id="1"
              name="David"
              score="100"
              date="2021-01-01"
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
              />
          </tbody>
        </table>
        {this.state.errors}
      </div>
    )
  }
}

export default Leaderboard;