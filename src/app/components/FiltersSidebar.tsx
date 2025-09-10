"use client";

import { Card, Form } from "react-bootstrap";

interface Filters {
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
}

interface FiltersSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function FiltersSidebar({ filters, onFilterChange }: FiltersSidebarProps) {
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onFilterChange({
      ...filters,
      priceRange: [0, value],
    });
  };

  const handleBedroomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      bedrooms: e.target.value,
    });
  };

  const handleBathroomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      bathrooms: e.target.value,
    });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked
      ? [...filters.amenities, amenity]
      : filters.amenities.filter((a) => a !== amenity);

    onFilterChange({
      ...filters,
      amenities: newAmenities,
    });
  };

  const availableAmenities = [
    "Parking",
    "Pet Friendly",
    "Gym",
    "Pool",
    "In-unit Laundry",
    "Balcony",
    "Dishwasher",
    "Air Conditioning",
    "Hardwood Floors",
    "Elevator"
  ];

  return (
    <Card className="p-3 shadow rounded-4">
      <h5 className="mb-3">Filters</h5>
      <Form>
        {/* Price Range */}
        <Form.Group className="mb-3">
          <Form.Label>Max Price: ${filters.priceRange[1]}</Form.Label>
          <Form.Range
            min={0}
            max={1000000}
            step={100}
            value={filters.priceRange[1]}
            onChange={handlePriceRangeChange}
          />
          <div className="d-flex justify-content-between text-muted small">
            <span>$0</span>
            <span>$1,000,000+</span>
          </div>
        </Form.Group>

        {/* Bedrooms */}
        <Form.Group className="mb-3">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Select value={filters.bedrooms} onChange={handleBedroomsChange}>
            <option value="Any">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3+">3+</option>
          </Form.Select>
        </Form.Group>

        {/* Bathrooms */}
        <Form.Group className="mb-3">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Select value={filters.bathrooms} onChange={handleBathroomsChange}>
            <option value="Any">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3+">3+</option>
          </Form.Select>
        </Form.Group>

        {/* Amenities */}
        <Form.Group>
          <Form.Label>Amenities</Form.Label>
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {availableAmenities.map((amenity) => (
              <Form.Check
                key={amenity}
                type="checkbox"
                label={amenity}
                checked={filters.amenities.includes(amenity)}
                onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
              />
            ))}
          </div>
        </Form.Group>
      </Form>
    </Card>
  );
}
