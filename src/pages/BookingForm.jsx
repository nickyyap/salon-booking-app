import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout"

export default function BookingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSave = () => {
    //Get JWT Token
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    //Decode the token to fetch user id
    const decode = jwtDecode(token);
    const userId = decode.id; // Assuming 'id' is in the token payload

    //Prepare data to be sent to the backend
    const bookingData = {
      title,
      description,
      date,
      time,
      phone_number: phoneNumber,
      email,
      user_id: userId,
    };

    axios
      .post("https://e2236c9c-0918-4d1f-8499-791c1fe6fcfe-00-16q0lr6ljsfbf.pike.replit.dev/bookings", bookingData)
      .then((response) => {
        console.log("Booking created:", response.data);
        setAlertMessage("Appointment created successfully!");
        //Reset form fields after success
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setPhoneNumber("");
        setEmail("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlertMessage("An error occurred while making the appointment. Please try again.");
      });
  };

  return (
    <>
      <Layout>
        <h1 className="fw-bold text-center p-4">Make Your Appointment</h1>
      {alertMessage && (
          <Alert variant={alertMessage.includes("successfully") ? "success" : "danger"}>
            {alertMessage}
          </Alert>
        )}
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Stylish</Form.Label>
            <Form.Select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="" disabled>
                --Select Stylish--
              </option>
              <option value="Beard Trim">Beard Trim</option>
              <option value="Haircut">Haircut</option>
              <option value="Hair Coloring">Hair Coloring</option>
              <option value="Hair Stylish">Hair Stylish</option>
              <option value="Makeup">Makeup</option>
              <option value="Nail Stylish">Nail Stylish</option>
              <option value="Scalp Treatment">Scalp Treatment</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="time">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="6012-3456789"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button className="mt-3" variant="dark" onClick={handleSave}>
          Make Appointment
        </Button>
      </Layout>
    </>
  );
}
