import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePost, getPostById } from '../api';
import type { NewsPost } from '../api';

function NewsDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<NewsPost | null>(null);

    useEffect(() => {
        if (id) {
            getPostById(id).then(setPost).catch(console.error);
        }
    }, [id]);

    async function handleDelete(): Promise<void> {
        if (!id) {
            return;
        }

        await deletePost(id);
        navigate('/');
    }

    if (!post) {
        return <div className="container">Loading...</div>;
    }

    return (
        <div className="container">
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <p><strong>Author:</strong> {post.authorEmail}</p>
            <p><strong>Created:</strong> {new Date(post.createDate).toLocaleString()}</p>

            <div className="actions">
                <Link to={`/edit/${post.id}`} className="button">Edit</Link>
                <button type="button" className="button danger" onClick={handleDelete}>
                    Delete
                </button>
                <Link to="/" className="button secondary">Back</Link>
            </div>
        </div>
    );
}

export default NewsDetailsPage;