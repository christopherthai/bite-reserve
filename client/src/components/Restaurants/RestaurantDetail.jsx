import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapComponent = withScriptjs(withGoogleMap(({ latitude, longitude }) => (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: latitude, lng: longitude }}
    >
        <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
)));

const RestaurantDetail = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
<<<<<<< HEAD
    const [mapExpanded, setMapExpanded] = useState(true); // Change initial state to true
    const navigate = useNavigate();

    const handleReservationClick = () => {
        navigate(`/reservationsform/${restaurant.id}`);
    };

    const handleMapExpand = (expanded) => {
        setMapExpanded(expanded);
    };

=======
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

>>>>>>> development
    useEffect(() => {
        fetch(`/api/restaurants/${id}`)
            .then(response => response.json())
            .then(data => setRestaurant(data))
            .catch(error => console.error('Error loading the restaurant', error));

<<<<<<< HEAD
        // Load Google Maps API script here
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&v=3.exp&libraries=geometry,drawing,places`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
=======
        // 자동 로그인 체크
        fetch("/api/check_session")
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                }
            });
>>>>>>> development
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
<<<<<<< HEAD
        <div className="page-container" style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 1, 1.4)', textAlign: 'center' }}>
            <div style={{ padding: '20px' }}>
                <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '300px', objectFit: 'cover', boxShadow: '0 4px 8px rgba(0, 0, 1, 1.4)' }} />
                <h1 style={{ marginBottom: '10px'}}>{restaurant.name}</h1>
                <div>
                    {ratingStars} <Link to={`/restaurants/${restaurant.id}/reviews`}> (see all reviews)</Link>
                </div>
                <h3>{restaurant.category} Style Restaurant</h3>
                <h3>
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => handleMapExpand(true)}
                        onMouseLeave={() => handleMapExpand(false)}
                    >
                        {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zip}
                    </a>
                </h3>
                <h3>Phone: {restaurant.phone}</h3>
                <h3><a href={restaurant.website} target="_blank" rel="noopener noreferrer">View Website</a></h3>
                <h3><a href={restaurant.menu_link} target="_blank" rel="noopener noreferrer">View Menu</a></h3>
                <button onClick={handleReservationClick} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                    Make a Reservation
                </button>
                {/* Show the map component when mapExpanded is true */}
                {mapExpanded && (
                    <MapComponent
                        latitude={restaurant.latitude}
                        longitude={restaurant.longitude}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCOCVpAeEkgmV-AoTk8URko2mCc_3xRxmw&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div style={{ height: '200px', marginTop: '20px' }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                    />
                )}
            </div>
=======
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
>>>>>>> development
        </div>
    );
};

export default RestaurantDetail;