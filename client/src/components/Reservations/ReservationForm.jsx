import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Form, Field } from 'formik';

const convertToUnixTimestamp = (date, time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);
    return Math.floor(dateTime.getTime() / 1000);
};

const ReservationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        fetch("/api/check_session")
            .then(response => response.ok ? response.json() : null)
            .then(userData => setUser(userData));

        fetch(`/api/restaurants/${id}`)
            .then(response => response.ok ? response.json() : null)
            .then(data => setRestaurant(data))
            .catch(error => console.error('No restaurant found', error));
    }, [id]);

    if (!restaurant) return <div>Loading...</div>;

    return (
        <Formik
            initialValues={{
                partySize: '1',
                date: new Date(),
                time: '12:00',
                notes: ''
            }}
            onSubmit={async (values) => {
                if (!user) {
                    if (window.confirm("You are not logged in. Would you like to go to the login page?")) {
                        navigate("/login");
                    } else {
                        navigate("/");
                    }
                    return;
                }

                const reservationTime = convertToUnixTimestamp(values.date, values.time);

                const response = await fetch(`/api/restaurants/${id}/reservations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reservation_time: reservationTime,
                        table_size: parseInt(values.partySize),
                        status: 'confirmed',
                        user_id: user.id,
                        notes:values.notes.toString(),
                        restaurant_id: id
                    })
                },);

                if (response.ok) {
                    const reservationData = await response.json();
                    navigate('/reservations', { state: { reservationId: reservationData.id } });
                } else {
                    console.error('Failed to create reservation');
                }
            }}
        >
            {({ setFieldValue, values }) => (
                <Form>
                    {restaurant && (
                        <div>
                            <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                            <h2>{restaurant.name}</h2>
                            <p>Category: {restaurant.category}</p>
                            <p>Phone: {restaurant.phone}</p>
                        </div>
                    )}
                    {user && (
                        <div>
                            <p>User ID: {user.id}</p>
                        </div>
                    )}

                    <DatePicker
                        selected={values.date}
                        onChange={date => setFieldValue('date', date)}
                        minDate={new Date()}
                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                        showTimeSelect={false}
                        className="form-control"
                    />

                    <Field as="select" name="time" className="form-control" onChange={(e) => setFieldValue('time', e.target.value)}>
                        {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(hour => (
                            <optgroup key={hour} label={`${hour}:00`}>
                                <option value={`${hour}:00`}>{`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`}</option>
                                <option value={`${hour}:30`}>{`${hour}:30 ${hour < 12 ? 'AM' : 'PM'}`}</option>
                            </optgroup>
                        ))}
                    </Field>

                    <Field as="select" name="partySize" className="form-control" onChange={(e) => setFieldValue('partySize', e.target.value)}>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </Field>

                    <Field as="textarea" name="notes" placeholder="Additional notes" className="form-control" />
                    <button type="submit" className="btn btn-primary">Submit Reservation</button>
                </Form>
            )}
        </Formik>
    );
};

export default ReservationForm;