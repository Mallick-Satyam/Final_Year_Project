

import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings, cancelBooking } from "../redux/actions/bookingActions";
import { Col, Row, Button, Modal } from "antd";
import Spinner from '../components/Spinner';
import moment from "moment";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const showModal = (booking) => {
    setBookingToCancel(booking);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(cancelBooking(bookingToCancel._id));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setBookingToCancel(null);
  };

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <h3 className="text-center mt-2">My Bookings</h3>
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings.filter(o => o.user === user._id).map((booking) => {
            return (
              <Row gutter={16} className="bs1 mt-3 text-left" key={booking._id}>
                <Col lg={6} sm={24}>
                  <p><b>{booking.car.name}</b></p>
                  <p><b>{booking.car.carNumber}</b></p>
                  <p>Total hours: <b>{booking.totalHours}</b></p>
                  <p>Rent per hour: <b>{booking.car.rentPerHour}</b></p>
                  <p>Total amount: <b>{booking.totalAmount}</b></p>
                 
                
                </Col>
                <Col lg={12} sm={24}>
                  <p>Transaction Id: <b>{booking.transactionId}</b></p>
                  <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                  <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                  <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                </Col>
                <Col lg={6} sm={24} className='text-right'>
                  <img style={{ borderRadius: 5 }} src={booking.car.image} height="140" className="p-2" />
                  <Button
                    style={{ backgroundColor: 'blue', borderColor: 'blue', color: 'white' }}
                    onClick={() => showModal(booking)}
                  >
                    Cancel Booking
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>

      <Modal
        title="Confirm Cancellation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Cancel"
        cancelText="No, Keep"
      >
        <p>Are you sure you want to cancel this booking?</p>
      </Modal>
    </DefaultLayout>
  );
}

export default UserBookings;

