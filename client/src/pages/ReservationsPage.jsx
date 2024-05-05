import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);  // 예약 정보를 배열로 초기화

    useEffect(() => {
        fetch('/api/reservations')
            .then((res) => res.json())
            .then((data) => setReservations(data))  // 예약 정보를 상태로 설정
            .catch(error => console.error('Failed to fetch reservations:', error));
    }, []);

    return (
        <div>
            <h1>Reservations</h1>
            {reservations.length > 0 ? (
                <ul>
                    {reservations.map((reservation, index) => (
                        <li key={index}>
                            <div>
                                <h2>Reservation Details</h2>
                                <p><strong>Time:</strong> {reservation.time}</p>
                                <p><strong>Table Size:</strong> {reservation.tableSize}</p>
                                <p><strong>Status:</strong> {reservation.status}</p>
                                <p><strong>Note:</strong> {reservation.note}</p>
                                <p><strong>User ID:</strong> {reservation.userId}</p>
                                <p><strong>Restaurant ID:</strong> {reservation.restaurantId}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
};

export default ReservationsPage;