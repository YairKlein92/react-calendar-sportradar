import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Navbar - Sports Calendar</Link>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
          >
            Calendar
          </Link>
          <Link
            to="/add-event"
            className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
          >
            Add Event
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
