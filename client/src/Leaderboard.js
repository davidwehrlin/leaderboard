import React from 'react';
import Entry from './Entry'
import CreationForm from './CreationForm';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    // this.handleCreate = this.handleCreate.bind(this);
    // this.handleRead = this.handleRead.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      entries: [],
      errors: []
    }
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
              />
          </tbody>
        </table>
        {this.state.errors}
      </div>
    )
  }
}

export default Leaderboard;