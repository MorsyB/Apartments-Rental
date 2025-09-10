"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { FaList, FaTh } from "react-icons/fa";
import RentFinderNavbar from "../components/RentFinderNavbar";
import FiltersSidebar from "../components/FiltersSidebar";
import ApartmentList from "../components/ApartmentList";
import AddApartmentModal from "../components/AddApartmentModal";

interface Apartment {
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  size: string;
  image: string;
  amenities: string[];
}

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const fetchApartments = async () => {
    try {
      const response = await fetch("https://apartments-rental.onrender.com/api/apartments");
      if (!response.ok) {
        throw new Error("Failed to fetch apartments");
      }
      const data = await response.json();
      // Transform data to match expected interface
      const transformedData = data.map((apt: Apartment) => ({
        title: apt.title,
        price: `$${apt.price}`,
        location: apt.location,
        beds: apt.beds,
        baths: apt.baths,
        size: apt.size,
        image: apt.image,
        amenities: apt.amenities,
      }));
      setApartments(transformedData);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  return (
    <>
      <RentFinderNavbar />
      <Container fluid className="mt-4 pt-5">
        <Row>
          <Col md={3} className="d-none d-md-block">
            <FiltersSidebar />
          </Col>
          <Col md={9} xs={12}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <h4 className="mb-3 mb-md-0">Available Apartments</h4>
            <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center w-100 w-md-auto">
              <Button variant="dark" className="mb-2 mb-sm-0 me-sm-2 rounded-pill" onClick={() => setShowModal(true)}>
                Add New Apartment
              </Button>
              <ButtonGroup className="rounded-pill d-none d-md-flex">
                <ToggleButton
                  id="toggle-list"
                  type="radio"
                  variant="outline-dark"
                  name="viewMode"
                  value="list"
                  checked={viewMode === "list"}
                  onChange={(e) => setViewMode(e.currentTarget.value)}
                >
                  <FaList />
                </ToggleButton>
                <ToggleButton
                  id="toggle-grid"
                  type="radio"
                  variant="outline-dark"
                  name="viewMode"
                  value="grid"
                  checked={viewMode === "grid"}
                  onChange={(e) => setViewMode(e.currentTarget.value)}
                >
                  <FaTh />
                </ToggleButton>
              </ButtonGroup>
            </div>
          </div>
          {viewMode === "list" ? (
            <ApartmentList apartments={apartments} />
          ) : (
            <ApartmentList apartments={apartments} grid />
          )}
          </Col>
        </Row>
      </Container>
      <AddApartmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onApartmentAdded={fetchApartments}
      />
    </>
  );
}
