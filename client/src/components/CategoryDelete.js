import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export const CategoryDelete = () => {
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchCategoryDetail() {
      const response = await fetch(`/api/category/${id}/delete`);
      const data = await response.json();
      setCategoryData(data.results);
      setIsLoading(false);
    }
    fetchCategoryDetail();
  }, [id]);

  return (
    <Container fluid>
      {isLoading && <h2 className="mx-auto mt-3 text-center">Loading</h2>}
      {categoryData.items && (
        <>
          <h2>
            Delete the following items before attempting to delete this
            category.
          </h2>
          <h4>Items</h4>
          <ListGroup variant="flush">
            {categoryData.items.map((item, index) => (
              <ListGroup.Item key={index}>
                <Link to={`/item/${item._id}`}>{item.name}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </Container>
  );
};
