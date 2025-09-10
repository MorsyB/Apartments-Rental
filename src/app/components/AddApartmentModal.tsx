"use client";

import React, { useState, useRef, useCallback } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { API_BASE_URL, GOOGLE_MAPS_API_KEY } from "../../config/constants";

interface AddApartmentModalProps {
  show: boolean;
  onClose: () => void;
  onApartmentAdded: () => void;
}

// Google Maps Component
const GoogleMap: React.FC<{
  center: google.maps.LatLngLiteral;
  zoom: number;
  onClick?: (location: google.maps.LatLngLiteral) => void;
  marker?: google.maps.LatLngLiteral;
}> = ({ center, zoom, onClick, marker }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google) return;

    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    if (onClick) {
      googleMapRef.current.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          onClick(event.latLng.toJSON());
        }
      });
    }

    if (marker) {
      markerRef.current = new window.google.maps.Marker({
        position: marker,
        map: googleMapRef.current,
      });
    }
  }, [center, zoom, onClick, marker]);

  React.useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
    }
  }, [initMap]);

  React.useEffect(() => {
    if (googleMapRef.current && marker) {
      if (markerRef.current) {
        markerRef.current.setPosition(marker);
      } else {
        markerRef.current = new window.google.maps.Marker({
          position: marker,
          map: googleMapRef.current,
        });
      }
      googleMapRef.current.setCenter(marker);
      googleMapRef.current.setZoom(15);
    }
  }, [marker]);

  return <div ref={mapRef} style={{ height: "300px", width: "100%" }} />;
};

// Render function for Google Maps wrapper
const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <div>Loading Google Maps...</div>;
    case Status.FAILURE:
      return <div>Error loading Google Maps. Please check your API key.</div>;
    case Status.SUCCESS:
      return <GoogleMap center={{ lat: 40.7128, lng: -74.0060 }} zoom={10} />;
  }
};

export default function AddApartmentModal({ show, onClose, onApartmentAdded }: AddApartmentModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");
  const [amenities, setAmenities] = useState("");
  const [error, setError] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [locationText, setLocationText] = useState("");
  const [showMap, setShowMap] = useState(false);

  // Function to geocode address using Google Maps Geocoding API
  const geocodeAddress = async (address: string) => {
    if (!address.trim() || !window.google) return;

    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ address });

      if (response.results && response.results.length > 0) {
        const position = response.results[0].geometry.location.toJSON();
        setSelectedPosition(position);
        setLocation(`${position.lat}, ${position.lng}`);
      } else {
        setError("Location not found. Please try a different address.");
      }
    } catch (err) {
      setError("Failed to geocode address. Please try again.");
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationText(e.target.value);
  };

  const handleLocationBlur = () => {
    if (locationText && locationText !== location) {
      geocodeAddress(locationText);
    }
  };

  const handleMapClick = (location: google.maps.LatLngLiteral) => {
    setSelectedPosition(location);
    setLocation(`${location.lat}, ${location.lng}`);
    setLocationText(`${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!title || !price || !location || beds <= 0 || baths <= 0 || !size || !image) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    const amenitiesArray = amenities.split(",").map((a) => a.trim()).filter((a) => a.length > 0);

    try {
      const response = await fetch(`${API_BASE_URL}/apartments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Date.now(), // simple unique id
          title,
          price: parseFloat(price),
          location,
          beds,
          baths,
          size,
          image,
          amenities: amenitiesArray,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add apartment");
      }

      onApartmentAdded();
      onClose();
      // Reset form
      setTitle("");
      setPrice("");
      setLocation("");
      setBeds(0);
      setBaths(0);
      setSize("");
      setImage("");
      setAmenities("");
      setSelectedPosition(null);
      setLocationText("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Get Google Maps API key from constants
  const googleMapsApiKey = GOOGLE_MAPS_API_KEY;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Apartment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title *</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price *</Form.Label>
            <Form.Control type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Location *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address (e.g., New York, NY or 123 Main St, City)"
              value={locationText}
              onChange={handleLocationChange}
              onBlur={handleLocationBlur}
              required
            />
            <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => setShowMap(!showMap)}
                style={{
                  backgroundColor: showMap ? '#f8f9fa' : 'transparent',
                  borderColor: '#000',
                  color: '#000',
                  border: '1px solid #000'
                }}
              >
                {showMap ? 'Hide Map' : 'View Map'}
              </Button>
            </div>
            {showMap && (
              <div style={{ height: "300px", marginTop: "1rem" }}>
                <Wrapper apiKey={googleMapsApiKey} render={render}>
                  <GoogleMap
                    center={selectedPosition || { lat: 40.7128, lng: -74.0060 }}
                    zoom={selectedPosition ? 15 : 10}
                    onClick={handleMapClick}
                    marker={selectedPosition || undefined}
                  />
                </Wrapper>
              </div>
            )}
            {location && (
              <small className="text-muted">Coordinates: {location}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBeds">
            <Form.Label>Beds *</Form.Label>
            <Form.Control type="number" value={beds} onChange={(e) => setBeds(parseInt(e.target.value))} min={1} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBaths">
            <Form.Label>Baths *</Form.Label>
            <Form.Control type="number" value={baths} onChange={(e) => setBaths(parseInt(e.target.value))} min={1} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSize">
            <Form.Label>Size *</Form.Label>
            <Form.Control type="text" value={size} onChange={(e) => setSize(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Image URL *</Form.Label>
            <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAmenities">
            <Form.Label>Amenities (comma separated)</Form.Label>
            <Form.Control type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Apartment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
