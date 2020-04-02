import React from 'react';
import './App.css';
import MyCalc from './Components/MyCalc/MyCalc'
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.css';
import {
  HashRouter as Router,
  NavLink,
  Switch,
  Route
} from 'react-router-dom';
import Users from './Components/Reqres/Users';

function App() {
  return (
    <Router>
      <div>
        <div className="row">
          <div className="col-sm-12">
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink exact to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/Calculator" className="nav-link">Calculator</NavLink>
                </li>
                <li>
                  <NavLink exact to="/Reqres/UsersList" className="nav-link">UsersList</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <Switch>
                <Route exact path="/Calculator">
                  <MyCalc />
                </Route>
                <Route exact path="/:id?" component={Home} />
                <Route exact path="/Home/:id?" component={Home} />
                <Route exact path="/Reqres/UsersList" component={Users} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
