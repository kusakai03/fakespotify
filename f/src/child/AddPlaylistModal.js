import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { GetLocalBE } from '../static/getstring';

const AddPlaylistModal = ({ show, handleClose, acc, onUpdate }) => {
  const [playlistName, setPlaylistName] = useState('');

  function handleSubmit(){
    if (playlistName.trim() === '' || playlistName.length > 200) {
      return;
    }
    const value = {
        userID: acc.userID,
        playlistName
    }
    axios.post(GetLocalBE('/addplaylist'), value)
    .then(res =>{

    })
    handleClose();
    onUpdate();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm danh sách phát</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formPlaylistName">
                <Form.Label>Tên danh sách phát</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên danh sách phát..."
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="none" onClick={handleSubmit} className='button'>
          Thêm +
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPlaylistModal;
