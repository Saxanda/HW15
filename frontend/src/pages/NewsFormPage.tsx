import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createPost, getPostById, updatePost } from '../api';

function NewsFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const isEdit = Boolean(id);
    useEffect(() => {
        if (id) {
            getPostById(id)
                .then((post) => {
                    setTitle(post.title);
                    setText(post.text);
                })
                .catch(console.error);
        }
    }, [id]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (isEdit && id) {
            await updatePost(id, { header: title, text });
            navigate(`/news/${id}`);
            return;
        }

        const createdPost = await createPost({ header: title, text });
        navigate(`/news/${createdPost.id}`);
    }

    return (
        <div className="container">
            <h1>{isEdit ? 'Edit news' : 'Create news'}</h1>

            <form className="news-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Title"
                    maxLength={50}
                    required
                />

                <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Text"
                    rows={10}
                    maxLength={256}
                    required
                />

                <div className="actions">
                    <button type="submit" className="button">
                        {isEdit ? 'Save' : 'Create'}
                    </button>
                    <Link to="/" className="button secondary">Back</Link>
                </div>
            </form>
        </div>
    );
}

export default NewsFormPage;