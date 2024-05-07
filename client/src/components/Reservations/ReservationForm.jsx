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
                partySize: selectedPartySize,
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
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="restaurant-image"
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '5px' }}>{restaurant.name}</h2>
                      <p style={{ fontSize: '1.5rem', marginBottom: '2px' }}>Category: {restaurant.category}</p>
                      <p style={{ fontSize: '1.5rem' }}>Phone: {restaurant.phone}</p>
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Please select your party size:</p>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '5px' }}>
                          {Array.from({ length: 20 }, (_, i) => (
                            <button
                            key={i}
                            type="button"
                            className={`btn btn-${values.partySize === i + 1 ? 'primary' : 'outline-primary'}`}
                            style={{ fontSize: '1rem', padding: '5px' }}
                            onClick={() => {
                              setFieldValue('partySize', i + 1);
                              // Add logic to change button color upon click
                              const buttons = document.querySelectorAll('.btn');
                              buttons.forEach((button, index) => {
                                if (index === i) {
                                  button.classList.remove('btn-outline-primary');
                                  button.classList.add('btn-primary');
                                } else {
                                  button.classList.remove('btn-primary');
                                  button.classList.add('btn-outline-primary');
                                }
                              });
                            }}
                          >
                            {i + 1}
                          </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Please select your desired date and time:</p>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DatePicker
                      selected={values.date}
                      onChange={date => setFieldValue('date', date)}
                      minDate={new Date()}
                      maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                      showTimeSelect={false}
                      inline
                      calendarClassName="custom-calendar"
                    />
                    <div style={{ marginLeft: '10px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
                        {[...Array(20)].map((_, index) => {
                          const hour = 10 + Math.floor(index / 2);
                          const minute = index % 2 === 0 ? '00' : '30';
                          const time = `${hour}:${minute}`;
                          return (
                            <button
                              key={time}
                              type="button"
                              className={`btn btn-${values.time === time ? 'primary' : 'outline-primary'}`}
                              style={{ fontSize: '0.9rem', padding: '5px 10px' }}
                              onClick={() => setFieldValue('time', time)}
                            >
                              {`${time} ${hour < 12 ? 'AM' : 'PM'}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>If you have any special requests, please write them below:</p>
                  <Field
                    as="textarea"
                    name="notes"
                    placeholder="Enter any special requests or notes"
                    className="form-control"
                    style={{ width: '50%' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button type="submit" className="btn btn-primary">
                    Submit Reservation
                  </button>
                </div>
              </Form>
            )}
        </Formik>
    );
};

export default ReservationForm;