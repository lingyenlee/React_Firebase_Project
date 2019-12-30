import React, { Fragment } from 'react';
import { useSelector } from "react-redux"
import { isLoaded } from "react-redux-firebase"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import NavBar from "./components/layout/NavBar"
import DashBoard from './components/dashboard/DashBoard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import CreateProject from './components/projects/CreateProject';

//wait for auth to load
function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Loading....</div>;
  return children
}


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthIsLoaded>
          <NavBar />
          <Switch>
            <Fragment>
              <Route exact path="/" component={DashBoard} />
              <Route path="/project/:id" component={ProjectDetails} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/create" component={CreateProject} />
            </Fragment>
          </Switch>
        </AuthIsLoaded>
      </div>
    </BrowserRouter>
  );
}

export default App;
