import React from 'react';

class CreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSubmit = this.toggleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signalRefresh = this.signalRefresh.bind(this);
    this.state = {
      name: '',
      score: '',
      isHidden: true
    }
  }

  toggleSubmit(event) {
    event.preventDefault();

    if (this.state.isHidden) {
      this.setState({ isHidden: false });
      return;
    }

    this.props.onCreate({ 
      name: this.state.name,
      score: this.state.score 
    });
    this.setState({ isHidden: true });
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  signalRefresh() {
    this.props.onRefresh();
    this.setState({ isHidden: true });
  }

  render(){
    if (this.state.isHidden) {
      return (
        <input 
          type="button" 
          value="Add" 
          onClick={this.toggleSubmit} 
        />
      )
    } else {
      return (
        <form onSubmit={this.toggleSubmit}>
          <label>
            Name
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange} />
          </label>
          <label>
            Score
            <input
              name="score"
              type="text"
              value={this.state.score}
              onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          <input 
            type="button" 
            value="Cancel" 
            onClick={this.signalRefresh} 
          />
        </form>
      )
    }
  }
}

export default CreationForm;