// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Page Components
import HomePage from './PageComponents/Home/Home';
import TravelPackagesPage from './PageComponents/TravelPackages/TravelPackages';
import TransportationPage from './PageComponents/Transportation/Transportation';
import TripPlannerPage from './PageComponents/TripPlanner/TripPlanner';
import TestimonialsPage from './PageComponents/Testimonials/Testimonials';
import AboutUsPage from './PageComponents/AboutUs/AboutUs';
import AccessPage from './PageComponents/Access/Access';

// Import Sub Components
import NavbarComponent from './SubComponents/navbar/navbar';
import Footer from './SubComponents/footer/footer';

function App() {
  // Lift the state up to App.js
  const [activePage, setActivePage] = useState('/');

  const resetActivePage = () => {
    setActivePage('/'); // Reset to the homepage or whichever page you choose
  };

  return (
    <div className="App">
      <Router>
        <NavbarComponent activePage={activePage} setActivePage={setActivePage} />
        <div className="App-body">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Home route */}
            <Route path="/travel-packages" element={<TravelPackagesPage />} />
            <Route path="/transportation" element={<TransportationPage />} />
            <Route path="/trip-planner" element={<TripPlannerPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            {/* Pass resetActivePage to AccessPage */}
            <Route path="/access" element={<AccessPage resetActivePage={resetActivePage} />} />
          </Routes>
        </div>
        <Footer sticky="bottom" />
      </Router>
    </div>
  );
}

export default App;
