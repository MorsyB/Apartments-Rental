"use client";

import { Row, Col } from "react-bootstrap";
import ApartmentCard from "./ApartmentCard";
import ApartmentListItem from "./ApartmentListItem";

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

interface ApartmentListProps {
  apartments: Apartment[];
  grid?: boolean;
}

export default function ApartmentList({ apartments, grid = false }: ApartmentListProps) {
  if (grid) {
    return (
      <Row xs={1} md={3} lg={4} className="g-4">
        {apartments.map((apt, i) => (
          <Col key={i}>
            <ApartmentCard {...apt} />
          </Col>
        ))}
      </Row>
    );
  }
  return (
    <Row xs={1} className="g-4">
      {apartments.map((apt, i) => (
        <Col key={i}>
          <ApartmentListItem {...apt} />
        </Col>
      ))}
    </Row>
  );
}
