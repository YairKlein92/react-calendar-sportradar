import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AddEventPage from './pages/AddEventPage';
import CalendarView from './pages/CalendarView';
import EventDetailsPage from './pages/EventDetailsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/add-event" element={<AddEventPage />} />
        <Route path="/event-details" element={<EventDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
