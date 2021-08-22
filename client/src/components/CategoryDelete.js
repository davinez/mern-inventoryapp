import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Link, useParams, useHistory } from 'react-router-dom';

export const CategoryDelete = () => {
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState({ id: '' });
  // display error returned by the server
  const [error, setError] = useState('');

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // get data info
    async function fetchCategoryDetail() {
      const response = await fetch(
        `https://davi-server-inventory.herokuapp.com/api/category/${id}/delete`
      );
      const data = await response.json();
      setCategoryData(data.results);
      // categoryId for POST 'body'
      setCategoryId({ id: data.results.category._id });
      setIsLoading(false);
    }
    fetchCategoryDetail();
  }, [id]);

  // Delete category
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://davi-server-inventory.herokuapp.com/api/category/${id}/delete`,
      {
        method: 'POST',
        body: JSON.stringify(categoryId),
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // Show error response
        if (data.error) {
          setError(data.message);
        } else {
          // redirect to 'Category List'
          setError('');
          history.push('/category');
        }
      });
  };

  return (
    <Container fluid>
      {error && <h2>{error}</h2>}
      {isLoading ? (
        <h2 className="mx-auto mt-3 text-center">Loading</h2>
      ) : (
        <Row>
          {categoryData.items.length > 0 ? (
            <Col xs="10" sm="8" className="mx-auto mt-5">
              <h2 className="mb-4">
                Delete the following items before attempting to delete this
                category.
              </h2>
              <ListGroup variant="flush">
                {categoryData.items.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Link to={`/item/${item._id}`}>{item.name}</Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          ) : (
            <Col xs="10" sm="8" className="mx-auto mt-5">
              <p>Do you really want to delete this Category?</p>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};
