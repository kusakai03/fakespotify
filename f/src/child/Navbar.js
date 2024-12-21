import React, { useState } from "react";
import { Button, Container, Dropdown, DropdownItem, DropdownItemText, DropdownToggle, Form, Image, Modal, Nav, Navbar, NavDropdown }from "react-bootstrap";
import Authentication from "./Authentication";
import useFetchAccount from "../static/fetchAccount";
import axios from "axios";
import { PFP } from "../static/getstring";
import { useNavigate } from "react-router-dom";


function Navpinkpink() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const nav = useNavigate();
  const {acc, error} = useFetchAccount();

  function handleLogout(){
    axios.get('http://localhost:8000/logout')
    .then(res => {
      nav('/');
    }).catch(e => console.log(e));
  }

  return (
    <Navbar expand="lg" sticky='top' className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/"><Image src="/image/logo.png" width={80} rounded></Image></Navbar.Brand>
          <Form className="d-flex w-50">
            <Form.Control
              type="search"
              placeholder="Tìm nhạc..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success button">Search</Button>
          </Form>

          {
            acc? (
              <div className="d-flex flex-column align-items-center">
                <Dropdown className="position-relative" drop="start">
                  <DropdownToggle as="a" variant="none" className="text-decoration-none text-light">
                    <Image className="rounded-circle" src={acc?.userPFP ? PFP(acc.userPFP) : '/image/defaultpfp.jpg'} alt="avatar" style={{ width: 40, height: 40, objectFit:'cover'}} />
                  </DropdownToggle>
                  <Dropdown.Menu>
                    <DropdownItemText className="ms-3">Hello {acc?.userNickname || acc?.username}!</DropdownItemText>
                    <DropdownItem href={"/profile/"+acc.userID} className="button">Trang cá nhân</DropdownItem>
                    <DropdownItem href={"/setting"} className="button">Cài đặt thông tin</DropdownItem>
                    <DropdownItem onClick={handleLogout} className="button">Đăng xuất</DropdownItem>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ):(
              <Button className="button" variant="none" onClick={handleShow}>Đăng nhập</Button>
            )
          }
          <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
              <Authentication/>
              <Button onClick={handleClose} className="button mt-2" variant="none">
                Tiếp tục ẩn danh
              </Button>
            </Modal.Body>
          </Modal>
      </Container>
    </Navbar>
  );
}

export default Navpinkpink;