


import axios from "axios";
import { message } from "antd";

export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/bookings/bookcar", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Your car booked successfully");
    setTimeout(() => {
      window.location.href = '/userbookings'
    }, 500);

  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong, please try later");
  }
};

export const getAllBookings = () => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.get('/api/bookings/getallbookings');
    dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const cancelBooking = (bookingId) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await axios.post('/api/bookings/cancelbooking', { bookingId });
    message.success('Booking cancelled successfully');
    dispatch(getAllBookings()); 
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("Error response data:", error.response.data);
      console.log("Error response status:", error.response.status);
      console.log("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.log("Error request data:", error.request);
    } else {
      console.log("Error message:", error.message);
    }
    message.error('Something went wrong, please try later');
    dispatch({ type: 'LOADING', payload: false });
  }
};


