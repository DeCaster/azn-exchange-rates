import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logo, SignupLink, SignupSectionSpan, SignupSection, Button, Input, Form, Container } from '../css/LoginPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUmbrella } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };

        try {
            const res = await axios.post('/api/auth/login', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('User successfully logged in:', res.data);

            localStorage.setItem('token', res.data.token);

            toast.success('Login successful!');

            setTimeout(() => {
                navigate('/');
            }, 1500); // 1.5 saniye
        } catch (err) {
            console.error(err.response.data);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div>
            <Container>
                <ToastContainer />
                <Link to="/">
                    <Logo>
                        <FontAwesomeIcon icon={faUmbrella} />
                    </Logo>
                </Link>
                <h2>Login</h2>
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
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                    <Button type="submit">Login</Button>
                </Form>
                <SignupSection>
                    <SignupSectionSpan>Don't have an account?</SignupSectionSpan>
                    <SignupLink to="/register">Sign up</SignupLink>
                </SignupSection>
            </Container>
        </div>
    );
}

export default LoginPage;
