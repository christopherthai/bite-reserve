import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ReservationForm = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [reservation, setReservation] = useState({
        name: '',
        phone: '',
        date: '',
        time: ''
    });

    useEffect(() => {
        fetch(`/api/restaurants/${id}`)
            .then(response => response.json())
            .then(data => setRestaurant(data))
            .catch(error => console.error('Error loading the restaurant', error));
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReservation({
            ...reservation,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Reservation Details:', reservation);
        // Here you might send the reservation data to the server
    };

    if (!restaurant) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <h2>{restaurant.name}</h2>
            <h3>{restaurant.phone}</h3>
            <p>{restaurant.description}</p> {/* Make sure description exists in your data */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={reservation.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={reservation.phone}
                    onChange={handleInputChange}
                />
                <select name="date" value={reservation.date} onChange={handleInputChange}>
                    {/* Generate dates dynamically or hardcode values */}
                    <option value="">Select a date</option>
                    <option value="2024-05-01">May 1, 2024</option>
                    <option value="2024-05-02">May 2, 2024</option>
                </select>
                <div>
                    {/* Generate buttons for times */}
                    {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(hour => (
                        <button key={hour} type="button" onClick={() => setReservation({...reservation, time: `${hour}:00`})}>
                            {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? 'AM' : 'PM'}
                        </button>
                    ))}
                </div>
                <button type="submit">Submit Reservation</button>
            </form>
        </div>
    );
};

export default ReservationForm;