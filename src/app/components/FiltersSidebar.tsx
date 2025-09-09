"use client";

import { Card, Form } from "react-bootstrap";

export default function FiltersSidebar() {
  return (
    <Card className="p-3 shadow rounded-4">
      <h5 className="mb-3">Filters</h5>
      <Form>
        {/* Price Range */}
        <Form.Group className="mb-3">
          <Form.Label>Price Range</Form.Label>
          <Form.Range />
        </Form.Group>

        {/* Bedrooms */}
        <Form.Group className="mb-3">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Select>
            <option>Any</option>
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </Form.Select>
        </Form.Group>

        {/* Bathrooms */}
        <Form.Group className="mb-3">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Select>
            <option>Any</option>
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </Form.Select>
        </Form.Group>

        {/* Amenities */}
        <Form.Group>
          <Form.Label>Amenities</Form.Label>
          <div>
            <Form.Check type="checkbox" label="Parking" />
            <Form.Check type="checkbox" label="Pet Friendly" />
            <Form.Check type="checkbox" label="Gym" />
            <Form.Check type="checkbox" label="Pool" />
            <Form.Check type="checkbox" label="In-unit Laundry" />
          </div>
        </Form.Group>
      </Form>
    </Card>
  );
}
