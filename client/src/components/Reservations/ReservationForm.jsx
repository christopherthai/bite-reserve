import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from "formik";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const convertToUnixTimestamp = (date, time) => {
  // Ensure date is a string
  date = typeof date === 'string' ? date : date.toString();

  // Ensure time is a string
  time = typeof time === 'string' ? time : time.toString();

  // Extract hours and minutes from time string
  const hours = parseInt(time.slice(0, 2));
  const minutes = parseInt(time.slice(2));

  // Create a Date object from the date string without the time part
  const dateTime = new Date(date.split(" ").slice(0, 4).join(" "));

  // Set hours and minutes in the Date object
  dateTime.setHours(hours, minutes, 0, 0);

  // Return the Unix timestamp (in seconds)
  return Math.floor(dateTime.getTime() / 1000);
};

const ReservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => (response.ok ? response.json() : null))
      .then((userData) => setUser(userData));

    fetch(`/api/restaurants/${id}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data) {
          setRestaurant(data);
        }
      })
      .catch((error) => console.error("No restaurant found", error));
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  console.log("Restaurant Data:", restaurant); // Log restaurant data

  // Modify the formatTime function to convert time to 12-hour format
  // Modify the formatTime function to convert time to 12-hour format
function formatTime(hour, minute) {
  // Ensure minute is within valid range (0 to 59)
  minute = minute || 0; // Set minute to 0 if it's not defined
  minute = Math.min(Math.max(minute, 0), 59); // Ensure minute is within valid range
  
  // Adjust hour for 12-hour format
  let adjustedHour = hour % 12;
  adjustedHour = adjustedHour === 0 ? 12 : adjustedHour; // Handle midnight (0) as 12
  
  // Determine meridiem (AM/PM)
  let meridiem = hour < 12 ? "AM" : "PM"; // Determine AM/PM
  
  // Return formatted time string
  return `${adjustedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${meridiem}`;
}

  // Update the calculateTimeRange function to handle 24-hour format correctly
  function calculateTimeRange(openTime, closeTime) {
    const startTime = parseInt(openTime);
    const endTime = parseInt(closeTime);
    const startHour = Math.floor(startTime / 100);
    const endHour = Math.floor(endTime / 100);
    const times = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(hour * 100); // Push full hour in 24-hour format
      if (hour !== endHour) {
        times.push(hour * 100 + 30); // Push half hour in 24-hour format
      }
    }
    return times;

  }
  

  // Function to convert open time to formatted string
function formatOpenTime(openTime) {
  // Convert openTime to string format "HH:MM"
  const hours = Math.floor(openTime / 100); // Extract hours
  const minutes = openTime % 100; // Extract minutes
  const meridiem = hours < 12 ? "AM" : "PM"; // Determine AM/PM
  
  // Adjust hours for 12-hour format
  const adjustedHour = hours % 12 || 12; // Handle midnight (0) as 12

  // Return formatted open time string
  return `${adjustedHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${meridiem}`;
}

  console.log("Open Time:", restaurant.open_time); // Log open time
  console.log("Close Time:", restaurant.close_time); // Log close time
  return (
    <Formik
      initialValues={{
        partySize: "1",
        date: new Date(),
        time: "12:00",
        notes: "",
      }}
      onSubmit={async (values) => {
        if (!user) {
          if (
            window.confirm(
              "You are not logged in. Would you like to go to the login page?"
            )
          ) {
            navigate("/login");
          } else {
            navigate("/");
          }
          return;
        }

        // console.log(reservationTime)
        console.log(values.date)

        const reservationTime = convertToUnixTimestamp(values.date, values.time);
       

      console.log(reservationTime)
        const response = await fetch(`/api/restaurants/${id}/reservations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reservation_time: reservationTime,
            table_size: parseInt(values.partySize),
            status: "confirmed",
            user_id: user.id,
            notes: values.notes.toString(),
            restaurant_id: id,
          }),
        });

        if (response.ok) {
          const reservationData = await response.json();
          navigate("/reservations", {
            state: { reservationId: reservationData.id },
          });
        } else {
          console.error("Failed to create reservation");
        }
      }}
    >
      {({ setFieldValue, values }) => (
        <div style={{ backgroundColor: "white", padding: "50px 0", width: "900px",                     boxShadow: "0 4px 8px rgba(0, 0, 1, 1.4)"
      }}>
          <Form>
            {restaurant && (
              <div>
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="restaurant-image"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    boxShadow: "0 4px 8px rgba(0, 0, 1, 1.4)",
                  }}
                />
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <h2
                    style={{
                      fontSize: "3rem",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    {restaurant.name}
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 100px",
                    }}
                  >
                    <p style={{ fontSize: "1.5rem", margin: 0 }}>
                      <strong>Phone</strong>: {restaurant.phone}
                    </p>
                    <p style={{ fontSize: "1.5rem", margin: 0 }}>
                      <strong>Open</strong>: {formatOpenTime(restaurant.open_time)}{" "}
                      ~ <strong>Close</strong>:{" "}
                      {formatTime(restaurant.close_time)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Party size selector and date selector */}
              <div className="selectors-container" style={{ display: "flex", justifyContent: "center" }}>
                {/* Party size selector */}
                <div className="party-size-selector" style={{ marginRight: "20px" }}>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      marginLeft: "30px",
                    }}
                  >
                  Select your party size:
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: "150px",
                    }}
                  >
                    {Array.from({ length: Math.ceil(20 / 4) }, (_, rowIndex) => (
                      <Stack
                        key={rowIndex}
                        direction="row"
                        spacing={1}
                        style={{ marginBottom: "10px" }}
                      >
                        {Array.from({ length: 4 }, (_, colIndex) => {
                          const index = rowIndex * 4 + colIndex;
                          return index < 20 ? (
                            <Button
                              key={index}
                              onClick={() => setFieldValue("partySize", index + 1)}
                              variant={values.partySize === index + 1 ? "contained" : "outlined"}
                            >
                              {index + 1}
                            </Button>
                          ) : null;
                        })}
                      </Stack>
                    ))}
                  </div>
                </div>

                {/* Date selector */}
                <div className="date-selector">
                  <p
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Select your desired date:
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <DatePicker
                      selected={values.date}
                      onChange={(date) => setFieldValue("date", date)}
                      minDate={new Date()}
                      maxDate={
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() + 1)
                        )
                      }
                      showTimeSelect={false}
                      inline
                      calendarClassName="custom-calendar"
                    />
                  </div>
                </div>
              </div>

              {/* Time selector */}
            <div className="time-selector" style={{ marginTop: "20px", textAlign: "center", width: "100%", marginLeft: "auto", marginRight: "auto", maxWidth: "900px" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Select your desired time:
              </p>
              <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {calculateTimeRange(restaurant.open_time, restaurant.close_time).map((time) => (
                <Button
                  key={time}
                  onClick={() => setFieldValue("time", time)}
                  variant={values.time === time ? "contained" : "outlined"}
                  style={{
                    flexBasis: "calc(100% / 7 - 20px)",
                    marginBottom: "10px",
                    marginLeft: "5px",
                    marginRight: "5px",
                    minWidth: "100px", // Set minimum width to accommodate longer text
                    maxWidth: "150px",
                    paddingRight: "5px",
                    height: "40px",
                  }}
                >
                  {formatTime(Math.floor(time / 100), time % 100)}
                </Button>
              ))}
            </div>
            </div>
            </div>
            <div
              style={{
                marginTop: "0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                If you have any special requests, please write them below:
              </p>
              <Field
                as="textarea"
                name="notes"
                placeholder="Enter any special requests or notes"
                className="form-control"
                style={{ width: "50%" }}
              />
            </div>
            
            
             {/* Submit button */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit Reservation
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ReservationForm;
