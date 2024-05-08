import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from "formik";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const convertToUnixTimestamp = (date, time) => {
  const [hours, minutes] = time.split(":").map(Number);
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

  function formatTime(time) {
    const hour = Math.floor(time / 100);
    const minute = time % 100;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  }

  function calculateTimeRange(openTime, closeTime) {
    const startTime = formatTime(openTime).split(":").map(Number);
    const endTime = formatTime(closeTime).split(":").map(Number);
    const startHour = startTime[0];
    const endHour = endTime[0];
    const times = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour !== endHour) {
        times.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return times;
  }

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

        const reservationTime = convertToUnixTimestamp(
          values.date,
          values.time
        );

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
        <div style={{ backgroundColor: "white", padding: "50px 0" }}>
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
                      <strong>Open</strong>: {formatTime(restaurant.open_time)}{" "}
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
                justifyContent: "space-between",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    marginLeft: "80px",
                  }}
                >
                  Please select your party size:
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginLeft: "100px",
                  }}
                >
                  {Array.from({ length: Math.ceil(20 / 3) }, (_, rowIndex) => (
                    <Stack
                      key={rowIndex}
                      direction="row"
                      spacing={1}
                      style={{ marginBottom: "10px" }}
                    >
                      {Array.from({ length: 3 }, (_, colIndex) => {
                        const index = rowIndex * 3 + colIndex;
                        return index < 20 ? (
                          <Button
                            key={index}
                            onClick={() =>
                              setFieldValue("partySize", index + 1)
                            }
                            variant={
                              values.partySize === index + 1
                                ? "contained"
                                : "outlined"
                            }
                          >
                            {index + 1}
                          </Button>
                        ) : null;
                      })}
                    </Stack>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    marginRight: "100px",
                  }}
                >
                  Please select your desired date and time:
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
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
                  <div style={{ marginLeft: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        marginBottom: "30px",
                        marginRight: "50px",
                      }}
                    >
                      {Array.from(
                        {
                          length: Math.ceil(
                            calculateTimeRange(
                              restaurant.open_time,
                              restaurant.close_time
                            ).length / 4
                          ),
                        },
                        (_, rowIndex) => (
                          <Stack
                            key={rowIndex}
                            direction="row"
                            spacing={2}
                            style={{ marginBottom: "10px" }}
                          >
                            {calculateTimeRange(
                              restaurant.open_time,
                              restaurant.close_time
                            )
                              .slice(rowIndex * 3, rowIndex * 3 + 3)
                              .map((time) => (
                                <Button
                                  key={time}
                                  onClick={() => setFieldValue("time", time)}
                                  variant={
                                    values.time === time
                                      ? "contained"
                                      : "outlined"
                                  }
                                >
                                  {time}
                                </Button>
                              ))}
                          </Stack>
                        )
                      )}
                    </div>
                  </div>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button type="submit" variant="outlined">
                Submit Reservation
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ReservationForm;
