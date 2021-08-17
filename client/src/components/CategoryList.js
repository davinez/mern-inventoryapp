import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/category');
      const data = await response.json();
      setCategories(data.categories);
    }
    fetchCategories();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          {categories.map((category, index) => (
            <Col key={index.toString()} xs="12" sm="4" className="gy-4">
              <Card>
                <Card.Img variant="top" src={category.urlImage} alt="temp" />
                <Card.Body className="mx-auto">
                  <Card.Title>{category.name}</Card.Title>

                  <Button
                    variant="primary"
                    as={Link}
                    to={`/category/${category._id}`}
                  >
                    Go somewhere
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
