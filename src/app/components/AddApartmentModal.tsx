"use client";

import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

interface AddApartmentModalProps {
  show: boolean;
  onClose: () => void;
  onApartmentAdded: () => void;
}

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
      const response = await fetch("https://apartments-rental.onrender.com/api/apartments", {
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
    } catch (err) {
      setError((err as Error).message);
    }
  };

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
            <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
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
