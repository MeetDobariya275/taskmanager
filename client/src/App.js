// client/src/App.js (React Router v5 example)
import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import SignUp from './pages/signup';
import Login from './pages/login';
import TodoList from './pages/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

// PrivateRoute component for v5
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          {/* Protected Route */}
          <PrivateRoute exact path="/" component={TodoList} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
