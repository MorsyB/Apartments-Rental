"use client";

import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { FaHeart, FaUser, FaPlus } from "react-icons/fa";

export default function RentFinderNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="fixed-top shadow px-3">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold d-flex align-items-center">
          <span className="me-2">📍</span> RentFinder
        </Navbar.Brand>

        <Form className="d-flex mx-auto w-50">
          <Form.Control
            type="search"
            placeholder="Search by location, neighborhood..."
            className="me-2 rounded-pill"
          />
        </Form>

        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Link href="#favorites">
            <FaHeart className="me-1" /> Favorites
          </Nav.Link>
          <Nav.Link href="#signin">
            <FaUser className="me-1" /> Sign In
          </Nav.Link>

        </Nav>
      </Container>
    </Navbar>
  );
}
