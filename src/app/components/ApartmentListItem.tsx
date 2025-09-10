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
      </Card.Body>
    </Card>
  );
}
