"use client";

import { Card, Badge, Button, Modal } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
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

export default function ApartmentCard({
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
      <Card className="shadow rounded-4 h-100 apartment-card-hover" style={{ height: '350px !important' }}>
        <Card.Img variant="top" src={image} className="rounded-top-4"/>
        <Card.Body>
          <Card.Title>{price} /mo</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
          <Card.Text className="small text-muted">{location}</Card.Text>
          <Card.Text className="small">
            {beds} beds • {baths} baths • {size}
          </Card.Text>
          <div className="d-flex flex-wrap gap-1 mb-2">
            {amenities.map((a, i) => (
              <Badge bg="secondary" key={i}>
                {a}
              </Badge>
            ))}
          </div>
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
