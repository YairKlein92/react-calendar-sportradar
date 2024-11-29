import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AddEventPage from './pages/AddEventPage';
import CalendarView from './pages/CalendarView';
import EventsDetailsPage from './pages/EventsDetailsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/add-event" element={<AddEventPage />} />
        <Route path="/events-details" element={<EventsDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
