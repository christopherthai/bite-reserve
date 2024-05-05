import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RestaurantDetail = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/restaurants/${id}`)
            .then(response => response.json())
            .then(data => setRestaurant(data))
            .catch(error => console.error('Error loading the restaurant', error));

        // 자동 로그인 체크
        fetch("/api/check_session")
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                }
            });
    }, [id]);

    const handleReservationClick = () => {
        // 로그인 상태가 아니라면 로그인 페이지로 이동 여부를 확인
        if (!user) {
            if (window.confirm("You are not logged in. Would you like to go to the login page?")) {
                navigate("/login");
            }
        } else {
            navigate(`/reservationsform/${restaurant.id}`);
        }
    };

    if (!restaurant) return <div>Loading...</div>;

    const ratingStars = Array.from({ length: 5 }).map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} color="orange" />
    ));

    return (
        <div style={{ padding: '20px' }}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <h2>{restaurant.name}</h2>
            <div>{ratingStars}</div>
            <h3>{restaurant.category}</h3>
            <h3>{restaurant.phone}</h3>
            <h3>{restaurant.address}</h3>
            <h3>{restaurant.city}</h3>
            <h3>{restaurant.state}</h3>
            <h3>{restaurant.zip}</h3>
            <h3>{restaurant.website}</h3>
            <h3>{restaurant.menu}</h3>
            <button onClick={handleReservationClick} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                Reservation
            </button>
        </div>
    );
};

export default RestaurantDetail;