import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './components/about';
import Navbar2 from './components/Navbar2';
import AdminDashboard from './components/AdminDashboard';
import DataEntry from './components/DataEntry';
import Doctor from './components/Doctor';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path='/'>
              <Navbar />
            </Route>
            <Route exact path='/login'>
              <Navbar />
              <Login />
            </Route>
            <Route exact path='/admin'>
              <Navbar2 />
              <AdminDashboard />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
            <Route exact path='/dataentry'>
              <Navbar2 />
              <DataEntry />
            </Route>
            <Route exact path='/doctor'>
              <Navbar2 />
              <Doctor />
            </Route>
            <Route exact path='/register'>
              <Navbar2 />
              <Register />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;