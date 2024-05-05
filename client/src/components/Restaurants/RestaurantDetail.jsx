import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RestaurantDetail = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();

    const handleReservationClick = () => {
        navigate(`/reservationsform/${restaurant.id}`);
    };

    useEffect(() => {
        fetch(`/api/restaurants/${id}`)
            .then(response => response.json())
            .then(data => setRestaurant(data))
            .catch(error => console.error('Error loading the restaurant', error));
    }, [id]);

    if (!restaurant) return <div>Loading...</div>;

    // 별 레이팅 표시 (현재는 정적)
    const ratingStars = Array.from({ length: 5 }).map((_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} color="orange" />
    ));

    return (
        <div style={{ padding: '20px' }}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <h2>{restaurant.name}</h2>
            <div>{ratingStars}</div>  {/* 별 레이팅 컴포넌트 */}
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
            {/* 기타 레스토랑 정보를 표시할 수 있는 요소들 추가 */}
        </div>
    );
};

export default RestaurantDetail;