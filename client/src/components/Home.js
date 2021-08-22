import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Image src="/images/inv2.jpg" fluid />
          </Col>
          <Col className="home-column">
            <h1 className="mt-4">Inventory App</h1>
            <p className="mt-4">
              Welcome to Davinez Inventory, an Express/React website
            </p>
          </Col>
          <Col>
            <Image src="/images/inv1.jpg" fluid />
          </Col>
        </Row>
      </Container>
    </>
  );
};
