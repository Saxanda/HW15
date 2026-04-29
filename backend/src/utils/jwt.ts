import jwt from 'jsonwebtoken';

const SECRET = 'hw9_secret';

export function generateToken(email: string) {
    const token = jwt.sign({ sub: email }, SECRET, {
        expiresIn: '30d',
    });

    return `Bearer ${token}`;
}

export function getSecret() {
    return SECRET;
}