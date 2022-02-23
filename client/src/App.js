import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Layout/Layout";
import ProtectedRoute from "./Router/ProtectedRoute";
import AuthContextProvider from "./Context/AuthContext";
import PostContextProvider from "./Context/PostContext";
export default function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Layout} />
            <Route
              exact
              path="/login"
              render={(props) => <Home {...props} authRoute="login" />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <Home {...props} authRoute="register" />}
            />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}
