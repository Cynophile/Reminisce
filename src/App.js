import React, { useState, useEffect } from 'react'
import firebase from './utils/firebase';
// IMPORT LINK AND STYLE
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
//
import { ThemeProvider } from 'styled-components'
import theme from "./utils/theme";
import Loading from './utils/load';
// IMPORT PAGES
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './isAuthenticated/Profile';

export default function App() {
  const [values, setValues] = useState({
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //userSignedin
        setValues({ isAuthenticated: true, isLoading: false })
      } else {
        //NoUser
        setValues({ isAuthenticated: false, isLoading: false })
      }
    });

  }, [])

  if (values.isLoading) {
    return <Loading />
  }
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/landingPage/account" />
          </Route>

          <PublicRoute
            path="/landingPage/account"
            component={LandingPage}
            isAuthenticated={values.isAuthenticated}
            restricted={true}
          />

          <PrivateRoute
            path="/home"
            component={Home}
            isAuthenticated={values.isAuthenticated}
          />
          
          <PrivateRoute
            path="/profile"
            component={Profile}
            isAuthenticated={values.isAuthenticated}
          />
          
          <Route path={'*'} component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
