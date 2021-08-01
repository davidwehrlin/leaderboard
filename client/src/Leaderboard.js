import React from 'react';
import Entry from './Entry'
import CreationForm from './CreationForm';
import './style.css';

var baseUrl = 'http://localhost:9000/api/leaderboard';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      entries: [],
      errors: ''
    };
  }

  componentDidMount() { this.handleRead() }

  handleRefresh() { 
    this.setState({ entries: []}); 
    this.handleRead(); 
  }

  handleError(error, operation) {
    this.setState({ error: operation.concat(": ", error) });
    this.handleRefresh();
  }

  handleResponse(response){
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

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
      .then(response => this.handleResponse(response))
      .then(() => this.handleRead())
      .catch(error => this.handleError(error, "CREATE"))

    if (this.state.errors.length > 0) this.handleRefresh();
  }

  handleRead() {
    fetch(baseUrl)
      .then(response => this.handleResponse(response))
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
      .catch(error => this.handleError(error, "READ"))
  }

  handleUpdate(entry) {
    
    var url = baseUrl.concat(
      `/${entry.id}`,
      `?name=${entry.name}`,
      `&date=${entry.date}`
    )
    console.log(url);
    fetch(url, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => this.handleResponse(response))
      .then(response => this.handleRead())
      .catch(error => this.handleError(error, "UPDATE"))
  }

  handleDelete(id) {
    var url = baseUrl.concat(`/${id}`);
    fetch(url, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => this.handleResponse(response))
      .then(response => this.handleRead())
      .catch(error => this.handleError(error, "DELETE"))
  }

  render() {
    return (
      <div name="wrapper">
        <CreationForm 
          onCreate={this.handleCreate} 
          onRefresh={this.handleRefresh}
        />
        <table>
          <thead className="read">
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.state.entries}</tbody>
        </table>
        <button className="create-button" onClick={this.handleRefresh}>
          Refresh
        </button>
        <p>{this.state.error}</p>
        
      </div>
    )
  }
}

export default Leaderboard;