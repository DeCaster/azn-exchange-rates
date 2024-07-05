import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logo, SignupLink, SignupSectionSpan, SignupSection, Button, Input, Form, Container } from '../css/LoginPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUmbrella } from '@fortawesome/free-solid-svg-icons';

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const { username, email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username,
            email,
            password,
        };

        try {
            const res = await axios.post('/api/auth/register', newUser, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(res.data);

            // Success notification
            toast.success('Registration successful!');

            // Redirect user to login page
            setTimeout(() => {
                navigate('/login');
            }, 1500); // 1.5 seconds wait time
        } catch (err) {
            console.error(err.response.data);
            toast.error('Registration failed. Please try again.');
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
                <h2>Register</h2>
                <Form onSubmit={onSubmit}>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={onChange}
                        required
                    />
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
                    <Button type="submit">Register</Button>
                    <SignupSection>
                        <SignupSectionSpan>Already have an account?</SignupSectionSpan>
                        <SignupLink to="/login">Sign in</SignupLink>
                    </SignupSection>
                </Form>
            </Container>
        </div>
    );
}

export default RegisterPage;
