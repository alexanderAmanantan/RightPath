// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
//import Footer from './SubComponents/footer/footer';
//import NavbarComponent from './SubComponents/navbar/navbar.js';

//Import Page Components
import HomePage from './PageComponents/Home/Home';
import TravelPackagesPage from './PageComponents/TravelPackages/TravelPackages';
import TransportationPage from './PageComponents/Transportation/Transportation';
import TripPlannerPage from './PageComponents/TripPlanner/TripPlanner';
import TestimonialsPage from './PageComponents/Testimonials/Testimonials';
import AboutUsPage from './PageComponents/AboutUs/AboutUs';
import AccessPage from './PageComponents/Access/Access';

//Import Sub Components
import NavbarComponent from './SubComponents/navbar/navbar';
import Footer from './SubComponents/footer/footer';



function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent sticky="top" />
        {/*<CarouselComponent /> */}
        <div className="App-body">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Home route */}
            <Route path="/travel-packages" element={<TravelPackagesPage />} />
            <Route path="/transportation" element={<TransportationPage />} />
            <Route path="/trip-planner" element={<TripPlannerPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/access" element={<AccessPage />} />
            {/* <Route path="/package-details/:id" element={<PackageDetails />} /> */}
            {/* <Route path="/loginsignup" element={<LoginSignUpForms />} /> */}
          </Routes>
        </div>
        <Footer sticky="bottom" />
      </Router>
      {/* Your other content */}
      {/*<NavbarComponent /> */}
      {/* Render the Footer component */}
      {/*<Footer /> */}
    </div>
  );
}

export default App;
