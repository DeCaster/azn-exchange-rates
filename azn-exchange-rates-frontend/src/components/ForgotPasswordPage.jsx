import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {Button,Input,Form,Container,Body} from '../css/ForgotPasswordPage';

function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
  });
  const navigate = useNavigate();
  const { email, oldPassword, newPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const data = {
      email,
      oldPassword,
      newPassword,
    };

    try {
      const res = await axios.post('/api/auth/forgot-password', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Password successfully changed:', res.data);

      toast.success('Şifre başarıyla değiştirildi!');
      setTimeout(() => {
        navigate('/login');
      }, 2000); //2 saniye sonra isleyecek

    } catch (err) {
      console.error(err.response.data);
      toast.error('Şifre değiştirme başarısız. Lütfen tekrar deneyin.');
    }
  };

  return (
    <Body>
      <Container>
        <ToastContainer />
        <h2>Forgot Password</h2>
        <Form onSubmit={onSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          />
          <Input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={oldPassword}
            onChange={onChange}
            required
          />
          <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={onChange}
            required
          />
          <Button type="submit">Change Password</Button>
        </Form>
      </Container>
    </Body>
  );
}

export default ForgotPasswordPage;
