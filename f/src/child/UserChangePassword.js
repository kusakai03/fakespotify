import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import useFetchAccount from "../static/fetchAccount";
import axios from "axios";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {acc, err} = useFetchAccount();

  const validateForm = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Xác nhận mật khẩu không trùng khớp.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!validateForm()) return;
    const value = {
        userID: acc.userID,
        currentPassword: currentPassword,
        newPassword: newPassword
    }

    axios.post("/changePassword", value)
    .then(response => {
      setSuccessMessage("Đổi mật khẩu thành công!");
    }).catch(error => {
      setError("Đổi mật khẩu thất bại! Vui lòng kiểm tra lại.");
    });
  };

  return (
    <Container className="my-4 transparent-box">
      <h2 className="text-center mb-4">Đổi mật khẩu</h2>
      <Form method="post">
        {/* Hiển thị lỗi */}
        {error && <p className="text-danger">{error}</p>}
        {successMessage && <p className="text-success">{successMessage}</p>}
        
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu hiện tại</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu hiện tại"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu mới</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Xác nhận mật khẩu mới</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant="primary" className="w-100">
          Đổi mật khẩu
        </Button>
      </Form>
    </Container>
  );
}
