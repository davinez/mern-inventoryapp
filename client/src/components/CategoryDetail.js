import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export const CategoryDetail = () => {
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchCategoryDetail() {
      const response = await fetch(
        `https://davi-server-inventory.herokuapp.com/api/category/${id}`
      );
      const data = await response.json();
      setCategory(data.results);
      setIsLoading(false);
    }
    fetchCategoryDetail();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <>
          <h2 className="mx-auto mt-3 text-center">Loading</h2>
        </>
      ) : (
        <Container fluid>
          <h2 className="mx-auto mt-3 text-center">
            Category: {category.category.name}
          </h2>
          <ListGroup variant="flush">
            {category.categoryItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <Link to={`/item/${item._id}`}>{item.name}</Link>
                <p>Stock: {item.stock}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Row>
            <Col className="d-flex flex-column ps-4 gap-3 mt-5">
              <Link to={`/category/${id}/update`}>Update Category</Link>
              <Link to={`/category/${id}/delete`}>Delete Category</Link>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
