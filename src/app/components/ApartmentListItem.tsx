"use client";

import React from "react";
import { Card, Badge, Row, Col } from "react-bootstrap";

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
  return (
    <Card className="shadow rounded-4 h-100 apartment-card-hover d-flex flex-row" style={{ height: "200px" }}>
      <Card.Img
        variant="top"
        src={image}
        className="rounded-start-4"
        style={{ width: "30%", objectFit: "cover", height: "250px" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between" style={{ width: "60%" }}>
        <div>
          <Card.Title>{price} /mo</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
          <Card.Text className="small text-muted">{location}</Card.Text>
          <Card.Text className="small">
            {beds} beds &bull; {baths} baths &bull; {size}
          </Card.Text>
        </div>
        <div className="d-flex flex-wrap gap-1">
          {amenities.map((a, i) => (
            <Badge bg="secondary" key={i}>
              {a}
            </Badge>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}
