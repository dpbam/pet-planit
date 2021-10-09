import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PawFeeds from "./pages/PawFeeds"
import SinglePawFeed from "./pages/SinglePawFeed";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

//middleware function retrieve the token and combine with existing httpLink later
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//combine authLink with existing httpLink
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
  },
  {
    name: "Red",
    type: "dog",
    breed: "Boxer",
    age: 11,
    about: "Quis amet culpa incididunt elit sit exercitation reprehenderit sit nulla non ad laborum elit velit. Pariatur cupidatat reprehenderit esse id occaecat officia quis magna. Cupidatat duis labore dolor enim non pariatur. Do anim nostrud id enim. Do mollit incididunt eu reprehenderit ut incididunt.",
    owner: "Timbo",
    playdate: true,
    image: "https://www.thesprucepets.com/thmb/h-1donXJH4OQv7XQjck1tsmD8Kk=/1885x1414/smart/filters:no_upscale()/Boxer-GettyImages-463043655-91a77226f5884b41915d50811e4e4e2b.jpg"
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
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={() => (<Profile profile={exampleProfile} />)} />
              <Route exact path="/pawfeeds" component={PawFeeds} />
              <Route exact path="/pawfeeds/:id" component={SinglePawFeed} />
              {/* Possible solution to if a user hits a relative path that doesn't exist, can change later */}
              <Route render={() => <h2>404</h2>} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
