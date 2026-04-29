import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api';
import { setToken } from '../utils/auth';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = await register(email, password, confirmPassword);
            setToken(token);
            navigate('/');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h1>Registration</h1>

            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit">Register</button>
            </form>

            <p>
                <Link to="/login">Log In</Link>
            </p>
        </div>
    );
}