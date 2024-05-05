import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [reservation, setReservation] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        partySize: ''
    });

    const [startDate, setStartDate] = useState(new Date());
    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    useEffect(() => {
        fetch(`/api/restaurants/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setRestaurant(data);
                } else {
                    console.error('No restaurant found');
                }
            })
            .catch(error => console.error('Error loading the restaurant', error));
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReservation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Reservation Details:', reservation);

        fetch(`/api/reservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...reservation, restaurantId: id })
        }).then(response => {
            if (response.ok) {
                navigate('/reservations', { state: { ...reservation, restaurant } });
            } else {
                console.error('Failed to create reservation');
            }
        }).catch(error => console.error('Error submitting reservation', error));
    };

    if (!restaurant) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <h1>{restaurant.name}</h1>
            <h3>Style: {restaurant.category}</h3>
            <h3>Phone: {restaurant.phone}</h3>
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
                <select
                    name="partySize"
                    value={reservation.partySize}
                    onChange={handleInputChange}
                >
                    <option value="">Select Party Size</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        minDate={new Date()}
                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        filterDate={isWeekday}
                    />
                </div>
                <div>
                    {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].flatMap(hour => (
                        [`${hour}:00`, `${hour}:30`].map(time => (
                            <button key={time} type="button" onClick={() => setReservation({...reservation, time: time})}>
                                {hour % 12 === 0 ? 12 : hour % 12}:{time.slice(-2)} {hour < 12 || hour === 24 ? 'AM' : 'PM'}
                            </button>
                        ))
                    ))}
                </div>
                <button type="submit">Submit Reservation</button>
            </form>
        </div>
    );
};

export default ReservationForm;