import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const itemsPerPage = 10;

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch("/api/restaurants/3/reservations")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => b.reservation_time - a.reservation_time
        );

        const formattedData = sortedData.map((reservation) => ({
          ...reservation,
          reservation_time: new Date(
            reservation.reservation_time * 1000
          ).toLocaleString(),
        }));

        setReservations(formattedData);
        setTotalPages(Math.ceil(formattedData.length / itemsPerPage));
      })
      .catch((error) => console.error("Failed to fetch reservations:", error));
  }, [id]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (reservationId) => {
    // 수정 버튼 클릭 시 실행될 코드
    console.log(`Editing reservation ${reservationId}`);
  };

  const handleCancel = (reservationId) => {
    // 취소 버튼 클릭 시 실행될 코드
    console.log(`Canceling reservation ${reservationId}`);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReservations = reservations.slice(startIndex, endIndex);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="reservation table">
        <TableHead>
          <TableRow>
            <TableCell>Reservation ID</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Table Size</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Note</TableCell>
            <TableCell align="right">User ID</TableCell>
            <TableCell align="right">Restaurant ID</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentReservations.length > 0 ? (
            currentReservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell component="th" scope="row">
                  {reservation.id}
                </TableCell>
                <TableCell align="right">
                  {reservation.reservation_time}
                </TableCell>
                <TableCell align="right">{reservation.table_size}</TableCell>
                <TableCell align="right">{reservation.status}</TableCell>
                <TableCell align="right">{reservation.note}</TableCell>
                <TableCell align="right">{reservation.user_id}</TableCell>
                <TableCell align="right">{reservation.restaurant_id}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(reservation.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCancel(reservation.id)}
                    style={{ marginLeft: "8px" }}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No reservations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <ArrowBackIosIcon
          style={{ cursor: "pointer" }}
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <div
            key={page}
            style={{
              cursor: "pointer",
              backgroundColor: currentPage === page ? "#ccc" : "#fff",
              padding: "8px 16px",
              marginLeft: "8px",
              marginRight: "8px",
            }}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </div>
        ))}
        <ArrowForwardIosIcon
          style={{ cursor: "pointer" }}
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
        />
      </div>
    </TableContainer>
  );
};

export default ReservationsTable;
