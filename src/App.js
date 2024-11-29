import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddEventPage from './components/AddEventPage';
import CalendarView from './components/CalendarView';
import EventDetailsPage from './components/EventDetail/EventDetailsPage';
import EventsDetailsPage from './components/EventsDetailsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/events-details" element={<EventsDetailsPage />} />
        <Route path="/event/:eventDetails" element={<EventDetailsPage />} />
        <Route path="/add-event" element={<AddEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
