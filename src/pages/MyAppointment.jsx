import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Layout from "../components/Layout";
import { Spinner, Container, Card, Alert, Button, Modal, Form } from "react-bootstrap";

export default function MyAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    phone_number: '',
    email: '',
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No token found");
          return;
        }

        const decode = jwtDecode(token);
        const userId = decode.id;

        const response = await axios.get(
          `https://e2236c9c-0918-4d1f-8499-791c1fe6fcfe-00-16q0lr6ljsfbf.pike.replit.dev/bookings?user_id=${userId}`
        );

        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
        alert("Failed to fetch appointment. Please try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Format date as YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle edit button click
  const handleEditClick = (appointment) => {
    setAppointmentToEdit(appointment);
    setFormData({
      title: appointment.title,
      description: appointment.description,
      date: formatDate(appointment.date),
      time: appointment.time,
      phone_number: appointment.phone_number,
      email: appointment.email,
    });
    setShowEditModal(true);
  };

  // Handle save updated appointment
  const handleSaveAppointment = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const decode = jwtDecode(token);
      const userId = decode.id;

      const response = await axios.put(
        `https://e2236c9c-0918-4d1f-8499-791c1fe6fcfe-00-16q0lr6ljsfbf.pike.replit.dev/bookings/${appointmentToEdit.id}?user_id=${userId}`,
        formData
      );

      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === appointmentToEdit.id ? response.data : appointment
      );
      setAppointments(updatedAppointments);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to update appointment. Please try again later.");
    }
  };

  // Handle delete button click
  const handleDeleteClick = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const decode = jwtDecode(token);
      const userId = decode.id;

      await axios.delete(
        `https://e2236c9c-0918-4d1f-8499-791c1fe6fcfe-00-16q0lr6ljsfbf.pike.replit.dev/bookings/${id}?user_id=${userId}`
      );

      const updatedAppointments = appointments.filter(
        (appointment) => appointment.id !== id
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment. Please try again later.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <Spinner animation="border" role="status" className="mt-4">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-center fw-bold">My Appointment</h1>
      {appointments.length === 0 ? (
        <Alert variant="info" className="mt-4">
          You have no appointments.
        </Alert>
      ) : (
        <Container className="mt-5" style={{ padding: "0 15px" }}>
          {appointments.map((appointment, index) => (
            <Card key={appointment.id} className="mb-5 appointment-card">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5><strong>Appointment #{index + 1}</strong></h5>
                <span>
                  <Button
                    variant="secondary"
                    onClick={() => handleEditClick(appointment)}
                    className="me-2"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => handleDeleteClick(appointment.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </span>
              </Card.Header>
              <Card.Body>
                <Card.Title className="fw-bold">{appointment.title}</Card.Title>
                <Card.Text>
                  <p style={{ fontSize: "15px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <span style={{ marginRight: '20px' }}><strong>Date/Time: {formatDate(appointment.date)} {appointment.time}</strong></span>
                  </p>
                  <div style={{ color: "grey" }}>
                    <strong>Description: </strong>{appointment.description}<br />
                    <strong>Phone Number: </strong>{appointment.phone_number}<br />
                    <strong>Email: </strong>{appointment.email}<br />
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Edit Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSaveAppointment}>
            Update Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
