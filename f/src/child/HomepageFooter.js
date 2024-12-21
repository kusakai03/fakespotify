import React from "react";
import { Container, Row, Col, Navbar } from 'react-bootstrap';

export default function HomepageFooter(){
    return (
        <footer className="pink transparent-box" style={{height:300}}>
          <Container>
            <Row>
              <Col md={6}>
                <p>Nơi âm nhạc nói lên câu chuyện của bạn.</p>
              </Col>
              <Col md={6}>
                <h5>Liên hệ</h5>
                <p>Email: khaiquoc003@gmail.com</p>
                <p>SĐT: 0822666267</p>
              </Col>
            </Row>
          </Container>
        </footer>
      );
}