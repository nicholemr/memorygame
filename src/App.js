import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Board from './Board'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      loggedin: false,
      games_played: null,
      games_won: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }
    )
  }

  handleLogin(e) {
    console.log('submitting')
    const formData = { username: this.state.username }
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    }
    ).then(res => res.json()
    ).then(result => {
      this.setState({
        loggedin: result.loggedin,
        games_played: result.games_played,
        games_won: result.games_won
      })

    }, (error) => { console.error(error) })
    e.preventDefault();
  }


  render() {
    if (!this.state.loggedin) {
      return (
        <div className="App">
          {/* <header className="App-header">
            <p>The current time is {currentTime}.</p>
          </header> */}
          <div className='login'>
            <h3>username: </h3>
            <form onSubmit={this.handleLogin}>
              <label htmlFor='username'>
                <input id='username'
                  type='text'
                  name='username'
                  value={this.state.username}

                  placeholder='Enter Username'
                  onChange={this.handleChange}
                />
              </label>
              <button>Submit</button>
            </form>
            <Board />
          </div>
        </div>
      );
    }
    else {
      return (
        <div className='App'>
          <div className='username'>
            <div> Welcome {this.state.username}</div>
            <div>Games Played: {this.state.games_played}</div>
            <div>Games Won: {this.state.games_won}</div>
          </div>
          <Board />
        </div>
      );
    }

  }
}

export default App;
