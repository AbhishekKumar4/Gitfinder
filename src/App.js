import React, {useState, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import GithubState from './context/github/GithubState'
import './App.css';

const App = () => {
  const [alert, setAlert] = useState(null);

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
              <Search
                setAlert = {showAlert}/>
              <Users/>  
            </Fragment>
          )
          }>
          </Route>
          <Route exact path = '/about' component = {About}></Route>
          <Route exact path = '/user/:login' component = {User} />
        </Switch>
        </div>
      </div>
      </Router>
      </GithubState>
    );
}

export default App;
