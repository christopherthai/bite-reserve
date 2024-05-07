import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import LoginForm from "../components/LoginForm";
import UpdateReservationForm from "../components/Reservations/UpdateReservation";

const itemsPerPage = 10;


const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    // 사용자 세션 확인
    fetch("/api/check_session")
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user);
                    console.log('id:', user); // 콘솔에 사용자 정보 출력
    
                    // 현재 로그인한 사용자의 아이디를 가져왔으므로 이를 이용하여 예약 목록을 가져오는 함수 호출
                    fetchReservations(user.id);
                });
            }
        })
        .catch(error => console.error('Failed to check session:', error));

    // 의존성 배열을 빈 배열로 설정하여 이 효과가 한 번만 실행되도록 함
}, []);

if (!user) {
  return <LoginForm />;
}
    
    // 예약 목록을 가져오는 함수 정의
    function fetchReservations(userId) {
        fetch('/api/reservations')
          .then(res => res.json())
          .then(data => {
            // 현재 로그인한 사용자의 아이디와 일치하는 예약 목록 필터링
            const userReservations = data.filter(reservation => reservation.user_id === userId);
      
            const sortedData = userReservations.sort((a, b) => b.reservation_time - a.reservation_time);
      
            const formattedData = sortedData.map(reservation => ({
              ...reservation,
              reservation_time: new Date(reservation.reservation_time * 1000).toLocaleString(),
            }));
      
            setReservations(formattedData);
            setTotalPages(Math.ceil(formattedData.length / itemsPerPage));
          })
          .catch(error => console.error('Failed to fetch reservations:', error));
      }

const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle update reservation data from AdminUpdateReservationForm component and update the state
const handleUpdateReservation = (reservation) => {
    const updatedRestaurants = restaurants.map((restaurant) => {
      return {
        ...restaurant,
        reservations: restaurant.reservations.map((r) =>
          r.id === reservation.id ? reservation : r
        ),
      };
    });
    setRestaurants(updatedRestaurants);
  };




  //Cancels user reservation and updates the db
const handleCancel = (id) => {
      fetch(`/api/reservation/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
            return response.text().then((text) => (text ? JSON.parse(text) : {})); // parse the response to JSON object if it is not empty
          }
        })
        .then(() => {
          // Remove the deleted reservation from the state
          const updatedReservations = reservations.filter(
            (reservation) => reservation.id !== id
          );
          setReservations(updatedReservations);
        })
        .catch((error) => console.error("Error:", error));
    };// 취소 버튼 클릭 시 실행될 코드
    
  

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReservations = reservations.slice(startIndex, endIndex);
  

  return (
    <TableContainer component={Paper} style = {{ boxShadow: '0 4px 8px rgba(0, 0, 0, 2)'}}>
      <Table sx={{ minWidth: 650 }} aria-label="reservation table">
        <TableHead>
          <TableRow >
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Table Size</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Notes</TableCell>
            
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody> 
          {currentReservations.length > 0 ? (
            currentReservations.map((reservation, index) => (
              <TableRow key={reservation.id} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'white' }}>
                <TableCell align="right">{reservation.reservation_time}</TableCell>
                <TableCell align="right">{reservation.table_size}</TableCell>
                <TableCell align="right">{reservation.status}</TableCell>
                <TableCell align="right">{reservation.notes}</TableCell>
                
                <TableCell align="right" style={{ width: "100px" }}>
                      <UpdateReservationForm
                        reservation={reservation}
                        onReservationChange={
                          handleUpdateReservation
                        }
                      />
                  </TableCell>
                  <TableCell style={{ width: "100px" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCancel(reservation.id)}
                    style={{ marginLeft: '8px' }}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">No reservations found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <ArrowBackIosIcon
          style={{ cursor: 'pointer' }}
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <div
            key={page}
            style={{
              cursor: 'pointer',
              backgroundColor: currentPage === page ? '#ccc' : '#fff',
              padding: '8px 16px',
              marginLeft: '8px',
              marginRight: '8px',
            }}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </div>
        ))}
        <ArrowForwardIosIcon
          style={{ cursor: 'pointer' }}
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
        />
      </div>
    </TableContainer>
  );
};


export default ReservationsTable;