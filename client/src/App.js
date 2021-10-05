import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
