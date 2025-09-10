"use client";

import React, { useState } from "react";
import { Card, Badge, Row, Col, Button, Modal } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GOOGLE_MAPS_API_KEY } from "@/config/constants";

interface ApartmentProps {
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  size: string;
  image: string;
  amenities: string[];
}

export default function ApartmentListItem({
  title,
  price,
  location,
  beds,
  baths,
  size,
  image,
  amenities,
}: ApartmentProps) {
  const [showMapModal, setShowMapModal] = useState(false);

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(location)}`;

  return (
    <>
      <Card className="shadow rounded-4 h-100 apartment-card-hover d-flex flex-column flex-sm-row" style={{ minHeight: "200px" }}>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "150px" }}>
          <Card.Img
            variant="top"
            src={image}
            className="rounded-start-4 w-100 h-100"
            style={{ objectFit: "cover", maxWidth: "200px", maxHeight: "150px" }}
          />
        </div>
        <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
          <div>
            <Card.Title className="h5">{price} /mo</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
            <Card.Text className="small text-muted">{location}</Card.Text>
            <Card.Text className="small">
              {beds} beds • {baths} baths • {size}
            </Card.Text>
          </div>
          <div className="d-flex flex-wrap gap-1 mt-2">
            {amenities.map((a, i) => (
              <Badge bg="secondary" key={i} className="small">
                {a}
              </Badge>
            ))}
          </div>
          <div className="mt-2">
            <Button
              variant="outline-dark"
              size="sm"
              onClick={() => setShowMapModal(true)}
              style={{
                backgroundColor: 'transparent',
                borderColor: '#000',
                color: '#000',
                border: '1px solid #000'
              }}
            >
              <FaMapMarkerAlt /> View Map
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showMapModal} onHide={() => setShowMapModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title} - Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={mapUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${title} map`}
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}
