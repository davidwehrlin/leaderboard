import React from 'react';
import Entry from './Entry'
import CreationForm from './CreationForm';

var baseUrl = 'http://localhost:9000/api/leaderboard';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      entries: [],
      errors: []
    }
  }

  componentDidMount() { this.handleRead() }

  handleRefresh() { this.handleRead() }

  handleCreate(entry) {
    var data = {
      name: entry.name,
      score: entry.score,
      date: new Date().toISOString().slice(0, 10)
    }

    fetch(baseUrl, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(() => this.handleRead())
      .catch(error => console.log(error))
  }

  handleRead() {
    fetch(baseUrl)
      .then(response => response.json())
      .then(entries => {
        let readEntries = entries.map(entry => {
          return (
            <Entry
              key={entry._id}
              id={entry._id}
              name={entry.name}
              score={entry.score}
              date={entry.date.slice(0, 10)}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
              onRefresh={this.handleRefresh}
            />
          )
        })
        this.setState({
          entries: readEntries
        })
      })
      .catch(error => console.log(error))
  }

  handleUpdate(entry) {
    var url = baseUrl.concat(
      `/${entry.id}`,
      `?name=${entry.name}`,
      `&date=${entry.date}`
    )
    fetch(url, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(response => this.handleRead())
      .catch(error => console.log(error))

  }

  handleDelete(id) {
    var url = baseUrl.concat(`/${id}`);
    fetch(url, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(response => this.handleRead())
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div name="wrapper">
        <CreationForm 
          onCreate={this.handleCreate} 
          onRefresh={this.handleRefresh}
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.state.entries}</tbody>
        </table>
        {this.state.errors}
      </div>
    )
  }
}

export default Leaderboard;