import './EventsDetailsPage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sportData from '../sportData.json';

const data = sportData.data;

const EventsDetailsPage = () => {
  const daysOfTheWeek = [
    'Sun.',
    'Mon.',
    'Tue.',
    'Wed.',
    'Thu.',
    'Fri.',
    'Sat.',
  ];

  const formatTime = (time) => {
    return time.slice(0, 5); // Remove the seconds part
  };

  const [events, setEvents] = useState(data);
  const [sportFilter, setSportFilter] = useState('');
  const [homeTeamFilter, setHomeTeamFilter] = useState('');
  const [awayTeamFilter, setAwayTeamFilter] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(data);

  useEffect(() => {
    const localStorageEvents = JSON.parse(localStorage.getItem('events')) || [];
    console.log('Fetched events from localStorage:', localStorageEvents);

    if (localStorageEvents.length > 0) {
      const updatedEvents = [...data, ...localStorageEvents];
      console.log('Updated events array:', updatedEvents);
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents); // Update filtered events
    } else {
      console.log('No events in localStorage');
      setEvents(data);
      setFilteredEvents(data); // Update filtered events
    }
  }, []);

  useEffect(() => {
    // Cross-filtering
    const filtered = events.filter((event) => {
      // If typed sport matched existing sport
      const matchesSport = sportFilter
        ? event.sport.toLowerCase().includes(sportFilter.toLowerCase())
        : // False return no events at start
          true;
      const matchesHomeTeam = homeTeamFilter
        ? event.homeTeam?.name
            .toLowerCase()
            .includes(homeTeamFilter.toLowerCase())
        : true;
      const matchesAwayTeam = awayTeamFilter
        ? event.awayTeam?.name
            .toLowerCase()
            .includes(awayTeamFilter.toLowerCase())
        : true;

      return matchesSport && matchesHomeTeam && matchesAwayTeam;
    });

    setFilteredEvents(filtered);
  }, [sportFilter, homeTeamFilter, awayTeamFilter, events]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Events in November</h1>

      {/* Filter Section */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Filter by sport type (e.g., football)"
          value={sportFilter}
          onChange={(event) => setSportFilter(event.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Filter by home team"
          value={homeTeamFilter}
          onChange={(event) => setHomeTeamFilter(event.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Filter by away team"
          value={awayTeamFilter}
          onChange={(event) => setAwayTeamFilter(event.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Match</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => {
                const eventDate = new Date(event.dateVenue);
                const dayOfWeek = eventDate.getDay();
                const dayName = daysOfTheWeek[dayOfWeek];

                return (
                  <tr key={index}>
                    <td>
                      {dayName}, {event.dateVenue} -{' '}
                      {formatTime(event.timeVenueUTC)}
                    </td>
                    <td>
                      {event.homeTeam?.name || 'TBD'} vs{' '}
                      {event.awayTeam?.name || 'TBD'}
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
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No events match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsDetailsPage;
