import React, {useState, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import GithubState from './context/github/GithubState'
// npm i axios for http apis
import axios from 'axios'

import './App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //lifecycle method
  //async componentDidMount() {

  //  console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //  this.setState({loading : true});

  //  const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //  this.setState({users : res.data, loading : false})
  //}



  // Get single user
  const getUser =  async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }

  // Get user repos
  const getUserRepos =  async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
  }

  //clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  //set alert
  const showAlert = (msg, type) => {
    setAlert({ msg : msg, type : type});
    setTimeout(() => setAlert(null), 5000);
  } 

  //lifecycle method
    return (
      <GithubState>
      <Router>
        <div className="App">
        <NavBar />
        <div className = 'container'>
        <Alert alert = {alert} />
        <Switch>
          <Route exact path = '/' render = { props => (
            <Fragment>
              <Search clearUsers = {clearUsers}
                      showClear = {users.length > 0 ? true: false}
                      setAlert = {showAlert}/>
              <Users/>  
            </Fragment>
          )
          }>
          </Route>
          <Route exact path = '/about' component = {About}></Route>
          <Route exact path = '/user/:login' render = {props => (
            <User { ...props } getUser = {getUser} 
            getUserRepos = {getUserRepos}
            user = {user}
            repos = {repos} 
            loading = {loading}/>
          )} />
        </Switch>
        </div>
      </div>
      </Router>
      </GithubState>
    );
}

export default App;
