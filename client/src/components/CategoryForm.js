import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export const CategoryForm = (props) => {
  // controlled inputs
  // key-value pair for each form field
  const [form, setForm] = useState({ name: '', urlImage: '' });
  // display error returned by the server
  const [error, setError] = useState('');
  const [postUrl, setPostUrl] = useState('');

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function fetchCategory() {
      const response = await fetch(`/api/category/${id}/update`);
      const data = await response.json();
      setForm(data.category);
    }
    // Fill form with existing data if route indicates 'update' and set fetch url
    if (props.title === 'Update') {
      fetchCategory();
      setPostUrl(`/api/category/${id}/update`);
    } else {
      setPostUrl(`/api/category/create`);
    }
  }, [props.title, id]);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(postUrl, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // Show error response
        if (data.error) {
          setError(data.message);
        } else {
          // redirect to 'Detail route'
          setForm({ name: '', urlImage: '' });
          setError('');
          history.push(`/category/${data.id}`);
        }
      });
  };

  // Use arrow function when pass parameters is necessary, otherwise just use function reference like onSubmit={handleSubmit}
  return (
    <Container fluid>
      <Row>
        <Col xs="10" sm="6" className="mx-auto mt-4">
          <h2 className="mt-2 mb-4">{props.title} Category</h2>
          {error && <h2>{error}</h2>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="inventoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new category"
                name="name"
                value={form.name}
                minLength="3"
                required
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inventoryUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                name="urlImage"
                value={form.urlImage}
                minLength="4"
                required
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
