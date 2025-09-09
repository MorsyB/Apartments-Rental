"use client";

import { Card, Badge } from "react-bootstrap";

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
  return (
    <Card className="shadow rounded-4 h-100 apartment-card-hover" style={{ height: '350px !important' }}>
      <Card.Img variant="top" src={image} className="rounded-top-4"/>
      <Card.Body>
        <Card.Title>{price} /mo</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
        <Card.Text className="small text-muted">{location}</Card.Text>
        <Card.Text className="small">
          {beds} beds • {baths} baths • {size}
        </Card.Text>
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
