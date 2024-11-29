import './EventDetailsPage.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import sportData from '../../sportData.json'; // Correct path

const EventDetailsPage = () => {
  const { eventDetails } = useParams();
  console.log(eventDetails);

  // Split the eventDetails into parts
  const parts = eventDetails.split('-'); // have all the elements split with a hyphen in a list []
  const eventDate = `${parts[0]}-${parts[1]}-${parts[2]}`; // First 3 parts: '2024-11-03'
  const awayTeamSlug = parts.slice(3).join('-'); // Everything after the 3rd part: 'fc-nasaf-qarshi'

  console.log(eventDate, '-', awayTeamSlug); // Logs: '2024-11-03' and 'fc-nasaf-qarshi'

  const event = sportData.data.find(
    (event) =>
      new Date(event.dateVenue).toLocaleDateString() ===
        new Date(eventDate).toLocaleDateString() &&
      event.awayTeam?.slug === awayTeamSlug,
  );

  if (!event) {
    return <div>Event not found</div>;
  }

  // Function to format the time (removes seconds)
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
