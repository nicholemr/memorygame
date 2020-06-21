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
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount() {
    fetch('/login', {
      method: 'GET',
    }
    ).then(res => res.json()
    ).then(result => {
      if (result) {
        this.setState({
          username: result.username,
          loggedin: result.loggedin,
          games_played: result.games_played,
          games_won: result.games_won
        })
      }
    }, (error) => { console.error(error) })

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }
    )
  }

  handleLogin(e) {
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

  handleLogout(e) {
    fetch('/logout').then(res => res.json()).then((result) => {
      if (!result.loggedin) {
        this.setState({
          username: '',
          loggedin: false,
          games_played: null,
          games_won: null
        })
      }
    },
      (error) => { console.error(error) })
    e.preventDefault();
  }

  updateUser = (games_played, games_won) => {
    this.setState({
      games_played: games_played,
      games_won: games_won
    })

  }



  render() {
    if (!this.state.loggedin) {
      return (
        <div className="App">
          {/* <header className="App-header">
            <p>The current time is {currentTime}.</p>
          </header> */}
          <div className='login'>
            <div className='title'>Memory Game</div>
            <form className='form' onSubmit={this.handleLogin}>
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
          </div>
          <Board username={this.state.username} />
        </div>
      );
    }
    else {
      return (
        <div className='App'>
          <div className='loggedin'>
            <div className='title2'>Memory Game</div>
            <div className='userinfo'>
              <div className='username'> Welcome {this.state.username}</div>
              <div className='games_played'>Games Played: {this.state.games_played}</div>
              <div className='games_won'>Games Won: {this.state.games_won}</div>
              <button className='logout' onClick={this.handleLogout}>Log Out</button>
            </div>
          </div>
          <Board parentUpdateUser={this.updateUser} />
        </div>
      );
    }

  }
}

export default App;
