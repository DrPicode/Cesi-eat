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
import Profile from './container/Profile';
import {authProxy} from "./proxy/auth.proxy.js";
import {useSnapshot} from "valtio";
import {useEffect} from "react";

function App() {
    const authSnap = useSnapshot(authProxy);

    useEffect( () => {
        const fetchData = async ()  => {
            const response = await fetch("/api/auth/token", {
                credentials: "include"
            });
            if (response.ok) {
                const body = await response.json();
                console.log({body})
                if (body.accessToken) {
                    authProxy.token = body.accessToken;
                }
            }
        }
        fetchData();
        return () => {

        }
    }, []);
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/restaurant/:id" element={<RestaurantPage />} />
                <Route path="/Confirmation" element={<Confirmation />} />
                <Route path="/CheckOut" element={<CheckOut />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="*" element={<h1>Not Found</h1>} />
                <Route path="/Profile/:id" element={<Profile />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
