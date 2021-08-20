import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export const ItemForm = (props) => {
  // controlled inputs
  // key-value pair for each form field
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    stock: 0,
    price: 0,
    urlImage: '',
  });
  // fetch categories required for 'select' field
  const [categories, setCategories] = useState([]);
  // display error returned by the server
  const [error, setError] = useState('');
  const [postUrl, setPostUrl] = useState('');

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/item/create');
      const data = await response.json();
      setCategories(data.categories);
    }
    // fetch select field data
    fetchCategories();

    async function fetchItem() {
      const response = await fetch(`/api/item/${id}/update`);
      const data = await response.json();
      setForm(data.item);
    }
    // Fill form with existing data if route indicates 'update' and set fetch url
    if (props.title === 'Update') {
      fetchItem();
      setPostUrl(`/api/item/${id}/update`);
    } else {
      setPostUrl(`/api/item/create`);
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
          setForm({
            name: '',
            description: '',
            category: '',
            stock: 0,
            price: 0,
            urlImage: '',
          });
          setError('');
          history.push(`/item/${data.id}`);
        }
      });
  };

  // Use arrow function when pass parameters is necessary, otherwise just use function reference like onSubmit={handleSubmit}
  return (
    <Container fluid>
      <Row>
        <Col xs="10" sm="6" className="mx-auto mt-4">
          <h2 className="mt-2 mb-4">{props.title} Item</h2>
          {error && <h2>{error}</h2>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new item name"
                name="name"
                value={form.name}
                minLength="3"
                required
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="itemDescription">
              <Form.Label>Item description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item description"
                name="description"
                value={form.description}
                minLength="3"
                required
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <label htmlFor="itemCategory" className="form-label">
                Item Category
              </label>
              <select
                id="itemCategory"
                className="form-select"
                name="category"
                minLength="1"
                onChange={handleInputChange}
                value={form.category}
                required
              >
                <option value=""></option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="itemStock">
              <Form.Label>Item Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="12"
                name="stock"
                value={form.stock}
                min="0"
                required
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="itemPrice">
              <Form.Label>Item Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="245"
                name="price"
                value={form.price}
                min="0"
                required
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="itemUrl">
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
