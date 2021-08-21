import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';

export const ItemDelete = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemData, setItemData] = useState({});
  const [itemId, setItemId] = useState({ id: '' });

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // get data info
    async function fetchItemDetail() {
      const response = await fetch(`/api/item/${id}/delete`);
      const data = await response.json();
      setItemData(data.item);
      // itemId for POST 'body'
      setItemId({ id: data.item._id });
      setIsLoading(false);
    }
    fetchItemDetail();
  }, [id]);

  // Delete item
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/item/${id}/delete`, {
      method: 'POST',
      body: JSON.stringify(itemId),
      headers: { 'Content-Type': 'application/json' },
    });
    // redirect to 'Home'
    history.push('/');
  };

  return (
    <Container fluid>
      {isLoading ? (
        <h2 className="mx-auto mt-3 text-center">Loading</h2>
      ) : (
        <Row>
          <Col xs="10" sm="8" className="mx-auto mt-5">
            <h4>{itemData.name}</h4>
            <p>Do you really want to delete this Item?</p>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};
