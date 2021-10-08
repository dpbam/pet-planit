import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Donate from "./pages/Donate";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/donate" component={Donate} />

            {/* Possible solution to if a user hits a relative path that doesn't exist, can change later */}
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
