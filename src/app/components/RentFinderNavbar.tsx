"use client";

import { Navbar, Nav, Container, Form, Button, Offcanvas } from "react-bootstrap";
import { FaHeart, FaUser, FaSearch, FaBars } from "react-icons/fa";

export default function RentFinderNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="fixed-top shadow px-3">
      <Container fluid>
        {/* Mobile: Centered Brand */}
        <div className="d-lg-none w-100 text-center">
          <Navbar.Brand href="#" className="fw-bold d-flex align-items-center justify-content-center">
            <span className="me-2">
              <img
                alt=""
                src="https://i.pinimg.com/564x/58/f9/29/58f929029e220b69716d342df56d34c4.jpg"
                width="30"
                className="d-inline-block align-top"
              />
            </span>
            <span>RentFinder</span>
          </Navbar.Brand>
        </div>

        {/* Desktop: Left Brand */}
        <Navbar.Brand href="#" className="fw-bold d-none d-lg-flex align-items-center">
          <span className="me-2">
            <img
              alt=""
              src="https://i.pinimg.com/564x/58/f9/29/58f929029e220b69716d342df56d34c4.jpg"
              width="30"
              className="d-inline-block align-top"
            />
          </span>
          <span>RentFinder</span>
        </Navbar.Brand>

        {/* Mobile Search Button - Hidden on small screens */}

        <Navbar.Toggle aria-controls="navbar-nav" className="d-lg-none position-absolute" style={{ right: '15px' }}>
          <FaBars />
        </Navbar.Toggle>

        {/* Desktop Search */}
        <Form className="d-none d-lg-flex mx-auto w-50">
          <Form.Control
            type="search"
            placeholder="Search by location, neighborhood..."
            className="me-2 rounded-pill"
          />
        </Form>

        {/* Desktop Nav */}
        <Nav className="d-none d-lg-flex ms-auto align-items-center">
          <Nav.Link href="#favorites">
            <FaHeart className="me-1" /> Favorites
          </Nav.Link>
          <Nav.Link href="#signin">
            <FaUser className="me-1" /> Sign In
          </Nav.Link>
        </Nav>

        {/* Mobile Offcanvas Menu */}
        <Navbar.Offcanvas
          id="navbar-nav"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="d-lg-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form className="mb-3">
              <Form.Control
                type="search"
                placeholder="Search by location, neighborhood..."
                className="rounded-pill"
              />
            </Form>
            <Nav className="flex-column">
              <Nav.Link href="#favorites" className="py-2">
                <FaHeart className="me-2" /> Favorites
              </Nav.Link>
              <Nav.Link href="#signin" className="py-2">
                <FaUser className="me-2" /> Sign In
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
