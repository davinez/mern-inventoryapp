import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export const Home = () => {
  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <Col xs="12" sm="6" className="text-center home-column">
            <h1 className="mt-4">Inventory App</h1>
            <p className="mt-4">
              Welcome to Davinez Inventory, an Express/React website
            </p>
          </Col>

          <Col xs="12" sm="6">
            <Image src="/images/inv1.jpg" fluid />
          </Col>
        </Row>
      </Container>
    </>
  );
};
