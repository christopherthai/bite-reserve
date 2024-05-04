import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReservationsForm = () => {
    const { restaurantId } = useParams(); // URL에서 레스토랑 ID 추출
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 레스토랑 정보를 서버에서 불러오기
        fetch(`/api/restaurants/${restaurantId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => setRestaurant(data))
            .catch(error => {
                console.error('Error fetching restaurant details:', error);
                // 오류 처리 로직 (예: 오류 메시지 표시)
            });
    }, [restaurantId]);

    if (!restaurant) return <div>Loading...</div>;

    const handleSubmit = (event) => {
        event.preventDefault();
        const reservationData = {
            date: event.target.date.value,
            time: event.target.time.value,
            partySize: event.target.partySize.value,
            restaurantId: restaurantId,
        };

        fetch('/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create reservation');
            }
            return response.json();
        })
        .then(data => {
            console.log('Reservation created:', data);
            navigate('/reservations');
        })
        .catch(error => {
            console.error('Error creating reservation:', error);
            // 추가적인 오류 처리
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '200px', height: '200px' }} />
            <h2>{restaurant.name}</h2>
            <p>{restaurant.phone}</p>
            <div>
                <label>Date:</label>
                <input type="date" name="date" required />
            </div>
            <div>
                <label>Time:</label>
                <input type="time" name="time" required />
            </div>
            <div>
                <label>Party Size:</label>
                <input type="number" name="partySize" min="1" required />
            </div>
            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                Complete Reservation
            </button>
        </form>
    );
};

export default ReservationsForm;