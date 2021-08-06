/**
 * @fileoverview Leaderboard is the main component of this application. It shows
 * all entries, forms, and errors.
 * @dependencies CreationForm: The button/form component that allows for the 
 *    creation of entries.
 * Entry: the basic unit of the leaderboard which represents the rows of the 
 *    leaderboard itself
 */

import React from 'react';
import Entry from './Entry'
import CreationForm from './CreationForm';
import './style.css';

require('dotenv').config()
var baseUrl = process.env.REACT_APP_SERVER_URL;

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

  // Reads all entries from database on start
  componentDidMount() { this.handleRead() }

  // Resets state of database and reads all entries
  handleRefresh() { 
    this.setState({ entries: [], error: ""}); 
    this.handleRead(); 
  }

  /**
   * Formats error for user to see in window
   * @param {string} error Response code state from bad api call
   * @param {string} operation API call type which had error (CRUD)
   */
  handleError(error, operation) {
    this.setState({ error: operation.concat(": ", error) });
    this.handleRead();
  }

  /**
   * Checks API calls for bad response codes and throws error apropriately
   * @param {HttpResponse} response Raw API response
   * @returns An Error or a json from succesful api call
   */
  handleResponse(response){
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  /**
   * Creates a new entry based off a name and score
   * @param {Entry} entry Object holding a name and a score
   */
  handleCreate(entry) {
    var data = {
      name: entry.name,
      score: entry.score,
      date: new Date().toISOString().slice(0, 10) //Date based off today
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

  /**
   * Reads from database the entries for the leaderboard
   */
  handleRead() {
    fetch(baseUrl)
      .then(response => this.handleResponse(response))
      .then(entries => {
        // Creates a list of new Entry Components
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

  /**
   * Updates a given entry based off a new name and/or a new date
   * @param {Entry} entry Object holding a name and date
   */
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

  /**
   * Deletes a specific entry based off id.
   * @param {Number} id Identification for the specific entry in database
   */
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

  /**
   * Main render function for application
   * @returns Creation form, Table of Entries, Refresh Button, and Error list
   */
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
        <p className="popup-form">{this.state.error}</p>
        
      </div>
    )
  }
}

export default Leaderboard;