import './EventDetailsPage.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sportData from '../../sportData.json';

const data = sportData.data;

const EventDetailsPage = () => {
  const { eventDetails } = useParams();
  const [events, setEvents] = useState(data);
  const parts = eventDetails.split('-');
  const eventDate = `${parts[0]}-${parts[1]}-${parts[2]}`;
  const awayTeamSlug = parts.slice(3).join('-');

  useEffect(() => {
    const localStorageEvents = JSON.parse(localStorage.getItem('events')) || [];
    if (localStorageEvents.length > 0) {
      const updatedEvents = [...data, ...localStorageEvents];
      setEvents(updatedEvents);
    } else {
      setEvents(data);
    }
  }, []);

  const event = events.find(
    (event) =>
      new Date(event.dateVenue).toLocaleDateString() ===
        new Date(eventDate).toLocaleDateString() &&
      event.awayTeam?.slug === awayTeamSlug,
  );

  if (!event) {
    return <div>No event found.</div>;
  }

  const formatTime = (time) => time.slice(0, 5);

  return (
    <div className="container">
      <h1 className="text-center mb-4">Event Details</h1>
      <div className="row">
        <div className="col-12">
          <h3>Date: {new Date(event.dateVenue).toLocaleDateString()}</h3>
          <h4>Scheduled Time: {formatTime(event.timeVenueUTC)}</h4>
          <h5>Sport: {event.sport || 'Not available'}</h5>
          <p>
            <strong>Home Team:</strong>{' '}
            {event.homeTeam?.officialName || 'Not yet public'}
          </p>
          <p>
            <strong>Opponent Team:</strong> {event.awayTeam?.officialName}
          </p>
          <p>
            <strong>Location:</strong>
          </p>
          <p>
            <strong>Additional Info:</strong> {event.originCompetitionName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
