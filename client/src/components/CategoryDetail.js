import React, { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export const CategoryDetail = () => {
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchCategoryDetail() {
      const response = await fetch(`/api/category/${id}`);
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
        </Container>
      )}
    </>
  );
};
