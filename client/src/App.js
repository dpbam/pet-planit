import './App.css';
import Nav from "./components/Nav";
import Profile from "./pages/Profile";

const exampleProfile = {
  username: "Test",
  email: "test@gmail.com",
  zipcode: "54321",
  pets: [{
    name: "Peppy",
    type: "dog",
    breed: "Bichon",
    age: 10,
    about: "Quis amet culpa incididunt elit sit exercitation reprehenderit sit nulla non ad laborum elit velit. Pariatur cupidatat reprehenderit esse id occaecat officia quis magna. Cupidatat duis labore dolor enim non pariatur. Do anim nostrud id enim. Do mollit incididunt eu reprehenderit ut incididunt.",
    owner: "Test"
  }]
}


function App() {
  return (
    <div>
      <Nav />
      <Profile profile={exampleProfile} />
    </div>
  );
}

export default App;
