import React from 'react';
import Entry from './Entry'
import CreationForm from './CreationForm';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* 
      entries 
      errors
      */
    }
  }
 
  render() {
    return (
      <div name="wrapper">
        {/*
        CreationForm
        Table of Entries
        */}
        Hello World!
      </div>
    )
  }
}

export default Leaderboard;