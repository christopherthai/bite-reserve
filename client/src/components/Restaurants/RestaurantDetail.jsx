import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // useParams와 useNavigate를 한 줄에 import

const RestaurantDetail = () => {
    const { id } = useParams();  // URL에서 레스토랑 ID 가져오기
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();

    const handleReservationClick = () => {
        // 예약 페이지로 이동
        navigate(`/reservationsform/${restaurant.id}`);
        // navigate('/reservationsform/');
    };

    useEffect(() => {
        // 여기에서 레스토랑 데이터를 불러오는 API 호출을 구현
        fetch(`/api/restaurants/${id}`)
            .then(response => response.json())
            .then(data => setRestaurant(data))
            .catch(error => console.error('Error loading the restaurant', error));
    }, [id]);

    if (!restaurant) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <h2>{restaurant.name}</h2>
            <h3>{restaurant.category}</h3>
            <h3>{restaurant.phone}</h3>
            <h3>{restaurant.address}</h3>
            <h3>{restaurant.city}</h3>
            <h3>{restaurant.state}</h3>
            <h3>{restaurant.zip}</h3>
            <h3>{restaurant.website}</h3>
            <h3>{restaurant.menu}</h3>
            <button onClick={handleReservationClick} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                reservation
            </button>
            {/* 기타 레스토랑 정보를 표시할 수 있는 요소들 추가 */}
        </div>
    );
};

export default RestaurantDetail;