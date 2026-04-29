import { getToken } from './utils/auth';

export interface NewsPost {
    id: number;
    title: string;
    text: string;
    createDate: string;
    authorEmail: string;
}

export interface PaginatedNewsResponse {
    items: NewsPost[];
    page: number;
    size: number;
    total: number;
}

const API_BASE = '/api/posts';

function authHeaders() {
    const token = getToken();

    return {
        'Content-Type': 'application/json',
        Authorization: token || '',
    };
}

export async function login(email: string, password: string): Promise<string> {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Login failed');
    }

    return data.token;
}

export async function register(
    email: string,
    password: string,
    confirmPassword: string,
): Promise<string> {
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    return data.token;
}

export async function getAllPosts(
    page = 0,
    size = 10,
): Promise<PaginatedNewsResponse> {
    const response = await fetch(`${API_BASE}?page=${page}&size=${size}`, {
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to load posts');
    }

    return response.json();
}

export async function getPostById(id: string): Promise<NewsPost> {
    const response = await fetch(`${API_BASE}/${id}`, {
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to load post');
    }

    return response.json();
}

export async function createPost(data: {
    title: string;
    text: string;
}): Promise<NewsPost> {
    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    return response.json();
}

export async function updatePost(
    id: string,
    data: {
        title: string;
        text: string;
    },
): Promise<NewsPost> {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update post');
    }

    return response.json();
}

export async function deletePost(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to delete post');
    }
}