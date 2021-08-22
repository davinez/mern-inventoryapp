import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        'https://davi-server-inventory.herokuapp.com/api/category'
      );
      const data = await response.json();
      setCategories(data.categories);
      setIsLoading(false);
    }
    fetchCategories();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          {isLoading && <h2>Loading</h2>}
          {categories.map((category, index) => (
            <Col key={index} xs="12" sm="4" className="gy-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={
                    category.urlImage.length === 0
                      ? process.env.PUBLIC_URL + '/images/box.jpg'
                      : category.urlImage
                  }
                  alt="temp"
                />
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>

                  <Button
                    variant="primary"
                    as={Link}
                    to={`/category/${category._id}`}
                  >
                    Detail
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
