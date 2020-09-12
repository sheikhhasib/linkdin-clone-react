import { Create } from '@material-ui/icons';
import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Main from './components/Main/Main';
import PrivateRoute from './PrivateRoute/PrivateRoute';


export const UserContext = createContext();
function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <PrivateRoute to="/">
            <Main></Main>
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
