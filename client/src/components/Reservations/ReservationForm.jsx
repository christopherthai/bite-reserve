import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';



function ReservationForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 폼 데이터를 처리하거나 전달합니다.
    console.log('Name:', name);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Party Size:', partySize);
  };

  return (
    <div>
      <h1></h1>
      <h2>Reservation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <br />
        <label>
          Party Size:
          <input
            type="number"
            value={partySize}
            onChange={(e) => setPartySize(parseInt(e.target.value))}
            min="1"
          />
        </label>
        <br />
        <Link to ="/reservations">
            <button type="submit">Submit</button>
        </Link>
      </form>
    </div>
  );
}

export default ReservationForm;
