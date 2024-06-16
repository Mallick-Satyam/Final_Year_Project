

import React, { useState } from "react";
import { Row, Col, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from "../redux/actions/userActions";
import axios from 'axios';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; 
import DefaultLayout from "../components/DefaultLayout";

AOS.init();

function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertsReducer);
  const [contactError, setContactError] = useState("");

  const onFinish = (values) => {
    if (values.password !== values.cpassword) {
      message.error("Passwords do not match!");
    } else {
      const { username, password, contact } = values;
      if (isContactUnique(contact)) {
        dispatch(userRegister({ username, password, contact }));
      } else {
        setContactError("This contact number is already registered.");
      }
    }
  };

  const isContactUnique = async (contact) => {
    try {
      const response = await axios.get(`/api/users/check-contact/${contact}`);
      return response.data.isUnique;
    } catch (error) {
      console.error('Error checking contact number uniqueness:', error);
      return true; // Return true by default to allow registration (handle error gracefully)
    }
  };

  return (
    <div className="login">
      {loading && (<Spinner />)}
      <h1 className="heading-for-all">
        Register and explore the car of your choice
      </h1>
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img 
           className='w-100'
           data-aos='slide-left'
           data-aos-duration='1500'
           src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
          />
          <h1 className="login-logo">WERIDE</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
            <h1>Register</h1>
            <hr />
            
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="contact"
              label="Contact number"
              rules={[
                { required: true },
                {
                  validator: async (_, contact) => {
                    if (!contact || await isContactUnique(contact)) {
                      return Promise.resolve();
                    }
                    return Promise.reject("This contact number is already registered.");
                  }
                }
              ]}
              validateStatus={contactError ? "error" : ""}
              help={contactError}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[@_#])(?=.*\d)[A-Za-z\d@_#]{10,}$/,
                  message: "Password must be at least 10 characters long, contain at least one capital letter, one special character (@, _, #), and one numeric value."
                }
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>

            <button className="btn1 mt-2 mb-3">Register</button>
            <br />

            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;




