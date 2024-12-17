import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Validation, { SignUpValidation } from "../static/contentValidation.js"
import { useNavigate } from "react-router-dom";


export default function Authentication() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signinValue, setSigninValue] = useState({
    username: '',
    password: ''
  });
  const [signupValue, setSignupValue] = useState({
    username: '',
    email:'',
    password: '',
    confirmPassword: ''
  });
  const [err, setError] = useState({});
  const [acc, checkExists] = useState("");
  function handleSigninInput(e){
    setSigninValue(p => ({...p, [e.target.name]: e.target.value}))
  };

  function handleSignupInput(e){
    setSignupValue(p => ({...p, [e.target.name]: e.target.value}))
  };

  const nav = useNavigate();
  axios.defaults.withCredentials = true;
  function handleLogin(event){
      event.preventDefault();
      setError(Validation(signinValue));
      if (err.username === "" && err.password === ""){
          axios.post("http://localhost:8000/login", signinValue)
          .then(res => {
              console.log(res);
              if (res.data.Status === "Success"){
              window.location.reload(true);
              }
          })
          .catch(e => console.log(e));
      }
  }

  function handleRegister(event){
      event.preventDefault();
      const errors = SignUpValidation(signupValue);
      setError(errors);
      if (Object.keys(errors).length > 0) {
          return; 
      }
      axios.get("http://localhost:8000/accountExist/" + signupValue.username + "/"+signupValue.email)
      .then(res =>{
          if (res.data.data.length >0){
              checkExists("Tài khoản hoặc email đã tồn tại");
              return;
          }
          else{
              axios.post("http://localhost:8000/register", signupValue)
              .then(res => {
                  window.location.reload(true);
              })
              .catch(e => console.log(e));
          }
      })
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{background:"url('/image/astheticimg.jpg')"}}>
      <Row className="w-100 shadow-lg rounded p-3" style={{backgroundColor: "rgba(255, 211, 218, 0.5)"}}>
        <Col md={6} className="d-flex align-items-center justify-content-center" >
          {isSignUp ? (
            <div>
              <h4 className="text-center">Đăng ký</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Tên đăng nhập" name="username" onChange={handleSignupInput}/>
                  <span className="text-danger">{err.username}</span>
                  <span className="text-danger">{acc}</span>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email" name="email" onChange={handleSignupInput}/>
                  <span className="text-danger">{err.email}</span>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Mật khẩu" name="password" onChange={handleSignupInput}/>
                  <span className="text-danger">{err.password}</span>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Nhập lại mật khẩu" name="confirmPassword" onChange={handleSignupInput}/>
                  <span className="text-danger">{err.confirmPassword}</span>
                </Form.Group>
                <Button variant="primary" className="w-100" onClick={handleRegister}>Đăng ký</Button>
              </Form>
            </div>
          ) : (
            <div>
              <h3 className="text-center">Đăng nhập</h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="username" placeholder="Tên người dùng" onChange={handleSigninInput}/>
                  <span className="text-danger">{err.username}</span>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" name="password" placeholder="Mật khẩu" onChange={handleSigninInput}/>
                  <span className="text-danger">{err.password}</span>
                </Form.Group>
                <div className="d-flex justify-content-between mb-3">
                  <a href="#" className="text-light">Quên mật khẩu?</a>
                </div>
                <Button variant="primary" className="w-100" onClick={handleLogin}>Đăng nhập</Button>
              </Form>
            </div>
          )}
        </Col>
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center rounded"
        >
          <Image src="/image/logo.png" width={80} rounded></Image>
          <p className="text-light p-3">
          Nơi âm nhạc nói lên câu chuyện của bạn.
          </p>
          <Button
            variant="none" className="button text-light"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Đăng nhập >>" : "Đăng ký >>"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
