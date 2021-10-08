import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const exampleProfile = {
  username: "Timbo",
  firstName: "Tim",
  lastName: "Primmer",
  email: "test@gmail.com",
  zipcode: "54321",
  image: "https://avatars.githubusercontent.com/u/28116353?v=4",
  pets: [{
    name: "Peppy",
    type: "dog",
    breed: "Bichon",
    age: 10,
    about: "Quis amet culpa incididunt elit sit exercitation reprehenderit sit nulla non ad laborum elit velit. Pariatur cupidatat reprehenderit esse id occaecat officia quis magna. Cupidatat duis labore dolor enim non pariatur. Do anim nostrud id enim. Do mollit incididunt eu reprehenderit ut incididunt.",
    owner: "Timbo",
    playdate: true,
    image: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25134724/Bichon-Frise-standing-in-the-grass.jpg"
  },
  {
    name: "Ricky",
    type: "dog",
    breed: "Border Terrier",
    age: 11,
    about: "Quis amet culpa incididunt elit sit exercitation reprehenderit sit nulla non ad laborum elit velit. Pariatur cupidatat reprehenderit esse id occaecat officia quis magna. Cupidatat duis labore dolor enim non pariatur. Do anim nostrud id enim. Do mollit incididunt eu reprehenderit ut incididunt.",
    owner: "Timbo",
    playdate: false,
    image: "http://cdn.akc.org/content/hero/smiley_border_terrier_hero.jpg"
  }],
  posts: [
    { title: "Test post 1" },
    { title: "Test post 2" },
    { title: "Test post 3" },
    { title: "Test post 4" },
    { title: "Test post 5" }
  ]
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={() => (<Profile profile={exampleProfile} />)}/>
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
