"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, ButtonGroup, ToggleButton, Modal } from "react-bootstrap";
import { FaList, FaTh, FaFilter } from "react-icons/fa";
import RentFinderNavbar from "../components/RentFinderNavbar";
import FiltersSidebar from "../components/FiltersSidebar";
import ApartmentList from "../components/ApartmentList";
import AddApartmentModal from "../components/AddApartmentModal";
import { API_BASE_URL } from "../../config/constants";

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
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  // New states for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000] as [number, number],
    bedrooms: "Any",
    bathrooms: "Any",
    amenities: [] as string[],
  });

  const fetchApartments = async () => {
    try {
      const URL = `${API_BASE_URL}/apartments`;
      const response = await fetch(URL);
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

  // Filter and search logic
  const filteredApartments = apartments.filter((apt) => {
    // Search filter
    if(searchQuery.length){
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
      apt.title.toLowerCase().includes(searchLower) ||
      apt.location.toLowerCase().includes(searchLower) ||
      apt.amenities.some((a) => a.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }
    
    // Price filter
    const priceNum = parseFloat(apt.price.replace("$", ""));
    if (priceNum < filters.priceRange[0] || priceNum > filters.priceRange[1]) return false;
    
    // Bedrooms filter
    if (filters.bedrooms !== "Any") {
      if (filters.bedrooms === "3+" && apt.beds < 3) return false;
      else if (filters.bedrooms !== "3+" && apt.beds !== parseInt(filters.bedrooms)) return false;
    }

    // Bathrooms filter
    if (filters.bathrooms !== "Any") {
      if (filters.bathrooms === "3+" && apt.baths < 3) return false;
      else if (filters.bathrooms !== "3+" && apt.baths !== parseInt(filters.bathrooms)) return false;
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      for (const amenity of filters.amenities) {
        if (!apt.amenities.includes(amenity)) return false;
      }
    }
    return true;
  });

  // Handlers for search and filters
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <RentFinderNavbar />
      <Container fluid className="mt-4 pt-5">
        <Row>
          <Col md={3} className="d-none d-md-block">
            <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />
          </Col>
          <Col md={9} xs={12}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
              <h4 className="mb-3 mb-md-0">Available Apartments</h4>
              <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center w-100 w-md-auto">
                <input
                  type="text"
                  placeholder="Search apartments..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="form-control me-2 mb-2 mb-sm-0"
                  style={{ maxWidth: "300px" }}
                />
                <Button variant="outline-secondary" className="mb-2 mb-sm-0 me-sm-2 rounded-pill d-lg-none" onClick={() => setShowFiltersModal(true)}>
                  <FaFilter /> Filters
                </Button>
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
              <ApartmentList apartments={filteredApartments} />
            ) : (
              <ApartmentList apartments={filteredApartments} grid />
            )}
          </Col>
        </Row>
      </Container>
      <AddApartmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onApartmentAdded={fetchApartments}
      />
      <Modal show={showFiltersModal} onHide={() => setShowFiltersModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />
        </Modal.Body>
      </Modal>
    </>
  );
}
