import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  const [mapExpanded, setMapExpanded] = useState(true); // Change initial state to true
  const navigate = useNavigate();

  const handleMapExpand = (expanded) => {
    setMapExpanded(expanded);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => setRestaurant(data))
      .catch((error) => console.error("Error loading the restaurant", error));

    // 자동 로그인 체크
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        console.log('id:', user); // 콘솔에 사용자 정보 출력
      }
    });
  }, [id]);

  const handleReservationClick = () => {
    // 로그인 상태가 아니라면 로그인 페이지로 이동 여부를 확인
    if (!user) {
      if (
        window.confirm("You are not logged in. Would you like to go to the login page?")) 
        {navigate("/login");}
    } else {
      navigate(`/reservationsform/${restaurant.id}`);
    }
    if (user) {
      if (user.IsAdmin === true){
        alert("Admin accounts cannot make reservations.")
        navigate('/');
      } 
    }
  };

  if (!restaurant) return <div>Loading...</div>;

  const ratingStars = Array.from({ length: 5 }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={faStar} color="orange" />
  ));
  

  return (
    <div
      className="page-container"
      style={{
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 1, 1.4)",
        textAlign: "center",
      }}
    >
      <div style={{ padding: "20px" }}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            boxShadow: "0 4px 8px rgba(0, 0, 1, 1.4)",
          }}
        />
        <h1 style={{ marginBottom: "10px" }}>{restaurant.name}</h1>
        <div>
          {ratingStars}{" "}
          <Link to={`/restaurants/${restaurant.id}/reviews`}>
            {" "}
            (see all reviews)
          </Link>
        </div>
        <h3>{restaurant.category} Style Restaurant</h3>
        <h3>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              restaurant.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleMapExpand(true)}
            onMouseLeave={() => handleMapExpand(false)}
          >
            {restaurant.address}, {restaurant.city}, {restaurant.state}{" "}
            {restaurant.zip}
          </a>
        </h3>
        <h3>Phone: {restaurant.phone}</h3>
        <h3>
          <a
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Website
          </a>
        </h3>
        <h3>
          <a
            href={restaurant.menu_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Menu
          </a>
        </h3>
        <button
          onClick={handleReservationClick}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Make a Reservation
        </button>
      </div>
    </div>
  );
};

export default RestaurantDetail;
