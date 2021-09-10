

import React, { Suspense, lazy } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Home from './Home'
import Register from './Register'
import Register2 from './Register2'
import Error404 from './Error404'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import baseColor from '@material-ui/core/colors/blueGrey';
let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: baseColor,
  }


});


function App() {





  return (
    <MuiThemeProvider theme={theme}>
      <Router >

        <Switch>
          <Route exact path="/register/" component={Register} />
          <Route exact path="/register/teacher/" component={Register2} />
          <Route exact path="/" ><Home /></Route>
          <Route ><Error404 /></Route>
        </Switch>

      </Router>
    </MuiThemeProvider>
  );
}

export default App;

