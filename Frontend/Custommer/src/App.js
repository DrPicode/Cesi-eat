import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './container/Home';
import RestaurantPage from './container/RestaurantPage';
import Footer from './components/Footer';
import CheckOut from './container/CheckOut';
import Login from './container/Login';
import Register from './container/Register';
import Confirmation from './container/Confirmation';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/RestaurantPage" element={<RestaurantPage />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
