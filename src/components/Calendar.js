import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import AddEventPage from './pages/AddEventPage';
import CalendarView from './pages/CalendarView';
import EventDetailPage from './pages/EventDetailPage';

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
