import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export const ItemDetail = () => {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchItemDetail() {
      const response = await fetch(
        `https://davi-server-inventory.herokuapp.com/api/item/${id}`
      );
      const data = await response.json();
      setItem(data.item);
      setIsLoading(false);
    }
    fetchItemDetail();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <>
          <h2 className="mx-auto mt-3 text-center">Loading</h2>
        </>
      ) : (
        <Container fluid>
          <Row>
            <Col xs="12" sm="5" className="mx-auto mt-5">
              <Card>
                <Card.Img
                  variant="top"
                  src={
                    item.urlImage.length === 0
                      ? process.env.PUBLIC_URL + '/images/box.jpg'
                      : item.urlImage
                  }
                  alt="item image"
                />
                <Card.Body className="text-center">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Stock: {item.stock}</Card.Text>
                  <Card.Text>$ {item.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column ps-4 gap-3 mt-5">
              <Link to={`/item/${id}/update`}>Update Item</Link>
              <Link to={`/item/${id}/delete`}>Delete Item</Link>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
