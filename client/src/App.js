import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/signup" component={Signup} />

            {/* Temp(?) solution to if a user hits a relative path that doesn't exist */}
            <Route render={() => <h1 className='display-2'>404</h1>} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
