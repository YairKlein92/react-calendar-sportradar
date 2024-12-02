import './DateEventsPage.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import sportData from '../../sportData.json';

const data = sportData.data;

const DateEventsPage = () => {
  const { eventsDetails } = useParams();
  const [events, setEvents] = useState(data);
  const eventDate = eventsDetails;

  const formatTime = (time) => time.slice(0, 5);

  useEffect(() => {
    const localStorageEvents = JSON.parse(localStorage.getItem('events')) || [];
    if (localStorageEvents.length > 0) {
      const updatedEvents = [...data, ...localStorageEvents];
      setEvents(updatedEvents);
    } else {
      setEvents(data);
    }
  }, []);

  // Filter events based on the date
  const filteredEvents = events.filter(
    (event) =>
      new Date(event.dateVenue).toLocaleDateString() ===
      new Date(eventDate).toLocaleDateString(),
  );

  if (filteredEvents.length === 0) {
    return <div className="text-center">No events found for this date.</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">
        Events on {new Date(eventDate).toLocaleDateString()}
      </h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Match</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={index}>
                <td>{formatTime(event.timeVenueUTC)}</td>
                <td>
                  {event.homeTeam?.officialName || 'TBD'} vs{' '}
                  {event.awayTeam?.officialName || 'TBD'}
                </td>
                <td>
                  <Link
                    to={`/event/${event.dateVenue}-${event.awayTeam?.slug}`}
                    className="btn btn-sm btn-dark"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DateEventsPage;
