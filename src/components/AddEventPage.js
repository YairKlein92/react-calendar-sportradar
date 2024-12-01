import React, { useEffect, useState } from 'react';

const AddEventPage = () => {
  const [dateVenue, setDateVenue] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [sport, setSport] = useState('');
  const [timeVenueUTC, setTimeVenueUTC] = useState('');
  // State to store the submitted event
  const [submittedEvent, setSubmittedEvent] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newEvent = {
      dateVenue,
      sport,
      timeVenueUTC,
      awayTeam: {
        name: awayTeam,
        officialName: awayTeam,
        slug: awayTeam.toLowerCase().replace(' ', '-'),
      },
      homeTeam: {
        name: homeTeam,
        officialName: homeTeam,
        slug: homeTeam.toLowerCase().replace(' ', '-'),
      },
    };
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    storedEvents.push(newEvent);
    localStorage.setItem('events', JSON.stringify(storedEvents));
    setSubmittedEvent(newEvent);
  };

  useEffect(() => {
    console.log('Stored Events:', JSON.parse(localStorage.getItem('events')));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Add New Event</h1>

      <form onSubmit={handleSubmit}>
        {/* !!dateVenue!! input */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={dateVenue}
            onChange={(event) => setDateVenue(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Time (HH:MM:SS)
          </label>
          <input
            type="text"
            id="time"
            className="form-control"
            value={timeVenueUTC}
            onChange={(event) => setTimeVenueUTC(event.target.value)}
            pattern="^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
            title="Time must be in HH:MM:SS format"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sport" className="form-label">
            Sport
          </label>
          <input
            type="text"
            id="sport"
            className="form-control"
            value={sport}
            onChange={(event) => setSport(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="homeTeam" className="form-label">
            Home Team
          </label>
          <input
            type="text"
            id="homeTeam"
            className="form-control"
            value={homeTeam}
            onChange={(event) => setHomeTeam(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="awayTeam" className="form-label">
            Opponent Team
          </label>
          <input
            type="text"
            id="awayTeam"
            className="form-control"
            value={awayTeam}
            onChange={(event) => setAwayTeam(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-sm btn-dark">
          Add Event
        </button>
      </form>

      {submittedEvent && (
        <div className="mt-4">
          <h3>Event Details</h3>
          <p>
            <strong>Date:</strong> {submittedEvent.dateVenue}
          </p>
          <p>
            <strong>Time:</strong> {submittedEvent.timeVenueUTC}
          </p>
          <p>
            <strong>Sport:</strong> {submittedEvent.sport}
          </p>
          <p>
            <strong>Home Team:</strong> {submittedEvent.homeTeam.name}
          </p>
          <p>
            <strong>Away Team:</strong> {submittedEvent.awayTeam.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddEventPage;
