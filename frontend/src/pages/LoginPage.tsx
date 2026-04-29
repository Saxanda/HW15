import { useState } from 'react';
import { login } from '../api';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const token = await login(email, password);
            setToken(token);
            navigate('/');
        } catch {
            alert('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}