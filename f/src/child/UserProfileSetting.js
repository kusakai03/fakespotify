import React, { useEffect, useState } from "react";
import useFetchAccount from "../static/fetchAccount";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { PFP } from "../static/getstring";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileSetting(){
    const {acc, err} = useFetchAccount();
    const [userPFP, setPFP] = useState('');
    const [username, setUsername] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const nav = useNavigate();
    
    useEffect(() =>{
        setPFP(acc?.userPFP || "");
        setUsername(acc?.userNickname || acc?.username || "");
        setUserDescription(acc?.userDescription || "");
    },[acc]);

    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setPFP(file);
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userPFP", userPFP); 
        formData.append("username", username);
        formData.append("userDescription", userDescription);
        axios.post("http://localhost:8000/editProfile/" + acc.userID, formData)
        .then(res => {
            nav('/profile/' +acc.userID);
        })
        .catch(e => console.log(e));
    }
    return(
        <Container className="my-4 transparent-box">
        <h2 className="text-center mb-4">Chỉnh sửa trang cá nhân</h2>
        <Form method="post" encType="multipart/form-data">
          <Row className="justify-content-center">
            {/* userPFP Section */}
            <Col xs={12} md={4} className="text-center">
              <Image
                src={userPFP === "" ? '/image/defaultpfp.jpg': URL.createObjectURL(userPFP)}
                roundedCircle
                alt="userPFP"
                className="mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <Form.Group>
                <Form.Label>Chọn ảnh đại diện</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Col>
            {/* Form Inputs Section */}
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nhập nghệ danh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Đặt một nghệ danh thật hay"
                  name="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Viết mô tả về bạn"
                  name="userDescription"
                  value={userDescription}
                  onChange={e => setUserDescription(e.target.value)}
                />
              </Form.Group>
              <Button variant="none" className="w-100 button" onClick={handleSubmit}>
                Lưu thay đổi
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
}