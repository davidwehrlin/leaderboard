import React from 'react';
import './style.css';

class CreationForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.signalCreate = this.signalCreate.bind(this);
    this.signalRefresh = this.signalRefresh.bind(this);
    this.state = {
      name: '',
      score: '',
      isHidden: true
    }
  }

  signalCreate(event) {
    event.preventDefault();

    if (this.state.isHidden) {
      this.setState({ isHidden: false });
      return;
    }

    this.props.onCreate({ 
      name: this.state.name,
      score: this.state.score 
    });
    this.setState({
      name: '',
      score: '',
      isHidden: true
    });
  }

  handleChange(event){
    var name = event.target.name;
    var value = event.target.value;
    var isAlphaNum = value.match("^[a-zA-Z0-9 ]*$") != null;
    if (isAlphaNum || name != "name") this.setState({ [name]: value })
  }

  signalRefresh() {
    this.props.onRefresh();
    this.setState({ isHidden: true });
  }

  render(){
    if (this.state.isHidden) {
      return (
        <button className="create create-button" onClick={this.signalCreate}>
          Add
        </button>
      )
    } else {
      return (
        <form className="popup-form create" onSubmit={this.signalCreate}>
          <label>
            Name: 
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Score: 
            <input
              name="score"
              type="number"
              value={this.state.score}
              min="0"
              onChange={this.handleChange} />
          </label>
          <button type="submit" >
            Submit
          </button>
          <button onClick={this.signalRefresh}>
            Cancel
          </button>
        </form>
      )
    }
  }
}

export default CreationForm;