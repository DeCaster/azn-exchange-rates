import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/App.css';


const HomePage = () => {
    const [date, setDate] = useState('');
    const [currency, setCurrency] = useState('');
    const [ratesByDate, setRatesByDate] = useState([]);
    const [ratesByCurrency, setRatesByCurrency] = useState([]);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            toast.error('You must be logged in to access this page.');
            setTimeout(() => {
                navigate('/login');
            }, 1500); 
        }
    }, [navigate]);

    const fetchRatesByDate = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to perform this action.');
            navigate('/login');
            return;
        }
        const dotChangedDate = date.split('-').reverse().join('.'); // YYYY-MM-DD to DD.MM.YYYY
        try {
            const response = await axios.get(`/api/rates/${dotChangedDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRatesByDate(response.data);
            saveSearchHistory('date', date);
        } catch (error) {
            handleRequestError(error);
        }
    };

    const saveSearchHistory = async (searchType, searchQuery) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/searchhistory',
                { searchType, searchQuery },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
        } catch (error) {
            console.error('Error saving search history', error);
        }
    };
    

    const fetchRatesByCurrency = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to perform this action.');
            navigate('/login');
            return;
        }
        try {
            const response = await axios.get(`/api/rates/currency/${currency}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRatesByCurrency(response.data);
            saveSearchHistory('currency', currency);
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleRequestError = (error) => {
        if (error.response && error.response.status === 401) {
            toast.error('You must be logged in to perform this action.');
            navigate('/login');
        } else {
            setError(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="content">
                <ToastContainer />
                <nav className="navbar">
                    <ul>
                        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
                        {!isLoggedIn && <li><Link to="/register">Register</Link></li>}
                        {isLoggedIn && <li><button onClick={logout} className="logout-button">Logout</button></li>}
                    </ul>
                </nav>
                <h1>AZN Exchange Rates</h1>
                <div className="input-container">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="date-input"
                    />
                    <button onClick={fetchRatesByDate} className="fetch-button">Fetch Rates by Date</button>
                </div>
                <div className="scrollable-list">
                    <ul className="rates-list">
                        {Array.isArray(ratesByDate) && ratesByDate.length > 0 ? (
                            ratesByDate.map((rate) => (
                                <li key={rate.currency} className="rate-item">
                                    {rate.currency}: {rate.rate}
                                </li>
                            ))
                        ) : (
                            <li className="no-rates">No rates available..</li>
                        )}
                    </ul>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                        placeholder="Enter currency code (e.g., USD)"
                        className="currency-input"
                    />
                    <button onClick={fetchRatesByCurrency} className="fetch-button">Fetch Rates by Currency</button>
                </div>
                <div className="scrollable-list">
                    <ul className="rates-list">
                        {Array.isArray(ratesByCurrency) && ratesByCurrency.length > 0 ? (
                            ratesByCurrency.map((rate) => (
                                <li key={`${rate.date}-${rate.currency}`} className="rate-item">
                                    {rate.date} - {rate.currency}: {rate.rate}
                                </li>
                            ))
                        ) : (
                            <li className="no-rates">No rates available..</li>
                        )}
                    </ul>
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default HomePage;
