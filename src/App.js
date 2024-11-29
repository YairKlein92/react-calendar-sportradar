import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddEventPage from './components/AddEventPage'; // Correct import path for AddEventPage
import CalendarView from './components/CalendarView'; // Correct import path for CalendarView
import EventDetailPage from './components/EventDetailPage'; // Correct import path for EventDetailPage
import Navbar from './components/Navbar'; // Correct import path for Navbar

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/add-event" element={<AddEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
