import React, {Component} from 'react';
import NavBar from './components/layout/NavBar'
import Users from './components/users/Users'
// npm i axios for http apis
import axios from 'axios'

import './App.css';

class App extends Component {
  
  state = {
    users : [],
    loading : false
  }
  //lifecycle method
  async componentDidMount() {
    this.setState({loading : true});

    const res = await axios.get('https://api.github.com/users');

    this.setState({users : res.data, loading : false})
  }

  //lifecycle method
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className = 'container'>
          <Users loading = {this.state.loading} users = {this.state.users}/>  
        </div>
      </div>
    );
  }
  
}

export default App;
