// src/SubComponents/footer/footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css';

export default function Footer() {
  return (
    <footer className="pagefooter">
        <Container className='footer-container'>
      <mid-footer-container>
      
        <Row>
          <Col>
            <p>Designed and Developed by RightPath</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>© {new Date().getFullYear()} RightPath. All rights reserved.</p>
          </Col>
        </Row>
      
      </mid-footer-container>
      <right-footer-container>
        <Row>
          <Col>
          <p>© {new Date().getFullYear()} RightPath. All rights reserved.</p>
            <p>Privacy Policy</p>
            <p>Terms and Conditions </p>
          </Col>
        </Row>

      </right-footer-container>
      <left-footer-container>
      <Row>
          <Col>
            <p>privacy policy</p>
          </Col>
          <Col>
            <p>terms and conditions</p>
          </Col>
        </Row>

      </left-footer-container>
      </Container>
    </footer>
  );
}